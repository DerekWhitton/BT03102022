import { Component, OnDestroy, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import {
  IBid,
  IListingDetails,
  IListingSeller,
} from '@bushtrade/website/shared/entites';
import {
  BiddingService,
  ListingsService,
  SearchService,
} from '@bushtrade/website/shared/services';
import { forkJoin, Observable, Subscription } from 'rxjs';

@Component({
  selector: 'bushtrade-web-detail',
  templateUrl: './detail.component.html',
  styleUrls: ['./detail.component.scss'],
})
export class DetailComponent implements OnInit, OnDestroy {
  constructor(
    private route: ActivatedRoute,
    private listingsService: ListingsService,
    private biddingService: BiddingService
  ) {}
  relatedItems = [];

  messages: any = [
    {
      severity: 'warn',
      summary: 'Warning',
      detail:
        "You'll need to Sign in or Create a free account before you can purchase.",
    },
  ];
  // https://via.placeholder.com/290

  detailsLoading: boolean;
  listingDetails: IListingDetails;
  listingBids: IBid[];
  highestBid: IBid;
  bidRecommendations: number[] = [];
  listingSellerSummary: IListingSeller;
  routeSubscription$: Subscription;

  private void;
  ngOnInit(): void {
    this.routeSubscription$ = this.route.params.subscribe((params) => {
      this.detailsLoading = true;
      const listingId = params['id'];
      if (listingId != null && listingId !== '') {
        const listingDetails$ = this.listingsService.loadListingDetails(
          listingId
        );
        const listingBids$ = this.biddingService.getListingBids(listingId);
        const sellerSummary$ = this.listingsService.getSellerSummary(listingId);

        forkJoin([listingDetails$, listingBids$, sellerSummary$]).subscribe(
          ([listingDetails, listingBids, sellerSummary]) => {
            this.listingDetails = listingDetails;
            this.listingBids = listingBids;
            this.listingSellerSummary = sellerSummary;
          },
          () => {
            this.messages.push({
              severity: 'error',
              summary: 'Error',
              detail: 'There was an error loading Listing Details',
            });
          },
          () => {
            this.detailsLoading = false;
            if (new Date() < new Date(this.listingDetails.endDate)) {
              this.biddingService.getHighestBid(listingId).subscribe(
                (res) => {
                  this.highestBid = res;
                  this.calculateBidRecommendations();
                },
                (error) => {
                  console.log('Error loading highest bid');
                }
              );
            }
          }
        );
      }
    });
  }

  calculateBidRecommendations() {
    this.bidRecommendations = [];
    let startBid =
      this.listingDetails.startingPrice - this.listingDetails.priceIncrement;
    if (this.highestBid != null) {
      startBid = this.highestBid.amount;
    }
    for (let i = 1; i <= 3; i++) {
      this.bidRecommendations.push(
        startBid + this.listingDetails.priceIncrement * i
      );
    }
  }

  ngOnDestroy(): void {
    this.routeSubscription$.unsubscribe();
  }
}
