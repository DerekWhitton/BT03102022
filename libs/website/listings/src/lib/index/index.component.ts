import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, NavigationEnd, Router } from '@angular/router';
import {
  IListing,
  IPaginatedResponse,
  ISearchFacet,
  ListingType,
} from '@bushtrade/website/shared/entites';
import { SearchService } from '@bushtrade/website/shared/services';
import { Subscription } from 'rxjs';

@Component({
  selector: 'bushtrade.web-index',
  templateUrl: './index.component.html',
  styleUrls: ['./index.component.scss'],
})
export class IndexComponent implements OnInit {
  type: ListingType;
  query: string = '';
  facets: { key: string; value: string }[] = [];

  routerSubscription$: Subscription;
  searchSubscription$: Subscription;
  searchResponse: IPaginatedResponse<IListing>;
  isSearching: boolean = false;
  facetSubscription$: Subscription;
  facetsResponse: ISearchFacet[];
  isLoadingFacets: boolean;

  constructor(
    private router: Router,
    private route: ActivatedRoute,
    private searchService: SearchService
  ) {
    this.routerSubscription$ = router.events.subscribe((ev) => {
      if (
        ev instanceof NavigationEnd &&
        ev.url.startsWith('/listings') &&
        ev.url.indexOf('type=') >= 0
      ) {
        this.buildAndActionQueries();
      }
    });
  }

  ngOnInit(): void {}

  handleSearch() {
    this.searchResponse = null;
    this.facetsResponse = null;
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

  private navigate() {
    const { query, type, facets } = this;

    let queryParams = { type };
    if (query && query.trim().length) {
      queryParams['q'] = query;
    }
    if (facets && facets.length) {
      queryParams['filter'] = this.facets.map((f) => `${f.key}:${f.value}`);
    }

    this.router.navigate(['/', 'listings'], {
      queryParams,
    });
  }

  private buildAndActionQueries() {
    const queryParams = this.route.snapshot.queryParams;

    this.type = queryParams?.type;
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
    const { query, type, facets } = this;

    this.searchSubscription$ = this.searchService
      .searchListings(type, query, null, facets)
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
      .getListingSearchFacets(this.type, this.query)
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
