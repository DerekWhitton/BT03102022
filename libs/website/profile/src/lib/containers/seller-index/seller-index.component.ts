import { Component, OnInit, ViewChild } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import {
  CategoryPropertyType,
  ICategory,
  ICategoryProperty,
  ICreateOrUpdateListing,
  ILocation,
  ISeller,
  ISellerListing,
  ISellerListingPropertyValue,
  ListingType,
} from '@bushtrade/website/shared/entites';
import {
  CategoryService,
  ListingsService,
  SiteSettingsService,
} from '@bushtrade/website/shared/services';
import {
  getUserSellers,
  registerSeller,
} from '@bushtrade/website/shared/state';
import { Store } from '@ngrx/store';
import { MessageService } from 'primeng/api';
import { Observable } from 'rxjs';
import { first, filter } from 'rxjs/operators';
import {
  addListing,
  deleteListing,
  loadListings,
  updateListing,
} from '../../+state/listings/listings.actions';
import { ListingsFacade } from '../../+state/listings/listings.facade';
declare var google: any;

interface ICategoryPropertyWithUserSelectedValue extends ICategoryProperty {
  value: string;
  selectableOptions: { label: string; value: string }[];
}

// Resolving  failed build

@Component({
  selector: 'website-seller-index',
  templateUrl: './seller-index.component.html',
  styleUrls: ['./seller-index.component.scss'],
})
export class SellerIndexComponent implements OnInit {
  @ViewChild('fileUpload') fileUpload: any;
  sellers: ISeller[];
  loaded$ = this.listingsFacade.loaded$;
  listings$ = this.listingsFacade.allListings$;
  lastListingError$ = this.listingsFacade.lastKnownError$;
  listingSaved$ = this.listingsFacade.listingSaved$;
  selectedSellerId: string;
  displayCreateUpdateDialog = false;
  isUpdate = false;
  isPrivate = true;
  isSaving = false;
  categorySelected = false;
  columns = [
    {
      field: 'name',
      header: 'Name',
      converter: (val) => `${val}`,
    },
    {
      field: 'startingPrice',
      header: 'Starting Price',
      converter: (val) => `R${val}`,
    },
    { field: 'type', header: 'Type', converter: (val) => ListingType[val] },
  ];

  displayStartSellingDialog = false;

  CategoryPropertyType = CategoryPropertyType;
  ListingType = ListingType;
  selectableListingTypeOptions: { label: string; value: ListingType }[] = [
    { label: 'Auction', value: ListingType.Auction },
    { label: 'For Sale', value: ListingType.Sale },
  ];
  selectableAuctionDurationSettings: { label: string; value: ListingType }[];

  showProperties = false;
  categoryProperties: ICategoryPropertyWithUserSelectedValue[];

  images: { id: string; src: string }[] = [];

  categoryTree: ICategory[] = [];
  loadingCategories = false;
  selectedCategoryId: string = null;

  addlistingFormGroup: FormGroup;

  // Client changed the business logic escrow is no longer required, defaulting the  values to n/a unstil business logic changes again
  signUpSellerFormGroup: FormGroup = new FormGroup({
    bank: new FormControl('n/a'),
    branchCode: new FormControl('n/a'),
    accountType: new FormControl('n/a'),
    accountNumber: new FormControl('n/a'),
    taxNumber: new FormControl('n/a'),
    ckNumber: new FormControl('n/a'),
    name: new FormControl('username', Validators.required),
    isPrivateIndividual: new FormControl(true, Validators.required),
  });
  editModalDataIsInitializing: boolean;
  editListingPropertyValues: ISellerListingPropertyValue[] = [];
  isUploadingImageFiles: boolean;
  selectedListingId: string;
  premiumPackagesModalVisible: boolean;
  // map properties
  map: any;
  options: any;
  overlays: any[] = [];
  selectedLocation: ILocation;
  defaultMapCenter = { lat: -31.066605, lng: 24.027446 };
  defaultZoom = 5;
  specificLocationZoom = 15;
  allRequiredFieldsCompleted = false;

  constructor(
    private store: Store,
    private messageService: MessageService,
    private listingsFacade: ListingsFacade,
    private listingSvc: ListingsService,
    private categoryService: CategoryService,
    private siteSettingsService: SiteSettingsService
  ) {}

  ngOnInit(): void {
    this.options = {
      center: this.defaultMapCenter,
      zoom: this.defaultZoom,
      streetViewControl: false,
      keyboardShortcuts: false,
      fullscreenControl: false,
    };

    this.store.select(getUserSellers).subscribe((sellers: ISeller[]) => {
      this.sellers = sellers;
      if (sellers.length > 0) {
        this.loadSellersListings(sellers?.[0]);
      }
    });
    this.siteSettingsService
      .loadAuctionDurationSettings()
      .subscribe((settings) => {
        this.selectableAuctionDurationSettings = settings.map((s) => {
          let dayLabel = 'days';
          if (s.numberOfDays === 1) dayLabel = 'day';
          return {
            label: `${s.numberOfDays} ${dayLabel}`,
            value: s.numberOfDays,
          };
        });
      });

    this.lastListingError$.subscribe((error) => {
      if (error) {
        this.messageService.add({
          severity: 'error',
          detail:
            typeof error?.error == 'string'
              ? error?.error
              : error?.error?.title,
        });
      }
    });

    this.initializeListingForm();
    this.loadCategories();
  }

  loadSellersListings(seller) {
    this.selectedSellerId = seller.id;
    this.listingsFacade.dispatch(loadListings({ sellerId: seller.id }));
  }

  handleChange(e) {
    this.isPrivate = e.checked;
    if (e.checked) {
      this.signUpSellerFormGroup.patchValue({
        name: 'username',
      });
    } else {
      this.signUpSellerFormGroup.patchValue({
        name: '',
      });
    }
  }

  async uploadListingImage(event) {
    const files = [...event.files];

    this.isUploadingImageFiles = true;
    this.fileUpload.clear();

    for (let i = 0; i < files.length; i++) {
      const imageId = await this.listingSvc
        .uploadSellerListingImage(this.selectedSellerId, files[i])
        .toPromise();

      const ctx = this;

      const reader = new FileReader();
      reader.readAsDataURL(files[i]);
      reader.onload = function () {
        ctx.images.push({ id: imageId, src: reader.result as string });
      };
    }

    this.isUploadingImageFiles = false;
  }

  handleCreateSelection() {
    this.editListingPropertyValues = [];
    this.initializeListingForm();
  }

  handleImageRemoval(idForRemoval) {
    this.images = this.images.filter((i) => i.id != idForRemoval);
  }

  async handleUpdateSelection(data) {
    this.displayCreateUpdateDialog = true;
    this.editModalDataIsInitializing = true;

    const listing = await this.listingSvc
      .loadSellerListing(this.selectedSellerId, data.id)
      .toPromise();

    // we need to reconstruct the category tree at this point
    const pathAsssimilationIds = await this.buildCategoryTreeAssimilationPath(
      listing.categoryId
    );

    for (let i = 0; i < pathAsssimilationIds.length; i++) {
      await this.loadCategories(pathAsssimilationIds[i]);
    }

    this.initializeListingForm(listing);
    this.editListingPropertyValues = listing.listingPropertyValues;
    this.editModalDataIsInitializing = false;
  }

  private async buildCategoryTreeAssimilationPath(idOfCategoryToReach: string) {
    let category = await this.categoryService
      .getCategoryById(idOfCategoryToReach)
      .toPromise();

    let path: string[] = [];

    while (
      category.parentId &&
      category.parentId != '00000000-0000-0000-0000-000000000000'
    ) {
      path = [category.parentId].concat(path);
      category = await this.categoryService
        .getCategoryById(category.parentId)
        .toPromise();
    }

    return path;
  }

  deleteListing(data) {
    this.listingsFacade.dispatch(
      deleteListing({ sellerId: this.selectedSellerId, listingId: data.id })
    );
  }

  saveListing() {
    if (this.isSaving) {
      return;
    }
    this.isSaving = true;
    var listing: ICreateOrUpdateListing;
    listing = { ...(this.addlistingFormGroup.value as ICreateOrUpdateListing) };
    listing.listingLocation = this.selectedLocation;
    listing.listingImageIds = this.images.map((i) => i.id);
    listing.listingPropertyValues = this.categoryProperties.map((p) => ({
      categoryPropertyId: p.id,
      value:
        p.value && typeof p.value !== typeof '' ? p.value.toString() : p.value,
    }));

    this.listingSaved$.pipe(first()).subscribe(() => {
      this.lastListingError$
        .pipe(
          filter((e) => e != null),
          first()
        )
        .subscribe((error) => {
          if (!error) {
            this.messageService.add({
              severity: 'success',
              detail: 'Listing saved successfuly',
            });
            this.clearForm();
          }
          this.isSaving = false;
        });
    });

    if (listing.id && listing.id != '00000000-0000-0000-0000-000000000000') {
      this.listingsFacade.dispatch(
        updateListing({
          sellerId: this.selectedSellerId,
          listingId: listing.id,
          listing: listing,
        })
      );
    } else {
      this.listingsFacade.dispatch(
        addListing({
          sellerId: this.selectedSellerId,
          listing: listing,
        })
      );
    }
  }

  registerSeller() {
    this.store.dispatch(
      registerSeller({
        sellerProfile: this.signUpSellerFormGroup.value as ISeller,
      })
    );
    this.displayStartSellingDialog = false;
  }

  showPremiumPackagesModal(listingId: string) {
    this.selectedListingId = listingId;
    this.premiumPackagesModalVisible = true;
  }

  closePremiumPackagesModal() {
    this.selectedListingId = null;
    this.premiumPackagesModalVisible = false;
  }

  premiumPackageActivated() {}

  clearForm() {
    this.displayCreateUpdateDialog = false;
    this.initializeListingForm();
    this.clearMap();
    this.categoryProperties = [];
    this.images = [];
  }

  checkProperties() {
    //We check the required category properties to see that they are populated.
    if (this.categoryProperties?.filter((x) => x.required == true).length > 0) {
      this.categoryProperties
        .filter((x) => x.required == true)
        .map((x) => {
          if (x.value && x.value !== null && x.value !== '') {
            this.allRequiredFieldsCompleted = true;
          } else {
            this.allRequiredFieldsCompleted = true;
            return;
          }
        });
    } else {
      this.allRequiredFieldsCompleted = true;
    }
  }

  private async loadCategories(parentId: string = null) {
    this.loadingCategories = true;

    const categoryResult = await this.categoryService
      .loadCategories(parentId, true)
      .toPromise();

    this.categoryTree = !this.categoryTree.length
      ? categoryResult
      : this.insertCategoryChildrenAtNode(
          parentId,
          this.categoryTree,
          categoryResult
        );

    this.loadingCategories = false;
  }

  private insertCategoryChildrenAtNode(
    categoryId: string,
    tree: ICategory[],
    children: ICategory[]
  ) {
    if (!tree) {
      return tree;
    }
    for (let i = 0; i < tree.length; i++) {
      if (tree[i].id == categoryId) {
        tree[i].children = children;
      } else {
        tree[i].children = this.insertCategoryChildrenAtNode(
          categoryId,
          tree[i].children,
          children
        );
      }
    }

    return tree;
  }

  handleCategorySelection(id) {
    if (id) {
      this.selectedCategoryId = id;
      this.loadCategories(id);
    }
  }

  async handleCategoryChainComplete(isComplete) {
    if (!this.selectedCategoryId) {
      return;
    }
    this.showProperties = isComplete;
    this.addlistingFormGroup.patchValue({
      categoryId: isComplete ? this.selectedCategoryId : '',
    });
    if (isComplete) {
      this.categorySelected = true;
      this.categoryProperties = (
        await this.categoryService
          .loadCategoryProperties(this.selectedCategoryId)
          .toPromise()
      ).map(
        (c) =>
          ({
            ...c,
            value: null,
            selectableOptions: c.options.length
              ? [{ label: 'Select a value', value: null }].concat(
                  c.options.map((o) => ({ label: o, value: o }))
                )
              : [],
          } as ICategoryPropertyWithUserSelectedValue)
      );

      // assign old values
      for (let i = 0; i < this.categoryProperties.length; i++) {
        if (
          this.editListingPropertyValues.findIndex(
            (v) => v.categoryPropertyId == this.categoryProperties[i].id
          ) !== -1
        ) {
          this.categoryProperties[
            i
          ].value = this.editListingPropertyValues.find(
            (v) => v.categoryPropertyId == this.categoryProperties[i].id
          ).value;
        }
      }
    } else {
      this.categoryProperties = [];
    }
  }

  checkReserve() {
    console.log(this.addlistingFormGroup.value.startingPrice);
    if (this.addlistingFormGroup.value.type == 0) {
      if (
        this.addlistingFormGroup.value.startingPrice >
        this.addlistingFormGroup.value.reservePrice
      ) {
        this.addlistingFormGroup.patchValue({
          reservePrice: this.addlistingFormGroup.value.startingPrice,
        });
      }
      this.addlistingFormGroup.patchValue({
        priceIncrement: Math.round(
          this.addlistingFormGroup.value.startingPrice * 0.2
        ),
      });
    }
  }

  setMap($event: any) {
    this.map = $event.map;
  }

  handleMapClick(event) {
    this.selectedLocation = {
      lat: event.latLng.lat(),
      lng: event.latLng.lng(),
    };
    this.addMarker();
  }

  setCurrentLocation() {
    if ('geolocation' in navigator) {
      navigator.geolocation.getCurrentPosition((position) => {
        this.selectedLocation = {
          lat: position.coords.latitude,
          lng: position.coords.longitude,
        };
        this.addMarker();
        this.map.setCenter(this.selectedLocation);
        this.map.setZoom(this.specificLocationZoom);
      });
    }
  }

  addMarker() {
    this.overlays = [];
    this.overlays.push(
      new google.maps.Marker({
        position: this.selectedLocation,
      })
    );
    this.addlistingFormGroup.controls.listingLocation.setValue(
      this.selectedLocation
    );
  }

  clearMap() {
    this.overlays = [];
    this.addlistingFormGroup.controls.listingLocation.reset();
  }

  private initializeListingForm(listing: ISellerListing = null) {
    this.selectedCategoryId = listing?.categoryId;
    this.isUpdate = false;
    if (this.selectedCategoryId) {
      this.isUpdate = true;
    }
    this.images =
      listing?.images.map((i) => ({ id: i.imageId, src: i.imageUrl })) ?? [];
    if (listing && listing.listingLocation) {
      this.selectedLocation = listing.listingLocation;
      (this.options.center = listing.listingLocation),
        (this.options.zoom = this.specificLocationZoom);
      this.addMarker();
    } else {
      this.options.center = this.defaultMapCenter;
      this.options.zoom = this.defaultZoom;
    }
    this.addlistingFormGroup = new FormGroup({
      id: new FormControl(listing?.id),
      name: new FormControl(listing?.name, Validators.required),
      description: new FormControl(listing?.description, Validators.required),
      active: new FormControl(listing?.active ?? false, Validators.required),
      startingPrice: new FormControl(
        listing?.startingPrice ?? 1,
        Validators.required
      ),
      durationInDays: new FormControl(listing?.durationInDays),
      reservePrice: new FormControl(listing?.reservePrice ?? 1),
      priceIncrement: new FormControl(listing?.priceIncrement ?? 1),
      shippingDetails: new FormControl(listing?.shippingDetails),
      quantity: new FormControl(listing?.quantity ?? 1),
      startDate: new FormControl(
        listing?.startDate
          ? new Date(listing.startDate).toISOString().substring(0, 10)
          : ''
      ),
      endDate: new FormControl(
        listing?.endDate
          ? new Date(listing.endDate).toISOString().substring(0, 10)
          : ''
      ),
      type: new FormControl(
        listing?.type ?? ListingType.Auction,
        Validators.required
      ),
      categoryId: new FormControl(
        listing?.categoryId ?? '',
        Validators.required
      ),
      hyperlink: new FormControl(listing?.hyperlink, [
        Validators.pattern(
          '(https?://)?([\\da-z.-]+)\\.([a-z.]{2,6})[/\\w .-]*/?'
        ),
      ]),

      listingLocation: new FormControl(
        this.selectedLocation,
        Validators.required
      ),
    });
    this.checkProperties();
  }
}
