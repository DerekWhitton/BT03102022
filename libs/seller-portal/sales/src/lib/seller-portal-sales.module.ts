import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule, Route } from '@angular/router';
import { SalesIndexComponent } from './containers/sales-index/sales-index.component';

export const sellerPortalSalesRoutes: Route[] = [];

@NgModule({
  imports: [
    CommonModule,
    RouterModule.forChild([
      { path: '', pathMatch: 'full', component: SalesIndexComponent },
    ]),
  ],
  declarations: [SalesIndexComponent],
  entryComponents: [SalesIndexComponent],
})
export class SellerPortalSalesModule {}
