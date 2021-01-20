import { Component, OnDestroy, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import {
  IBid,
  IBidRequest,
  IListingDetails,
  IListingSeller,
  ListingType,
} from '@bushtrade/website/shared/entites';
import {
  BiddingService,
  ListingsService,
} from '@bushtrade/website/shared/services';
import { forkJoin, Subscription } from 'rxjs';

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

  detailsLoading: boolean;
  refreshingBids: boolean;
  listingId: string;
  listingDetails: IListingDetails;
  listingBids: IBid[];
  highestBid: IBid;
  biddingRecommendations: number[] = [];
  listingSellerSummary: IListingSeller;
  routeSubscription$: Subscription;

  ngOnInit(): void {
    this.routeSubscription$ = this.route.params.subscribe((params) => {
      this.detailsLoading = true;
      this.listingId = params['id'];

      if (this.listingId != null && this.listingId !== '') {
        const listingDetails$ = this.listingsService.loadListingDetails(this.listingId);
        const sellerSummary$ = this.listingsService.getSellerSummary(this.listingId);

        forkJoin([listingDetails$, sellerSummary$]).subscribe(
          ([listingDetails, sellerSummary]) => {
            this.listingDetails = listingDetails;
            this.listingSellerSummary = sellerSummary;

            if (listingDetails.type === ListingType.Auction) {
              this.refreshingBids = true;
              this.biddingService.getListingBids(this.listingId)
                .subscribe(
                  (bids) => this.listingBids = bids,
                  () => {
                    this.messages.push({
                      severity: 'error',
                      summary: 'Error',
                      detail: 'There was an error loading auction bids',
                    });
                  },
                  () => {
                    this.getHighestBidAndSetRecommendations();
                  }
                )
            }
          },
          () => {
            this.messages.push({
              severity: 'error',
              summary: 'Error',
              detail: 'There was an error loading listing details',
            });
          },
          () => {
            this.detailsLoading = false;
          }
        );
      }
    });
  }

  placeBid(amount: number): void {
    if (this.isAuctionClosed()) {
      this.messages.push({
        severity: 'error',
        summary: 'Error',
        detail: 'This auction has closed!',
      });
      this.biddingRecommendations = [];
      this.refreshAuctionBids();
      return;
    }

    const bidRequest: IBidRequest = {
      listingId: this.listingId,
      amount: amount,
    };
    this.biddingService.placeBid(bidRequest).subscribe(
      () => {},
      () => {
        this.messages.push({
          severity: 'error',
          summary: 'Error',
          detail: 'There was an error placing your bid',
        });
      },
      () => {
        this.refreshAuctionBids();
      }
    );
  }

  private refreshAuctionBids(): void {
    this.refreshingBids = true;
    this.biddingService.getListingBids(this.listingId).subscribe(
      (bids) => {
        this.listingBids = bids;
        this.getHighestBidAndSetRecommendations(false);
      },
      () => {
        this.refreshingBids = false;
        this.messages.push({
          severity: 'error',
          summary: 'Error',
          detail: 'There was an error refreshing bids',
        });
      }
    );
  }

  private getHighestBidAndSetRecommendations(checkAuctionClosed: boolean = true): void {
    const auctionClosed = this.isAuctionClosed();
    if (!checkAuctionClosed || !auctionClosed) {
      this.biddingService.getHighestBid(this.listingId).subscribe(
        (res) => {
          this.highestBid = res;
          this.calculateBidRecommendations();
        },
        () => {
          console.log('Error loading highest bid');
        },
        () => {
          this.refreshingBids = false;
        }
      );
    } else if (auctionClosed) {
      this.refreshingBids = false;
      this.biddingRecommendations = [];
    }
  }

  private calculateBidRecommendations(): void {
    let startBid = this.listingDetails.startingPrice - this.listingDetails.priceIncrement;
    if (this.highestBid != null) {
      startBid = this.highestBid.amount;
    }
    const nextBids: number[] = [];
    for (let i = 1; i <= 3; i++) {
      nextBids.push(startBid + this.listingDetails.priceIncrement * i);
    }
    this.biddingRecommendations = nextBids;
  }

  private isAuctionClosed(): boolean {
    return new Date() > new Date(this.listingDetails.endDate);
  }

  ngOnDestroy(): void {
    this.routeSubscription$.unsubscribe();
  }
}
