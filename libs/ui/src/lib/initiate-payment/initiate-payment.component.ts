import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';

@Component({
  selector: 'bushtrade-portal-initiate-payment',
  templateUrl: './initiate-payment.component.html',
  styleUrls: ['./initiate-payment.component.scss'],
})
export class InitiatePaymentComponent implements OnInit {
  @Input() showPurchaseDetailDialog: boolean = false;
  @Input() paymentDetailsLoaded$;
  @Input() paymentDetails$;
  @Input() isDirectPurchase: boolean = false;
  @Output() modalClosed = new EventEmitter<boolean>();

  constructor() {}

  ngOnInit(): void {}

  hideModal() {
    this.modalClosed.emit(true);
  }
}
