import { Component, OnInit } from '@angular/core';
import { IPaymentDetails, IPurchase } from '@bushtrade/website/shared/entites';
import { Observable } from 'rxjs';
import { loadPaymentDetails } from '../../+state/purchases/purchases.actions';
import { PurchasesFacade } from '../../+state/purchases/purchases.facade';

@Component({
  selector: 'bushtrade.web-purchases-index',
  templateUrl: './purchases-index.component.html',
  styleUrls: ['./purchases-index.component.scss'],
})
export class PurchasesIndexComponent implements OnInit {
  loaded$: Observable<boolean>;
  paymentDetailsLoaded$: Observable<boolean>;
  purchases$: Observable<IPurchase[]>;
  paymentDetails$: Observable<IPaymentDetails>;

  showPurchaseDetailDialog: boolean = false;

  constructor(private purchasesFacade: PurchasesFacade) {}

  ngOnInit(): void {
    this.loaded$ = this.purchasesFacade.loaded$;
    this.paymentDetailsLoaded$ = this.purchasesFacade.paymentDetailsLoaded$;
    this.purchases$ = this.purchasesFacade.allPurchases$;
    this.paymentDetails$ = this.purchasesFacade.paymentDetails$;
  }

  initiatePayment(id: string) {
    this.purchasesFacade.dispatch(loadPaymentDetails({ id }));
    this.showPurchaseDetailDialog = true;
  }
}
