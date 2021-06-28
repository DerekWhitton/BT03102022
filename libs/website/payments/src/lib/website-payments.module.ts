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
        path: 'success',
        component: SuccessComponent,
      },
      {
        path: 'cancelled',
        component: CancelledComponent,
      },
    ]),
  ],
  declarations: [SuccessComponent, CancelledComponent],
})
export class WebsitePaymentsModule {}
