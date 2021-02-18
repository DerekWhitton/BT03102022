import { WebsiteContactUsModule } from './../../../contact-us/src/lib/website-contact-us.module';
import { WebsiteAboutModule } from './../../../about/src/lib/website-about.module';
import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { RouterModule } from '@angular/router';
import { MsalGuard } from '@azure/msal-angular';
import { UiModule } from '@bushtrade/ui';
import { WebsiteIndexComponent } from './website-index/website-index.component';
@NgModule({
  imports: [
    CommonModule,
    UiModule,
    RouterModule.forRoot(
      [
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
          path: 'forums',
          loadChildren: () =>
            import('@bushtrade/website/forums').then(
              (module) => module.WebsiteForumsModule
            ),
        },
        {
          path: 'buying',
          loadChildren: () =>
            import('@bushtrade/website/buying').then(
              (module) => module.WebsiteBuyingModule
            ),
        },
        {
          path: 'selling',
          loadChildren: () =>
            import('@bushtrade/website/selling').then(
              (module) => module.WebsiteSellingModule
            ),
        },
        {
          path: 'about',
          loadChildren: () =>
            import('@bushtrade/website/about').then(
              (module) => module.WebsiteAboutModule
            ),
        },
        {
          path: 'contact-us',
          loadChildren: () =>
            import('@bushtrade/website/contact-us').then(
              (module) => module.WebsiteContactUsModule
            ),
        },
        // {
        //   path: 'trophy-cabinet',
        //   loadChildren: () =>
        //     import('@bushtrade/website/trophy-cabinet').then(
        //       (module) => module.WebsiteTrophyCabinetModule
        //     ),
        // },
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
          path: 'listings',
          loadChildren: () =>
            import('@bushtrade/website/listings').then(
              (module) => module.WebsiteListingsModule
            ),
        },
        {
          path: 'profile',
          loadChildren: () =>
            import('@bushtrade/website/profile').then(
              (module) => module.WebsiteProfileModule
            ),
          canActivate: [MsalGuard],
        },
        {
          path: 'blog',
          loadChildren: () =>
            import('@bushtrade/website/blog').then(
              (module) => module.WebsiteBlogModule
            ),
        },
        {
          path: 'payments',
          loadChildren: () =>
            import('@bushtrade/website/payments').then(
              (module) => module.WebsitePaymentsModule
            ),
        },
      ],
      { scrollPositionRestoration: 'top' }
    ),
  ],
  declarations: [WebsiteIndexComponent],
  entryComponents: [WebsiteIndexComponent],
  exports: [WebsiteIndexComponent],
})
export class WebsiteWebsiteAppModule {}
