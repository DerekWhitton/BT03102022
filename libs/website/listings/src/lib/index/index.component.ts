import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, NavigationEnd, Router } from '@angular/router';
import {
  ICategory,
  IListing,
  ILocation,
  IPaginatedResponse,
  ISearchFacet,
  ListingSortField,
  ListingType,
  SortOrder,
} from '@bushtrade/website/shared/entites';
import {
  SearchService,
  CategoryService,
} from '@bushtrade/website/shared/services';
import { Subscription } from 'rxjs';

@Component({
  selector: 'bushtrade.web-index',
  templateUrl: './index.component.html',
  styleUrls: ['./index.component.scss'],
})
export class IndexComponent implements OnInit {
  sortOrderEnum = SortOrder;
  sortFieldEnum = ListingSortField;

  type: ListingType;
  listingSortField: ListingSortField = ListingSortField.Price;
  sortOrder: SortOrder = SortOrder.Ascending;
  maxFeaturedCategories = 8;
  query: string = '';
  facets: { key: string; value: string }[] = [];
  categoryId: string;
  maxPrice: number;
  displayFilters: boolean = false;
  mobile: boolean = false;

  routerSubscription$: Subscription;
  searchSubscription$: Subscription;
  searchResponse: IPaginatedResponse<IListing>;
  isSearching: boolean = false;
  facetSubscription$: Subscription;
  facetsResponse: ISearchFacet[];
  isLoadingFacets: boolean;
  featuredCategories: ICategory[];
  searchPriceRange: number[] = [];
  subCategories: ICategory[];
  parentCategory: any[] = [];
  // Location range search
  userLocation: ILocation;
  selectableDistanceRanges: any[] = [
    { label: "50km", value: 50 },
    { label: "100km", value: 100 },
    { label: "150km", value: 150 },
    { label: "200km", value: 200 },
  ];
  selectedRange: any;

  constructor(
    private router: Router,
    private route: ActivatedRoute,
    private searchService: SearchService,
    private categoryService: CategoryService
  ) {
    this.routerSubscription$ = router.events.subscribe((ev) => {
      if (ev instanceof NavigationEnd && ev.url.startsWith('/listings')) {
        this.buildAndActionQueries();
      }
    });

    if (window.screen.width < 768) {
      // 768px portrait
      this.mobile = true;
    }
  }

  ngOnInit(): void {
    this.categoryService
      .loadFeaturedCategories(this.maxFeaturedCategories)
      .subscribe((categories) => {
        this.featuredCategories = categories;
      });

    this.parentCategory.push(this.categoryId);
    this.updateSubCategory(this.categoryId);
  }

  changeType(val) {
    this.type = val;
    this.maxPrice = null;
    this.searchPriceRange[1] = null;
    this.navigate();
  }

  changeSubCategory(value = '') {
    this.parentCategory.push(value);
    this.updateSubCategory(value);
    this.categoryId = value;
    this.navigate();
  }

  getParentCategory() {
    this.parentCategory.pop();
    this.updateSubCategory(this.parentCategory[this.parentCategory.length - 1]);
  }


  handleSearch() {
    this.searchResponse = null;
    this.facetsResponse = null;
    this.navigate();
  }

  handleCategorySelection(categoryId: string) {
    if (this.categoryId != categoryId) {
      this.categoryId = categoryId;
    } else {
      this.categoryId = null;
    }
    this.query = null;
    this.facets = null;

    this.navigate();
  }

  handleFacetSelection($event: { key: string; value: string }) {
    const { key, value } = $event;
    const existingIndex = this.facets.findIndex(
      (f) => f.key == key && f.value == value
    );

    if (existingIndex >= 0) {
      this.facets.splice(existingIndex, 1);
    } else {
      this.facets.push($event);
    }

    this.navigate();
  }

  sortBy(sortField: ListingSortField) {
    if (this.listingSortField == sortField)
    {
      this.sortOrder = this.sortOrder == SortOrder.Ascending ? SortOrder.Descending : SortOrder.Ascending;
    }
    else
    {
      this.listingSortField = sortField;
      this.sortOrder = SortOrder.Ascending;
    }
    this.dispatchListingQuery();
  }

  filterDistanceRange() {
    if ('geolocation' in navigator) {
      navigator.geolocation.getCurrentPosition((position) => {
        this.userLocation = {
          lat: position.coords.latitude,
          lng: position.coords.longitude
        };
        this.dispatchListingQuery();
      });
    }
  }

  private navigate() {
    const { query, type, categoryId, facets } = this;

    let queryParams = {
      type,
      categoryId,
      minPrice: this.searchPriceRange[0],
      maxPrice: this.searchPriceRange[1],
    };
    if (query && query.trim().length) {
      queryParams['q'] = query;
    }
    if (facets && facets.length) {
      queryParams['filter'] = this.facets.map((f) => `${f.key}:${f.value}`);
    }

    this.router.navigate(['/', 'listings'], {
      queryParams,
    });

    this.updateSubCategory(this.categoryId);
  }

  private buildAndActionQueries() {
    const queryParams = this.route.snapshot.queryParams;

    if (!this.maxPrice || this.type != queryParams?.type) {
      this.searchService
        .getMaxPrice(queryParams?.type)
        .subscribe((maxPrice) => {
          this.maxPrice = maxPrice ?? 0;
          this.setPriceRange(queryParams?.minPrice, queryParams?.maxPrice);
        });
    } else {
      this.setPriceRange(queryParams?.minPrice, queryParams?.maxPrice);
    }
    this.type = queryParams?.type;
    this.categoryId = queryParams?.categoryId;
    this.query = queryParams?.q ? queryParams.q : '';

    if (queryParams?.filter && typeof queryParams.filter === typeof '') {
      this.facets = [this.filterStringToFacetOption(queryParams.filter)];
    } else if (queryParams?.filter && typeof queryParams.filter === typeof []) {
      this.facets = queryParams.filter.map(this.filterStringToFacetOption);
    } else {
      this.facets = [];
    }

    this.dispatchListingQuery();
    this.dispatchFacetsQuery();
  }

  private dispatchListingQuery(): void {
    if (this.searchSubscription$) {
      this.searchSubscription$.unsubscribe();
    }

    this.isSearching = true;
    const { query, type, categoryId, facets, searchPriceRange } = this;

    this.searchSubscription$ = this.searchService
      .searchListings(
        type,
        this.listingSortField,
        this.sortOrder,
        query,
        categoryId,
        facets,
        searchPriceRange[0],
        searchPriceRange[1],
        this.userLocation,
        this.selectedRange
      )
      .subscribe(
        (res) => {
          this.searchResponse = res;
        },
        (err) => console.log(err),
        () => {
          this.isSearching = false;
        }
      );
  }

  private dispatchFacetsQuery(): void {
    if (this.facetSubscription$) {
      this.facetSubscription$.unsubscribe();
    }
    this.isLoadingFacets = true;
    this.facetSubscription$ = this.searchService
      .getListingSearchFacets(this.type, this.query, this.categoryId)
      .subscribe(
        (res) => {
          this.facetsResponse = res;
        },
        (err) => console.log(err),
        () => {
          this.isLoadingFacets = false;
        }
      );
  }

  private filterStringToFacetOption(
    filterString: string
  ): { key: string; value: string } {
    const parts = filterString.split(':');
    return {
      key: parts[0],
      value: parts[1],
    };
  }

  private setPriceRange(lowPrice: number, highPrice: number) {
    let intervalStart: number;
    let intervalEnd: number;
    if (lowPrice && !isNaN(lowPrice)) {
      intervalStart = lowPrice > this.maxPrice ? 0 : lowPrice;
    } else {
      intervalStart = 0;
    }
    if (highPrice && !isNaN(highPrice)) {
      intervalEnd = highPrice > this.maxPrice ? this.maxPrice : highPrice;
    } else {
      intervalEnd = this.maxPrice;
    }

    this.searchPriceRange = [intervalStart, intervalEnd];
  }

  private updateSubCategory(categoryToGet) {
    this.categoryService
      .loadCategories(categoryToGet)
      .subscribe((categories) => {
        this.subCategories = categories;
      });
  }

  ngOnDestroy(): void {
    if (this.routerSubscription$) {
      this.routerSubscription$.unsubscribe();
    }

    if (this.searchSubscription$) {
      this.searchSubscription$.unsubscribe();
    }

    if (this.facetSubscription$) {
      this.facetSubscription$.unsubscribe();
    }
  }
}
