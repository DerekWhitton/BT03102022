import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule, Route } from '@angular/router';
import { SuccessComponent } from './containers/success/success.component';
import { CancelledComponent } from './containers/cancelled/cancelled.component';

@NgModule({
  imports: [
    CommonModule,
    RouterModule.forChild([
      {
        path: 'success/:purchaseId',
        component: SuccessComponent,
      },
      {
        path: 'cancelled/:purchaseId',
        component: CancelledComponent,
      },
    ]),
  ],
  declarations: [SuccessComponent, CancelledComponent],
})
export class WebsitePaymentsModule {}
