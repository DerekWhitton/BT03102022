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
} from '@bushtrade/website/shared/services';
import {
  getUserSellers,
  registerSeller,
} from '@bushtrade/website/shared/state';
import { Store } from '@ngrx/store';
import { Observable } from 'rxjs';
import {
  addListing,
  deleteListing,
  loadListings,
  updateListing,
} from '../../+state/listings/listings.actions';
import { ListingsFacade } from '../../+state/listings/listings.facade';

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
  sellers$: Observable<ISeller[]>;

  listings$: Observable<ISellerListing[]>;
  loading$: Observable<boolean>;
  selectedSellerId: string;

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
    { label: 'Sale', value: ListingType.Sale },
  ];

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
    private listingsFacade: ListingsFacade,
    private listingSvc: ListingsService,
    private categoryService: CategoryService
  ) {
    this.loading$ = this.listingsFacade.loaded$;
  }

  ngOnInit(): void {
    this.sellers$ = this.store.select(getUserSellers);
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
    let listing = this.addlistingFormGroup.value as ICreateOrUpdateListing;
    listing.listingImageIds = this.images.map((i) => i.id);
    listing.listingPropertyValues = this.categoryProperties.map((p) => ({
      categoryPropertyId: p.id,
      value:
        p.value && typeof p.value !== typeof '' ? p.value.toString() : p.value,
    }));

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
          listing: this.addlistingFormGroup.value,
        })
      );
    }

    this.initializeListingForm();
    this.categoryProperties = [];
    this.images = [];
  }

  registerSeller() {
    this.store.dispatch(
      registerSeller({
        sellerProfile: this.signUpSellerFormGroup.value as ISeller,
      })
    );
    this.displayStartSellingDialog = false;
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
    this.selectedCategoryId = id;
    this.loadCategories(id);
  }

  async handleCategoryChainComplete(isComplete) {
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
      reservePrice: new FormControl(listing?.reservePrice ?? 1),
      priceIncrement: new FormControl(listing?.priceIncrement ?? 1),
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
