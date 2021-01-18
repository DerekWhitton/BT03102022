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
  categories: any[];

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

  ngOnInit(): void {

    this.categories = [
      {
        "id": "8d060890-94ed-41e3-9bdd-08d897b9f511",
        "parentId": "00000000-0000-0000-0000-000000000000",
        "name": "Test",
        "children": [
          {
            "id": "19f9d942-905c-43f9-42c3-08d8a2beaebe",
            "name": "But Stock"
          }
        ]
      },
      {
        "id": "d6ac6c2e-0ee7-40f3-9c22-08d8a26ea33f",
        "parentId": "00000000-0000-0000-0000-000000000000",
        "name": "Camping Equipment",
        "children": [
          {
            "id": "c8dc4529-6710-4ec2-6189-08d8a4181233",
            "name": "Tents"
          },
          {
            "id": "025cc306-4529-4663-cb6c-08d8a5e01319",
            "name": "Sleeping Bags"
          },
          {
            "id": "56067ba0-adbd-4eee-cb6d-08d8a5e01319",
            "name": "Gas Stove"
          },
          {
            "id": "1fbaad32-25ab-4e9d-cb6e-08d8a5e01319",
            "name": "Chairs"
          },
          {
            "id": "38c345c3-031a-4d7e-3aa4-08d8a7361fe8",
            "name": "test"
          }
        ]
      },
      {
        "id": "0a855d1a-fd10-4c4e-618a-08d8a4181233",
        "parentId": "00000000-0000-0000-0000-000000000000",
        "name": "Guns",
        "children": [
          {
            "id": "f164bb36-3c3a-4d1c-618b-08d8a4181233",
            "name": "Handguns"
          },
          {
            "id": "829636eb-ae9c-4d3d-a690-08d8b22b6c4b",
            "name": "Rifles"
          },
          {
            "id": "e204ab2a-1205-463a-a696-08d8b22b6c4b",
            "name": "Revolvers"
          },
          {
            "id": "bcf092bf-0a14-4ea6-9fbd-08d8b6ff35f2",
            "name": "Air Rifles"
          }
        ]
      }
    ];


  }

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
