import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule, Route } from '@angular/router';
import { BankingIndexComponent } from './containers/banking-index/banking-index.component';

export const sellerPortalBankingRoutes: Route[] = [];

@NgModule({
  imports: [
    CommonModule,
    RouterModule.forChild([
      { path: '', pathMatch: 'full', component: BankingIndexComponent },
    ]),
  ],
  declarations: [BankingIndexComponent],
  entryComponents: [BankingIndexComponent],
})
export class SellerPortalBankingModule {}
