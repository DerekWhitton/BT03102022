import { Component, Input, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import {
  ICategory,
  ICategoryProperty,
  IListing,
} from '@bushtrade/website/shared/entites';
import { Observable, Subject } from 'rxjs';
import {
  addListing,
  addListingImage,
  loadListings,
} from '../../+state/listings/listings.actions';
import { ListingsFacade } from '../../+state/listings/listings.facade';
import { CategoryService } from '@bushtrade/website/shared/services';

@Component({
  selector: 'website-seller-index',
  templateUrl: './seller-index.component.html',
  styleUrls: ['./seller-index.component.scss'],
})
export class SellerIndexComponent implements OnInit {
  @Input() sellers;

  listings$: Observable<IListing[]>;
  loading$: Observable<boolean>;
  selectedSellerId: string;

  columns = [
    { field: 'name', header: 'Name' },
    { field: 'startingPrice', header: 'Starting Price' },
  ];

  loaded$: Observable<boolean>;
  displayStartSellingDialog: boolean = false;

  categories$: Observable<ICategory[]>;
  showProperties: boolean = false;
  categoryProperties$: Observable<ICategoryProperty[]>;
  listingProperties: { categoryPropertyId: ''; value: '' }[] = [];

  imageIds: string[] = [];

  addlistingFormGroup: FormGroup = new FormGroup({
    name: new FormControl('', Validators.required),
    description: new FormControl('', Validators.required),
    active: new FormControl(false, Validators.required),
    startingPrice: new FormControl('', Validators.required),
    priceIncrement: new FormControl('', Validators.required),
    categoryId: new FormControl('', Validators.required),
    listingImageIds: new FormControl('', Validators.required),
    listingPropertyValues: new FormControl('', Validators.required),
  });
  constructor(
    private listingsFacade: ListingsFacade,
    private categoryService: CategoryService
  ) {
    this.loading$ = this.listingsFacade.loaded$;
  }

  ngOnInit(): void {
    this.categories$ = this.categoryService.loadCategories();
    var ctx = this;
    this.listingsFacade.imageIds$.subscribe({
      next(ids) {
        ctx.imageIds = ids;
      },
    });
  }

  loadListings(seller) {
    this.selectedSellerId = seller.id;
    console.log(seller.id);
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
    this.listingsFacade.dispatch(
      addListingImage({ sellerId: this.selectedSellerId, file: event.files[0] })
    );
  }

  updateProperties() {
    this.showProperties = true;
    console.log(this.showProperties);
    this.categoryProperties$ = this.categoryService.loadCategoryProperties(
      '19f9d942-905c-43f9-42c3-08d8a2beaebe'
    );
  }

  setPropertyvalue(id, value) {
    console.log(value);
    this.listingProperties.push({ categoryPropertyId: id, value: value });
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
    console.log(this.addlistingFormGroup.value);
    this.listingsFacade.dispatch(
      addListing({
        sellerId: this.selectedSellerId,
        listing: this.addlistingFormGroup.value,
      })
    );
  }
}
