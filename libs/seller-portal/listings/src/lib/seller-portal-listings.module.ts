import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule, Route } from '@angular/router';
import { ListingsIndexComponent } from './containers/listings-index/listings-index.component';

export const sellerPortalListingsRoutes: Route[] = [];

@NgModule({
  imports: [CommonModule, RouterModule],
  declarations: [ListingsIndexComponent],
  entryComponents: [ListingsIndexComponent],
})
export class SellerPortalListingsModule {}
