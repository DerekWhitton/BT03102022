import { loadPurchases } from './../../+state/purchases/purchases.actions';
import { Component, OnInit, ViewChild } from '@angular/core';
import { IPaymentDetails, IPurchase, ListingType } from '@bushtrade/website/shared/entites';
import { Observable } from 'rxjs';
import { cancelPurchase, loadPaymentDetails } from '../../+state/purchases/purchases.actions';
import { PurchasesFacade } from '../../+state/purchases/purchases.facade';
import { Table } from 'primeng/table';

@Component({
  selector: 'bushtrade.web-purchases-index',
  templateUrl: './purchases-index.component.html',
  styleUrls: ['./purchases-index.component.scss'],
})
export class PurchasesIndexComponent implements OnInit {
  listingType = ListingType;
  loaded$: Observable<boolean>;
  paymentDetailsLoaded$: Observable<boolean>;
  purchases$: Observable<IPurchase[]>;
  paymentDetails$: Observable<IPaymentDetails>;
  purchasetypes: any[];

  @ViewChild('dt') table: Table;

  showPurchaseDetailDialog: boolean = false;

  constructor(private purchasesFacade: PurchasesFacade) {}

  ngOnInit(): void {
    this.loaded$ = this.purchasesFacade.loaded$;
    this.paymentDetailsLoaded$ = this.purchasesFacade.paymentDetailsLoaded$;
    this.purchases$ = this.purchasesFacade.allPurchases$;
    this.paymentDetails$ = this.purchasesFacade.paymentDetails$;
    this.purchasesFacade.dispatch(loadPurchases());

    this.purchasetypes = [
      {label:"Listing", value:1},
      {label:"Auction", value:0},
  ];

  }

  initiatePayment(id: string) {
    this.purchasesFacade.dispatch(loadPaymentDetails({ id }));
    this.showPurchaseDetailDialog = true;
  }

  cancelPurchase(id: string) {
    this.purchasesFacade.dispatch(cancelPurchase({ id }));
  }

  onPurchaseTypeChange(event) {
    console.log(event.value);
    this.table.filter(event.value, 'listing.type', 'equals')
}
}
