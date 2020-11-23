import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule } from '@angular/router';
import { MarketplaceIndexComponent } from './marketplace-index/marketplace-index.component';

@NgModule({
  imports: [
    CommonModule,

    RouterModule.forChild([
      { path: '', pathMatch: 'full', component: MarketplaceIndexComponent },
    ]),
  ],
  declarations: [MarketplaceIndexComponent],
})
export class WebsiteMarketplaceModule {}
