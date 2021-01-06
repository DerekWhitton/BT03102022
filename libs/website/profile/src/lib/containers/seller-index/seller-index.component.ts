import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import {
  CategoryPropertyType,
  ICategory,
  ICategoryProperty,
  ICreateListing,
  IListing,
  ISeller,
  ListingType,
} from '@bushtrade/website/shared/entites';
import { CategoryService } from '@bushtrade/website/shared/services';
import {
  getUserSellers,
  registerSeller,
} from '@bushtrade/website/shared/state';
import { Store } from '@ngrx/store';
import { Observable } from 'rxjs';
import {
  addListing,
  addListingImage,
  deleteListing,
  loadListings,
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
  sellers$: Observable<ISeller[]>;

  listings$: Observable<IListing[]>;
  loading$: Observable<boolean>;
  selectedSellerId: string;

  columns = [
    { field: 'name', header: 'Name' },
    { field: 'startingPrice', header: 'Starting Price' },
    { field: 'category', header: 'Category' },
  ];

  loaded$: Observable<boolean>;
  displayStartSellingDialog: boolean = false;

  uploadStatus: string = '';

  CategoryPropertyType = CategoryPropertyType;
  ListingType = ListingType;
  selectableListingTypeOptions: { label: string; value: ListingType }[] = [
    { label: 'Auction', value: ListingType.Auction },
    { label: 'Sale', value: ListingType.Sale },
  ];

  showProperties: boolean = false;
  categoryProperties: ICategoryPropertyWithUserSelectedValue[];

  imageIds: string[] = [];

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
    name: new FormControl('', Validators.required),
    isPrivateIndividual: new FormControl(true, Validators.required),
  });

  constructor(
    private store: Store,
    private listingsFacade: ListingsFacade,
    private categoryService: CategoryService
  ) {
    this.loading$ = this.listingsFacade.loaded$;
  }

  ngOnInit(): void {
    this.sellers$ = this.store.select(getUserSellers);
    this.initializeListingForm();
    var ctx = this;
    this.listingsFacade.imageIds$.subscribe({
      next(ids) {
        ctx.imageIds = ids;
        if (ids.length > 0) {
          ctx.uploadStatus = 'Uploaded';
        }
      },
    });

    this.loadCategories();
  }

  loadListings(seller) {
    this.selectedSellerId = seller.id;
    this.listingsFacade.dispatch(loadListings({ sellerId: seller.id }));
    this.listings$ = this.listingsFacade.allListings$;
  }

  uploadListingImage(event) {
    this.uploadStatus = 'Uploading...';
    this.listingsFacade.dispatch(
      addListingImage({ sellerId: this.selectedSellerId, file: event.files[0] })
    );

    this.addlistingFormGroup.patchValue({
      ...this.addlistingFormGroup.value,
      listingImageIds: this.imageIds,
    });
  }

  handleUpdateSelection(data) {
    // this.listingsFacade.dispatch(
    //   loadListing({ sellerId: this.selectedSellerId, listingId: data.id })
    // );
    // var ctx = this;
    // this.listingsFacade.selectedListings$.subscribe({
    //   next(listing) {
    //     if (typeof listing != 'undefined') {
    //       ctx.imageIds = listing.images.map((l) => l.id);
    //       ctx.updatelistingFormGroup.patchValue({
    //         ...listing,
    //       });
    //     }
    //   },
    // });
  }

  updateListing() {
    // this.updatelistingFormGroup.patchValue({
    //   ...this.updatelistingFormGroup.value,
    //   categoryId: '19f9d942-905c-43f9-42c3-08d8a2beaebe',
    //   listingImageIds: this.imageIds,
    //   listingPropertyValues: this.listingProperties,
    // });
    // this.listingsFacade.dispatch(
    //   updateListing({
    //     sellerId: this.selectedSellerId,
    //     listing: this.updatelistingFormGroup.value,
    //   })
    // );
    // this.updatelistingFormGroup.reset();
    // this.listingProperties = [];
    // this.imageIds = [];
  }

  deleteListing(data) {
    this.listingsFacade.dispatch(
      deleteListing({ sellerId: this.selectedSellerId, listingId: data.id })
    );
  }

  saveListing() {
    let listing = this.addlistingFormGroup.value as ICreateListing;

    listing.listingImageIds = this.imageIds;
    listing.listingPropertyValues = this.categoryProperties.map((p) => ({
      categoryPropertyId: p.id,
      value: p.value,
    }));

    this.listingsFacade.dispatch(
      addListing({
        sellerId: this.selectedSellerId,
        listing: this.addlistingFormGroup.value,
      })
    );
    // this.addlistingFormGroup.reset();
    this.categoryProperties = [];
    this.imageIds = [];
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
    } else {
      this.categoryProperties = [];
    }
  }

  private initializeListingForm() {
    this.addlistingFormGroup = new FormGroup({
      name: new FormControl('', Validators.required),
      description: new FormControl('', Validators.required),
      active: new FormControl(false, Validators.required),
      startingPrice: new FormControl('', Validators.required),
      priceIncrement: new FormControl('', Validators.required),
      quantity: new FormControl(1, Validators.required),
      startDate: new FormControl('', Validators.required),
      endDate: new FormControl('', Validators.required),
      type: new FormControl(ListingType.Auction, Validators.required),
      categoryId: new FormControl('', Validators.required),
    });
  }
}
