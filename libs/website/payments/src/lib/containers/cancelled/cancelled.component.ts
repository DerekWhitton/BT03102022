import { PurchasesService } from '@bushtrade/website/shared/services';
import { ActivatedRoute } from '@angular/router';
import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'bushtrade.web-cancelled',
  templateUrl: './cancelled.component.html',
  styleUrls: ['./cancelled.component.scss'],
})
export class CancelledComponent implements OnInit {
  paymentCancelled = false;

  constructor(
    private route: ActivatedRoute,
    private purchaseService: PurchasesService
  ) {}

  ngOnInit(): void {
    var params = this.route.snapshot.params;

    if (params.purchaseId) {
      this.purchaseService.cancelPurchase(params.purchaseId)
        .subscribe(
          () => {
            this.paymentCancelled = true;
          },
          () => {
            
          }
        );
    }
  }
}
