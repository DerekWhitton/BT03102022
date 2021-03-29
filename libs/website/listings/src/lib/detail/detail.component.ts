import { SearchService } from './../../../../shared/services/src/lib/search/search.service';
import {
  Component,
  OnDestroy,
  OnInit,
  Input,

} from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { MsalService } from '@azure/msal-angular';
import {
  IBid,
  IBidRequest,
  IListing,
  IListingDetails,
  IListingSeller,
  ListingType,
} from '@bushtrade/website/shared/entites';
import {
  BiddingService,
  ListingsService,
  PurchasesService,
} from '@bushtrade/website/shared/services';
import { MessageService } from 'primeng/api';
import { forkJoin, Observable } from 'rxjs';

@Component({
  selector: 'bushtrade-web-detail',
  templateUrl: './detail.component.html',
  styleUrls: ['./detail.component.scss'],
})
export class DetailComponent implements OnInit, OnDestroy {

  
  loggedIn = false;

  refreshInterval: number;
  visibilityChangedListenerFunction: any;
  detailsLoading: boolean;
  refreshingSidebar: boolean;
  showConfirmModal: boolean;
  showBidsModal: boolean;
  timesUp: boolean;
  listingId: string;
  listingDetails: IListingDetails;
  listingBids: IBid[];
  userBid: IBid;
  highestBid: IBid;
  biddingRecommendations: number[] = [];
  listingSellerSummary: IListingSeller;
  listingType = ListingType;
  relatedItems = [];
  userId: string;
  userHasPlacedBid: boolean = false;
  userHasWinningBid: boolean = false;
  suggestions: any[];
  suggestedListings: IListing[];
  maxLatestListings: number = 16;
  latestItems: IListing[];
  displayCustom: boolean;
  customBid: string;

  activeIndex: number = 0;
  paymentDetails: any;

  constructor(
    private route: ActivatedRoute,
    private router: Router,
    private listingsService: ListingsService,
    private biddingService: BiddingService,
    private purchaseService: PurchasesService,
    private messageService: MessageService,
    private msalService: MsalService,
    private searchService: SearchService
  ) {}

  ngOnInit(): void {
    const { params } = this.route.snapshot;
    this.listingId = params.id;
    this.userId = this.msalService.getAccount()?.accountIdentifier;

    if (this.msalService.getAccount()) {
      this.loggedIn  = true;
    }

    this.visibilityChangedListenerFunction = function (ev) {
      this.handleVisibilityChange();
    }.bind(this);
    document.addEventListener(
      'visibilitychange',
      this.visibilityChangedListenerFunction,
      false
    );
    this.handleVisibilityChange();

    this.detailsLoading = true;

    if (this.listingId) {
      const listingDetails$ = this.listingsService.loadListingDetails(
        this.listingId
      );
      const sellerSummary$ = this.listingsService.getSellerSummary(
        this.listingId
      );

      forkJoin([listingDetails$, sellerSummary$]).subscribe(
        ([listingDetails, sellerSummary]) => {
          this.listingDetails = listingDetails;

          this.searchService
            .getSuggestions('', this.listingDetails.name)
            .subscribe((suggestions) => {
              this.suggestions = suggestions;
            });
          this.listingSellerSummary = sellerSummary;
          this.refreshingSidebar = true;
          if (listingDetails.type === ListingType.Auction) {
            this.biddingService.getListingBids(this.listingId).subscribe(
              (bids) => {
                this.listingBids = bids;
                this.userHasPlacedBid = this.userId
                  ? this.listingBids?.filter((b) => b.userId == this.userId)
                      ?.length > 0 ?? false
                  : false;
              },
              () => {
                this.messageService.add({
                  severity: 'error',
                  detail: 'There was an error loading auction bids',
                });
              },
              () => {
                this.getHighestBidAndSetRecommendations();
              }
            );
          } else {
            this.biddingService.getUserBid(this.listingId).subscribe((bid) => {
              this.userBid = bid;
              this.refreshingSidebar = false;
            });
          }
        },
        () => {
          this.messageService.add({
            severity: 'error',
            detail: 'There was an error loading listing details',
          });
        },
        () => {
          this.detailsLoading = false;
        }
      );
    }

    this.listingsService
      .loadLatestListings(this.maxLatestListings)
      .subscribe((listings) => {
        this.latestItems = listings;
      });

    // this.searchService
    //   .searchListings(
    //     null,
    //     "gun"
    //   )
    //   .subscribe((suggestions) => {
    //     this.suggestedListings = suggestions;
    //   });
  }

  imageClick(index: number) {
    this.activeIndex = index;
    this.displayCustom = true;
  }

  placeBid(amount: number): void {
    if (this.isAuctionClosed()) {
      this.messageService.add({
        severity: 'error',
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
          severity: 'error',
          detail: 'There was an error placing your bid',
        });
      },
      () => {
        this.refreshAuctionBids();
      }
    );
  }

  contactSeller(): void {
    this.biddingService.purchaseListing(this.listingId).subscribe(
      (purchase) => {
        this.router.navigate([
          '../..',
          'conversations',
          'purchase',
          purchase.conversationId,
        ]);
      },
      (error) => {
        this.showConfirmModal = false;
        this.messageService.add({
          severity: 'error',
          detail: error.error,
        });
      }
    );
  }

  checkTimeRemaining($event) {
    if ($event <= 0) {
      this.timesUp = true;
    }
  }

  private refreshAuctionBids(): void {
    this.refreshingSidebar = true;
    this.biddingService.getListingBids(this.listingId).subscribe(
      (bids) => {
        this.listingBids = bids;
        this.userHasPlacedBid = this.userId
          ? this.listingBids?.filter((b) => b.userId == this.userId)?.length >
              0 ?? false
          : false;
        if (this.listingDetails) {
          this.getHighestBidAndSetRecommendations(false);
        }
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

  private getHighestBidAndSetRecommendations(
    checkAuctionClosed: boolean = true
  ): void {
    const auctionClosed = this.isAuctionClosed();
    if (!checkAuctionClosed || !auctionClosed) {
      this.biddingService.getHighestBid(this.listingId).subscribe(
        (res) => {
          this.highestBid = res;
          this.calculateBidRecommendations();
          this.userHasWinningBid = this.userId == this.highestBid?.userId;
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
    let startBid =
      this.listingDetails.startingPrice - this.listingDetails.priceIncrement;
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

  private handleVisibilityChange() {
    if (document.hidden) {
      clearInterval(this.refreshInterval);
    } else {
      if (
        this.listingDetails &&
        this.listingDetails.type == ListingType.Auction
      ) {
        this.refreshAuctionBids();
        this.refreshInterval = setInterval(() => {
          this.refreshAuctionBids();
        }, 30 * 1000);
      }
    }
  }

  ngOnDestroy(): void {
    if (this.refreshInterval) {
      clearInterval(this.refreshInterval);
    }
    document.removeEventListener(
      'visibilitychange',
      this.visibilityChangedListenerFunction,
      false
    );
  }

}
