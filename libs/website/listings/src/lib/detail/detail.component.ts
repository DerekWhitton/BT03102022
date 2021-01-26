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
import { MessageService } from 'primeng/api';

@Component({
  selector: 'bushtrade-web-detail',
  templateUrl: './detail.component.html',
  styleUrls: ['./detail.component.scss'],
})
export class DetailComponent implements OnInit, OnDestroy {
  constructor(
    private route: ActivatedRoute,
    private listingsService: ListingsService,
    private biddingService: BiddingService,
    private messageService: MessageService
  ) {}

  listingType = ListingType;
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
  refreshingSidebar: boolean;
  showConfirmModal: boolean;
  showBidsModal: boolean;
  timesUp: boolean;
  listingId: string;
  listingDetails: IListingDetails;
  listingBids: IBid[];
  highestBid: IBid;
  biddingRecommendations: number[] = [];
  listingSellerSummary: IListingSeller;
  reservationExpiration: Date;
  routeSubscription$: Subscription;

  ngOnInit(): void {
    this.routeSubscription$ = this.route.params.subscribe((params) => {
      this.detailsLoading = true;
      this.listingId = params['id'];

      if (this.listingId) {
        const listingDetails$ = this.listingsService.loadListingDetails(this.listingId);
        const sellerSummary$ = this.listingsService.getSellerSummary(this.listingId);

        forkJoin([listingDetails$, sellerSummary$]).subscribe(
          ([listingDetails, sellerSummary]) => {
            this.listingDetails = listingDetails;
            this.listingSellerSummary = sellerSummary;

            if (listingDetails.type === ListingType.Auction) {
              this.refreshingSidebar = true;
              this.biddingService.getListingBids(this.listingId)
                .subscribe(
                  (bids) => this.listingBids = bids,
                  () => {
                    this.messageService.add({
                      severity: 'error',
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
            this.messageService.add({
              severity: 'err',
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
      this.messageService.add({
        severity: 'err',
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
      () => {
        this.messageService.add({
          severity: 'success',
          detail: 'Bid placed successfully',
        });
      },
      () => {
        this.messageService.add({
          severity: 'err',
          detail: 'There was an error placing your bid',
        });
      },
      () => {
        this.refreshAuctionBids();
      }
    );
  }

  reservePurchase(): void {
    this.biddingService.reservePurchase(this.listingId)
      .subscribe(
        (bid) => {
          this.timesUp = false;
          const endDate = new Date(bid.placedAt);
          endDate.setSeconds(endDate.getSeconds() + 30);
          this.reservationExpiration = endDate;
          this.showConfirmModal = true;
        },
        (error) => {
          this.messageService.add({
            severity: 'error',
            detail: error.error });
        }
      );
  }

  confirmPurchase(): void {
    this.timesUp = true;
    this.biddingService.purchaseListing(this.listingId)
      .subscribe(
        (purchase) => {
          this.showConfirmModal = false;
          this.listingDetails.isSold = true;
          this.messageService.add({
            severity: 'success',
            detail: 'You successfully purchased this item',
          });
        },
        (error) => {
          this.messageService.add({
            severity: 'error',
            detail: error.error,
          });
        }
      );
  }

  cancelPurchase(): void {
    this.showConfirmModal = false;
    this.biddingService.cancelPurchase(this.listingId)
      .subscribe(
        () => {
          this.messageService.add({
            severity: 'info',
            detail: 'Purchase was cancelled'
          });
        }
      );
  }

  checkTimeRemaining($event) {
    if ($event <= 0) {
      this.timesUp = true;

      if (this.showConfirmModal) {
        this.showConfirmModal = false;
        this.messageService.add({
          severity: 'warn',
          detail: 'The confirmation time expired',
        });
      }
    }
  }

  private refreshAuctionBids(): void {
    this.refreshingSidebar = true;
    this.biddingService.getListingBids(this.listingId).subscribe(
      (bids) => {
        this.listingBids = bids;
        this.getHighestBidAndSetRecommendations(false);
      },
      () => {
        this.refreshingSidebar = false;
        this.messageService.add({
          severity: 'error',
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
          this.refreshingSidebar = false;
        }
      );
    } else if (auctionClosed) {
      this.refreshingSidebar = false;
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
