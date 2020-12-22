import { Component, Input, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import {
  ICategory,
  ICategoryProperty,
  IListing,
  ISeller,
} from '@bushtrade/website/shared/entites';
import { Observable, Subject } from 'rxjs';
import {
  addListing,
  addListingImage,
  deleteListing,
  loadListing,
  loadListings,
  updateListing,
} from '../../+state/listings/listings.actions';
import { ListingsFacade } from '../../+state/listings/listings.facade';
import { CategoryService } from '@bushtrade/website/shared/services';
import { Store } from '@ngrx/store';
import {
  getUserSellers,
  registerSeller,
} from '@bushtrade/website/shared/state';

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

  categories$: Observable<ICategory[]>;
  showProperties: boolean = false;
  categoryProperties$: Observable<ICategoryProperty[]>;
  listingProperties: {}[] = [];

  imageIds: string[] = [];

  addlistingFormGroup: FormGroup = new FormGroup({
    name: new FormControl('', Validators.required),
    description: new FormControl('', Validators.required),
    active: new FormControl(false, Validators.required),
    startingPrice: new FormControl('', Validators.required),
    priceIncrement: new FormControl('', Validators.required),
    categoryId: new FormControl('', Validators.required),
    listingImageIds: new FormControl(''),
    listingPropertyValues: new FormControl(''),
  });

  updatelistingFormGroup: FormGroup = new FormGroup({
    name: new FormControl('', Validators.required),
    description: new FormControl('', Validators.required),
    active: new FormControl(false, Validators.required),
    startingPrice: new FormControl('', Validators.required),
    priceIncrement: new FormControl('', Validators.required),
    categoryId: new FormControl('', Validators.required),
    listingImageIds: new FormControl('', Validators.required),
    listingPropertyValues: new FormControl('', Validators.required),
  });

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
    this.categories$ = this.categoryService.loadCategories();
    var ctx = this;
    this.listingsFacade.imageIds$.subscribe({
      next(ids) {
        ctx.imageIds = ids;
        if (ids.length > 0) {
          ctx.uploadStatus = 'Uploaded';
        }
      },
    });
  }

  loadListings(seller) {
    this.selectedSellerId = seller.id;
    this.listingsFacade.dispatch(loadListings({ sellerId: seller.id }));
    this.listings$ = this.listingsFacade.allListings$;
  }

  // updateProperties(category) {
  //   this.showProperties = true;
  //   console.log(this.showProperties);
  //   this.categoryProperties$ = this.categoryService.loadCategoryProperties(
  //     category.id
  //   );
  // }

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

  updateProperties() {
    this.showProperties = true;
    this.categoryProperties$ = this.categoryService.loadCategoryProperties(
      '19f9d942-905c-43f9-42c3-08d8a2beaebe'
    );
  }

  setPropertyvalue(id, value, method) {
    let property = new Object({ categoryPropertyId: id, value: value });
    this.listingProperties.push(property);

    if (method == 'add') {
      this.addlistingFormGroup.patchValue({
        ...this.addlistingFormGroup.value,
        listingPropertyValues: this.listingProperties,
      });
    } else if (method == 'update') {
      this.updatelistingFormGroup.patchValue({
        ...this.updatelistingFormGroup.value,
        listingPropertyValues: this.listingProperties,
      });
    }
  }

  handleUpdateSelection(data) {
    this.listingsFacade.dispatch(
      loadListing({ sellerId: this.selectedSellerId, listingId: data.id })
    );
    var ctx = this;
    this.listingsFacade.selectedListings$.subscribe({
      next(listing) {
        if (typeof listing != 'undefined') {
          ctx.imageIds = listing.images.map((l) => l.id);
          ctx.updatelistingFormGroup.patchValue({
            ...listing,
          });
        }
      },
    });
  }

  updateListing() {
    this.updatelistingFormGroup.patchValue({
      ...this.updatelistingFormGroup.value,
      categoryId: '19f9d942-905c-43f9-42c3-08d8a2beaebe',
      listingImageIds: this.imageIds,
      listingPropertyValues: this.listingProperties,
    });
    this.listingsFacade.dispatch(
      updateListing({
        sellerId: this.selectedSellerId,
        listing: this.updatelistingFormGroup.value,
      })
    );
    this.updatelistingFormGroup.reset();
    this.listingProperties = [];
    this.imageIds = [];
  }

  deleteListing(data) {
    this.listingsFacade.dispatch(
      deleteListing({ sellerId: this.selectedSellerId, listingId: data.id })
    );
  }

  addListing() {
    // this.addlistingFormGroup.patchValue({
    //   ...this.addlistingFormGroup.value,
    //   categoryId: this.addlistingFormGroup.get('categoryId').value.id,
    // listingImageIds: this.imageIds,
    //    listingPropertyValues : this.listingProperties
    // });
    this.addlistingFormGroup.patchValue({
      ...this.addlistingFormGroup.value,
      categoryId: '19f9d942-905c-43f9-42c3-08d8a2beaebe',
      listingImageIds: this.imageIds,
      listingPropertyValues: this.listingProperties,
    });
    this.listingsFacade.dispatch(
      addListing({
        sellerId: this.selectedSellerId,
        listing: this.addlistingFormGroup.value,
      })
    );

    this.addlistingFormGroup.reset();
    this.listingProperties = [];
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
}
