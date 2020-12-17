import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule, Route } from '@angular/router';
import { WebsiteIndexComponent } from './website-index/website-index.component';
import { UiModule } from '@bushtrade/ui';
@NgModule({
  imports: [
    CommonModule,
    UiModule,
    RouterModule.forRoot([
      { path: '', pathMatch: 'full', redirectTo: 'home' },
      {
        path: 'home',
        loadChildren: () =>
          import('@bushtrade/website/home').then(
            (module) => module.WebsiteHomeModule
          ),
      },
      {
        path: 'buy-sell',
        loadChildren: () =>
          import('@bushtrade/website/buy-sell').then(
            (module) => module.WebsiteBuySellModule
          ),
      },
      {
        path: 'marketplace',
        loadChildren: () =>
          import('@bushtrade/website/marketplace').then(
            (module) => module.WebsiteMarketplaceModule
          ),
      },
      {
        path: 'auctions',
        loadChildren: () =>
          import('@bushtrade/website/auctions').then(
            (module) => module.WebsiteAuctionsModule
          ),
      },
      {
        path: 'forums',
        loadChildren: () =>
          import('@bushtrade/website/forums').then(
            (module) => module.WebsiteForumsModule
          ),
      },
      {
        path: 'trophy-cabinet',
        loadChildren: () =>
          import('@bushtrade/website/trophy-cabinet').then(
            (module) => module.WebsiteTrophyCabinetModule
          ),
      },
      {
        path: 'support',
        loadChildren: () =>
          import('@bushtrade/website/support').then(
            (module) => module.WebsiteSupportModule
          ),
      },
      {
        path: 'favourites',
        loadChildren: () =>
          import('@bushtrade/website/favourites').then(
            (module) => module.WebsiteFavouritesModule
          ),
      },
      {
        path: 'search',
        loadChildren: () =>
          import('@bushtrade/website/search').then(
            (module) => module.WebsiteSearchModule
          ),
      },
      {
        path: 'profile',
        loadChildren: () =>
          import('@bushtrade/website/profile').then(
            (module) => module.WebsiteProfileModule
          ),
      },

    ]),
  ],
  declarations: [WebsiteIndexComponent],
  entryComponents: [WebsiteIndexComponent],
  exports: [WebsiteIndexComponent],
})
export class WebsiteWebsiteAppModule {}
