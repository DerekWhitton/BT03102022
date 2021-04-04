import { environment } from './../../../../../../apps/seller-portal/src/environments/environment';
import { SearchService } from './../../../../shared/services/src/lib/search/search.service';
import { Component, Inject, OnDestroy, OnInit, ViewChild } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { getUser, loadUser } from '@bushtrade/website/shared/state';
import { MsalService } from '@azure/msal-angular';
import { Store } from '@ngrx/store';
import {
  IBid,
  IBidRequest,
  ICreateListingAnswer,
  ICreateListingQuestion,
  IListing,
  IListingDetails,
  IListingSeller,
  ISellerListingConversationMessage,
  IUser,
  ListingType,
} from '@bushtrade/website/shared/entites';
import {
  BiddingService,
  ConversationsService,
  ListingsService,
  PurchasesService,
} from '@bushtrade/website/shared/services';
import { MessageService } from 'primeng/api';
import { forkJoin, Observable } from 'rxjs';
import { APP_CONFIG } from '@bushtrade/app-config';

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

  // Q&A Section
  questions: ISellerListingConversationMessage[] = []; // Questions retrieved for the current listing
  newQuestion: string = ''; // Holds any new question that is to be asked
  questionAnswer: string = ''; // Holds any answer that is to be given to a question
  questionAnswerId: string; // Holds the id of the question we are answering
  @ViewChild('op') answerDialogue; // Controls state of pop-up for answering questions

  user$: Observable<IUser>; // Contains meta-data for user including their reseller acccount which are used to check their ability to participate in Q&A
  userCanQuestion = false; // Whether this user can add questions to the listing
  isSeller = false; // The current user is the seller of the product
  isBuyer = false; 
  // End - Q&A Section

  activeIndex: number = 0;
  paymentDetails: any;

  // Google Maps
  mapsApiKey: string;

  constructor(
    @Inject(APP_CONFIG) private configuration: any,
    private route: ActivatedRoute,
    private router: Router,
    private store: Store,
    private listingsService: ListingsService,
    private biddingService: BiddingService,
    private purchaseService: PurchasesService,
    private messageService: MessageService,
    private msalService: MsalService,
    private searchService: SearchService,
    private conversationService: ConversationsService
  ) {
    this.mapsApiKey = configuration.googleMapsApiKey;
    this.route.params.subscribe(() => this.ngOnInit()); // reset and set based on new parameter this time
  }
 
  ngOnInit(): void {
    const { params } = this.route.snapshot;
    this.listingId = params.id;
    this.userId = this.msalService.getAccount()?.accountIdentifier;

    if (this.msalService.getAccount()) {
      this.loggedIn = true;
    }

    // Get meta-data for currently signed in user
    this.store.dispatch(loadUser());
    this.user$ = this.store.select(getUser);

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

          // If the user viewing this page is the seller of the listing, then they should not be allowed to add questions.
          this.user$.subscribe((x) => {
            // If the listing is the current user
            if (x.sellers.map((t) => t.id).indexOf(this.listingSellerSummary.id) === -1)
              this.userCanQuestion = true;
            else
              this.isSeller = true;
          });

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

    // Load Q&A Section
    // (1) Retrieve the conversation
    this.conversationService
      .loadListingConversation(this.listingId)
      .subscribe((conversation) => {
        const conversationId = conversation.id;

        // (2) Retrieve the messages for the conversation
        this.conversationService
          .loadConversationMessages(conversationId, 0, 99)
          .subscribe((messages) => {
            // (3) Store these messages (which are questions) for display in the UI
            this.questions = messages;
          });
      });
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

  // Q&A - Ask a question that is to be answered by the supplier
  submitQuestion() {
    const question: ICreateListingQuestion = {
      parentId: null,
      content: this.newQuestion,
      listingId: this.listingId,
    };
    this.conversationService
      .addListingQuestion(question)
      .subscribe((message) => {
        this.newQuestion = '';
        this.questions.push(message);
      });
  }

  // When we touch a question, assign it's id in the event that we answer it
  openAnswerDialog(id: string) {
    this.questionAnswerId = id;
  }

  // Q&A - Reply to a question as the supplier
  submitAnswer() {
    const answer: ICreateListingAnswer = {
      parentId: this.questionAnswerId,
      content: this.questionAnswer,
      listingId: this.listingId,
    };

    // POST answer to the server
    this.conversationService
      .addListingAnswer(this.listingSellerSummary.id, answer)
      .subscribe((answer) => {
        this.newQuestion = '';

        this.questions
          .find((x) => x.id === this.questionAnswerId)
          .children.push(answer);
      });

    this.answerDialogue.hide(); // Hide the answer dialogue
    this.questionAnswer = ''; // Clear the answer text
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
