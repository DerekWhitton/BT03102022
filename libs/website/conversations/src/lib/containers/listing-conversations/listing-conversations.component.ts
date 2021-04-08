import { MessageService } from 'primeng/api';
import {
  IBuyerReviewRequest,
  IListingDetails,
  IListingReviews,
  IPurchaseConversation,
} from '@bushtrade/website/shared/entites';
import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import {
  ConversationsService,
  ListingsService,
  PurchasesService,
  ReviewsService,
} from '@bushtrade/website/shared/services';
import { Store } from '@ngrx/store';
import { getUserSellers } from '@bushtrade/website/shared/state';
import { FormControl, FormGroup, Validators } from '@angular/forms';

@Component({
  selector: 'bushtrade-web-listing-conversations',
  templateUrl: './listing-conversations.component.html',
  styleUrls: ['./listing-conversations.component.scss'],
})
export class ListingConversationsComponent implements OnInit {
  listingId: string;
  sellerId: string;
  listingDetails: IListingDetails;
  purchaseConversations: IPurchaseConversation[];
  selectedConversation: IPurchaseConversation;
  showConfirmationModal: boolean;
  loading = false;

  // Reviews
  listingReviews: IListingReviews;
  showReviewModal = false;
  reviewFormGroup: FormGroup = new FormGroup({
    rating: new FormControl('', [
      Validators.required,
      Validators.min(0),
      Validators.max(5),
    ]),
    comment: new FormControl('', [
      Validators.required,
      Validators.maxLength(2500),
    ]),
  });

  constructor(
    private route: ActivatedRoute,
    private store: Store,
    private messageService: MessageService,
    private conversationsService: ConversationsService,
    private listingsService: ListingsService,
    private purchasesService: PurchasesService,
    private reviewsService: ReviewsService
  ) {}

  ngOnInit(): void {
    this.listingId = this.route.snapshot.params?.listingId;

    this.store.select(getUserSellers).subscribe((sellers: any) => {
      if (sellers.length > 0) {
        this.loading = true;
        this.sellerId = sellers[0].id;
        this.listingsService
          .loadListingDetails(this.listingId)
          .subscribe((listing) => {
            this.listingDetails = listing;
          });
        this.conversationsService
          .loadListingConversations(this.listingId, this.sellerId)
          .subscribe(
            (purchaseConversations) => {
              this.purchaseConversations = purchaseConversations;
              this.loading = false;
            },
            () => {
              this.loading = false;
              this.messageService.add({
                severity: 'error',
                detail: 'Error loading conversations',
              });
            }
          );
      }
    });
  }

  showWinnerConfirmation(purchaseId: string) {
    [this.selectedConversation] = this.purchaseConversations.filter(
      (p) => p.purchaseId == purchaseId
    );
    this.showConfirmationModal = true;
  }

  confirmChosenWinner() {
    this.purchasesService
      .markPurchaseAsCompleted(
        this.sellerId,
        this.selectedConversation.purchaseId
      )
      .subscribe(
        (purchase) => {
          this.listingDetails.isSold = true;
          this.purchaseConversations.filter(
            (p) => p.purchaseId == this.selectedConversation.purchaseId
          )[0].isWinner = true;
          this.showConfirmationModal = false;
          this.messageService.add({
            severity: 'success',
            detail: 'Buyer selected successfully',
          });
        },
        () => {
          this.messageService.add({
            severity: 'error',
            detail: 'There was an error saving your choice. Please try again',
          });
        }
      );
  }

  reviewBuyer(conversation: any) {
    this.selectedConversation = conversation;
    this.reviewsService.getListingReviews(this.listingDetails.id).subscribe(
      (result) => {
        this.listingReviews = result;
        this.showReviewModal = true;
      },
      () => {}
    );
  }

  hideReviewModal() {
    this.showReviewModal = false;
    this.reviewFormGroup.reset();
  }

  saveReview() {
    const reviewRequest = this.reviewFormGroup.value as IBuyerReviewRequest;
    reviewRequest.listingId = this.listingDetails.id;
    reviewRequest.buyerId = this.selectedConversation.buyerId;

    this.reviewsService.reviewBuyer(this.sellerId, reviewRequest).subscribe(
      (result) => {
        this.showReviewModal = false;
        this.reviewFormGroup.reset();
        this.messageService.add({
          severity: 'success',
          detail: 'Review saved.',
        });
      },
      (error) => {
        this.messageService.add({
          severity: 'error',
          detail: 'Server error. Please try again',
        });
        this.showReviewModal = false;
      }
    );
  }
}
