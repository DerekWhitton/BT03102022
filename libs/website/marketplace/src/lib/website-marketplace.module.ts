import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule } from '@angular/router';
import { MarketplaceIndexComponent } from './containers/marketplace-index/marketplace-index.component';
import { ListingDetailsComponent } from './containers/listing-details/listing-details.component';
import { UiModule } from '@bushtrade/ui';
import { UiElementsModule } from '@bushtrade/ui-elements';
@NgModule({
  imports: [
    CommonModule,
    UiModule,
    UiElementsModule,
    RouterModule.forChild([
      { path: '', pathMatch: 'full', component: MarketplaceIndexComponent },
      { path: ':id', component: ListingDetailsComponent },
    ]),
  ],
  declarations: [MarketplaceIndexComponent, ListingDetailsComponent],
})
export class WebsiteMarketplaceModule {}
