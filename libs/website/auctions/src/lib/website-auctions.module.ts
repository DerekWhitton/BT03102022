import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { RouterModule } from '@angular/router';
import { AuctionsIndexComponent } from './auctions-index/auctions-index.component';

@NgModule({
  imports: [
    CommonModule,
    RouterModule.forChild([
      { path: '', pathMatch: 'full', component: AuctionsIndexComponent },
    ]),
  ],
  declarations: [AuctionsIndexComponent],
})
export class WebsiteAuctionsModule {}
