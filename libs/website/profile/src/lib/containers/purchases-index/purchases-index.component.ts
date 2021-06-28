import {
  loadPurchases,
  markReceivedGoods,
  setPurchaseDisputeId,
  setPurchaseReviewed,
} from './../../+state/purchases/purchases.actions';
import { Component, OnInit, ViewChild } from '@angular/core';
import {
  ICreateSupportTicket,
  IListingReviews,
  IPaymentDetails,
  IPurchase,
  ISellerReviewRequest,
  ListingType,
  SupportTicketCategory,
} from '@bushtrade/website/shared/entites';
import { Observable } from 'rxjs';
import {
  cancelPurchase,
  loadPaymentDetails,
} from '../../+state/purchases/purchases.actions';
import { PurchasesFacade } from '../../+state/purchases/purchases.facade';
import { Table } from 'primeng/table';
import { MessageService } from 'primeng/api';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import {
  ReviewsService,
  SupportService,
} from '@bushtrade/website/shared/services';

@Component({
  selector: 'bushtrade.web-purchases-index',
  templateUrl: './purchases-index.component.html',
  styleUrls: ['./purchases-index.component.scss'],
})
export class PurchasesIndexComponent implements OnInit {
  listingType = ListingType;
  loaded$: Observable<boolean>;
  lastPurchaseError$ = this.purchasesFacade.lastKnownError$;
  paymentDetailsLoaded$: Observable<boolean>;
  purchases$: Observable<IPurchase[]>;
  paymentDetails$: Observable<IPaymentDetails>;
  purchasetypes: any[];
  selectedPurchase: IPurchase;

  @ViewChild('dt') table: Table;
  showCreateSupportTicketModal: boolean;
  showPurchaseDetailDialog: boolean = false;

  addSupportTicketFormGroup: FormGroup = new FormGroup({
    title: new FormControl('', Validators.required),
    message: new FormControl('', [
      Validators.required,
      Validators.maxLength(2500),
    ]),
    category: new FormControl(
      SupportTicketCategory.Dispute,
      Validators.required
    ),
  });

  // Reviews
  listingReviews: IListingReviews;
  selectedListing: any;
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
    private purchasesFacade: PurchasesFacade,
    private supportService: SupportService,
    private messageService: MessageService,
    private reviewsService: ReviewsService
  ) {}

  ngOnInit(): void {
    this.loaded$ = this.purchasesFacade.loaded$;
    this.paymentDetailsLoaded$ = this.purchasesFacade.paymentDetailsLoaded$;
    this.purchases$ = this.purchasesFacade.allPurchases$;
    this.paymentDetails$ = this.purchasesFacade.paymentDetails$;
    this.purchasesFacade.dispatch(loadPurchases());

    this.purchasetypes = [
      { label: 'Listing', value: 1 },
      { label: 'Auction', value: 0 },
    ];

    this.lastPurchaseError$.subscribe((error) => {
      if (error) {
        this.messageService.add({
          severity: 'error',
          detail:
            typeof error?.error == 'string'
              ? error?.error
              : error?.error?.title,
        });
      } else {
        this.messageService.add({
          severity: 'error',
          detail: 'Server error. Please try again',
        });
      }
    });
  }

  initiatePayment(id: string) {
    this.purchasesFacade.dispatch(loadPaymentDetails({ id }));
    this.showPurchaseDetailDialog = true;
  }

  markReceivedGoods(id: string) {
    this.purchasesFacade.dispatch(markReceivedGoods({ id }));
  }

  cancelPurchase(id: string) {
    this.purchasesFacade.dispatch(cancelPurchase({ id }));
  }

  onPurchaseTypeChange(event) {
    console.log(event.value);
    this.table.filter(event.value, 'listing.type', 'equals');
  }

  reviewSeller(purchase: any) {
    this.selectedListing = purchase.listing;
    this.selectedPurchase = purchase;
    this.reviewsService.getListingReviews(this.selectedListing.id).subscribe(
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
    var reviewRequest = this.reviewFormGroup.value as ISellerReviewRequest;
    reviewRequest.listingId = this.selectedListing.id;

    this.reviewsService.reviewSeller(reviewRequest).subscribe(
      (result) => {
        this.purchasesFacade.dispatch(
          setPurchaseReviewed({ purchaseId: this.selectedPurchase.id })
        );
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

  showCreateDispute(purchase: IPurchase) {
    this.selectedPurchase = purchase;
    this.showCreateSupportTicketModal = true;
  }

  hideCreateSupportTicketModal() {
    this.showCreateSupportTicketModal = false;
    this.addSupportTicketFormGroup.reset();
  }

  saveSupportTicket() {
    var disputeTicket = this.addSupportTicketFormGroup
      .value as ICreateSupportTicket;
    disputeTicket.purchaseId = this.selectedPurchase.id;
    disputeTicket.listingId = this.selectedPurchase.listingId;
    this.supportService.addSupportTicket(disputeTicket).subscribe(
      (result) => {
        this.purchasesFacade.dispatch(
          setPurchaseDisputeId({
            purchaseId: this.selectedPurchase.id,
            disputeId: result.id,
          })
        );
        this.showCreateSupportTicketModal = false;
        this.messageService.add({
          severity: 'success',
          detail: 'Dispute created successfully',
        });
      },
      (error) => {
        this.messageService.add({
          severity: 'error',
          detail: 'Server error. Please try again',
        });
      }
    );
  }
}
