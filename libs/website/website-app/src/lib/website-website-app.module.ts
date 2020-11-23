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
        path: 'buyandsell',
        loadChildren: () =>
          import('@bushtrade/website/buy-sell').then(
            (module) => module.WebsiteBuySellModule
          ),
      },
    ]),
  ],
  declarations: [WebsiteIndexComponent],
  entryComponents: [WebsiteIndexComponent],
  exports: [WebsiteIndexComponent],
})
export class WebsiteWebsiteAppModule {}
