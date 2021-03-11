import { Component, OnInit, ViewChild } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import {
  CategoryPropertyType,
  ICategory,
  ICategoryProperty,
  ICreateOrUpdateListing,
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
import { select, Store } from '@ngrx/store';
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
import { getListingsError } from '../../+state/listings/listings.selectors';

interface ICategoryPropertyWithUserSelectedValue extends ICategoryProperty {
  value: string;
  selectableOptions: { label: string; value: string }[];
}

@Component({
  selector: 'website-seller-index',
  templateUrl: './seller-index.component.html',
  styleUrls: ['./seller-index.component.scss'],
})
export class SellerIndexComponent implements OnInit {
  @ViewChild('fileUpload') fileUpload: any;
  sellers: ISeller[];

  listings$: Observable<ISellerListing[]>;
  loading$: Observable<boolean>;
  lastListingError$ = this.listingsFacade.lastKnownError$;
  listingSaved$ = this.listingsFacade.listingSaved$;
  selectedSellerId: string;
  displayCreateUpdateDialog = false;
  isPrivate: boolean = true;

  columns = [
    { field: 'name', header: 'Name' },
    {
      field: 'startingPrice',
      header: 'Starting Price',
      converter: (val) => `R${val}`,
    },
    { field: 'type', header: 'Type', converter: (val) => ListingType[val] },
  ];

  loaded$: Observable<boolean>;
  displayStartSellingDialog: boolean = false;

  CategoryPropertyType = CategoryPropertyType;
  ListingType = ListingType;
  selectableListingTypeOptions: { label: string; value: ListingType }[] = [
    { label: 'Auction', value: ListingType.Auction },
    { label: 'For Sale', value: ListingType.Sale },
  ];
  selectableAuctionDurationSettings: { label: string; value: ListingType }[];

  showProperties: boolean = false;
  categoryProperties: ICategoryPropertyWithUserSelectedValue[];

  images: { id: string; src: string }[] = [];

  categoryTree: ICategory[] = [];
  loadingCategories: boolean = false;
  selectedCategoryId: string = null;

  addlistingFormGroup: FormGroup;

  signUpSellerFormGroup: FormGroup = new FormGroup({
    bank: new FormControl('', Validators.required),
    branchCode: new FormControl('', Validators.required),
    accountType: new FormControl('', Validators.required),
    accountNumber: new FormControl('', Validators.required),
    taxNumber: new FormControl('', Validators.required),
    ckNumber: new FormControl('', Validators.required),
    name: new FormControl('username', Validators.required),
    isPrivateIndividual: new FormControl(true, Validators.required),
  });
  editModalDataIsInitializing: boolean;
  editListingPropertyValues: ISellerListingPropertyValue[] = [];
  isUploadingImageFiles: boolean;

  constructor(
    private store: Store,
    private messageService: MessageService,
    private listingsFacade: ListingsFacade,
    private listingSvc: ListingsService,
    private categoryService: CategoryService,
    private siteSettingsService: SiteSettingsService
  ) {
    this.loading$ = this.listingsFacade.loaded$;
  }

  ngOnInit(): void {
    this.store.select(getUserSellers).subscribe((sellers: ISeller[]) => {
      this.sellers = sellers;
      if (sellers.length > 0) {
        this.loadListings(sellers?.[0]);
      }
    });
    this.siteSettingsService
      .loadAuctionDurationSettings()
      .subscribe((settings) => {
        this.selectableAuctionDurationSettings = settings.map((s) => {
          return {
            label: `${s.numberOfDays} days`,
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

  loadListings(seller) {
    this.selectedSellerId = seller.id;
    this.listingsFacade.dispatch(loadListings({ sellerId: seller.id }));
    this.listings$ = this.listingsFacade.allListings$;
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

      let ctx = this;

      let reader = new FileReader();
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
    var listing: ICreateOrUpdateListing;
    listing = { ...(this.addlistingFormGroup.value as ICreateOrUpdateListing) };
    listing.listingImageIds = this.images.map((i) => i.id);
    listing.listingPropertyValues = this.categoryProperties.map((p) => ({
      categoryPropertyId: p.id,
      value:
        p.value && typeof p.value !== typeof '' ? p.value.toString() : p.value,
    }));

    this.listingSaved$.pipe(first()).subscribe(() => {
      this.lastListingError$.pipe(filter(e => e != null), first()).subscribe((error) => {
        if (!error) {
          this.messageService.add({
            severity: 'success',
            detail:'Listing saved successfuly'
          });
          this.clearForm();
        }
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

  clearForm() {
    this.displayCreateUpdateDialog = false;
    this.initializeListingForm();
    this.categoryProperties = [];
    this.images = [];
  }

  private async loadCategories(parentId: string = null) {
    this.loadingCategories = true;

    const categoryResult = await this.categoryService
      .loadCategories(parentId)
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
    if (this.addlistingFormGroup.value.type == 0) {
      if (
        this.addlistingFormGroup.value.startingPrice >
        this.addlistingFormGroup.value.reservePrice
      ) {
        this.addlistingFormGroup.patchValue({
          reservePrice: this.addlistingFormGroup.value.startingPrice,
        });
      }
    }
  }

  private initializeListingForm(listing: ISellerListing = null) {
    this.selectedCategoryId = listing?.categoryId;
    this.images = listing?.images.map((i) => ({ id: i.id, src: i.url })) ?? [];
    this.addlistingFormGroup = new FormGroup({
      id: new FormControl(listing?.id),
      name: new FormControl(listing?.name, Validators.required),
      description: new FormControl(listing?.description, Validators.required),
      active: new FormControl(listing?.active ?? false, Validators.required),
      startingPrice: new FormControl(
        listing?.startingPrice,
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
    });
  }
}
