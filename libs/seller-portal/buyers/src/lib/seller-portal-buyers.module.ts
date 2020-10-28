import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule } from '@angular/router';
import { BuyersIndexComponent } from './containers/buyers-index/buyers-index.component';

@NgModule({
  imports: [
    CommonModule,

    RouterModule.forChild([
      { path: '', pathMatch: 'full', component: BuyersIndexComponent },
    ]),
  ],
  declarations: [BuyersIndexComponent],
  entryComponents: [BuyersIndexComponent],
})
export class SellerPortalBuyersModule {}
