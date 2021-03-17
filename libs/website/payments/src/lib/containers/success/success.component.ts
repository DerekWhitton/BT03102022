import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';

@Component({
  selector: 'bushtrade.web-success',
  templateUrl: './success.component.html',
  styleUrls: ['./success.component.scss'],
})
export class SuccessComponent implements OnInit {
  isListingPayment = false;
  isPremiumPackagePayment = false;
  entityLabel: string;

  constructor(private route: ActivatedRoute) {}

  ngOnInit(): void {
    var params = this.route.snapshot.queryParams;
    if (params.purchaseId) {
      this.isListingPayment = true;
      this.entityLabel = "Listing";
    } else if (params.premiumPackageId) {
      this.isPremiumPackagePayment = true;
      this.entityLabel = "Premium Package";
    }
  }
}
