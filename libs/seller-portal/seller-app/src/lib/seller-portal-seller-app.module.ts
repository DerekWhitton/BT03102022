import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule } from '@angular/router';
import { UiModule } from '@bushtrade/ui';
import { AppComponent } from './app/app.component';

@NgModule({
  imports: [
    CommonModule,
    UiModule,
    RouterModule.forRoot([
      { path: '', pathMatch: 'full', redirectTo: 'dashboard' },
      {
        path: 'dashboard',
        loadChildren: () =>
          import('@bushtrade/seller-portal/dashboard').then(
            (module) => module.SellerPortalDashboardModule
          ),
      },
      {
        path: 'account',
        loadChildren: () =>
          import('@bushtrade/seller-portal/account').then(
            (module) => module.SellerPortalAccountModule
          ),
      },
      {
        path: 'banking',
        loadChildren: () =>
          import('@bushtrade/seller-portal/banking').then(
            (module) => module.SellerPortalBankingModule
          ),
      },
      {
        path: 'buyers',
        loadChildren: () =>
          import('@bushtrade/seller-portal/buyers').then(
            (module) => module.SellerPortalBuyersModule
          ),
      },
      {
        path: 'listings',
        loadChildren: () =>
          import('@bushtrade/seller-portal/listings').then(
            (module) => module.SellerPortalListingsModule
          ),
      },
      {
        path: 'messages',
        loadChildren: () =>
          import('@bushtrade/seller-portal/messages').then(
            (module) => module.SellerPortalMessagesModule
          ),
      },
      {
        path: 'sales',
        loadChildren: () =>
          import('@bushtrade/seller-portal/sales').then(
            (module) => module.SellerPortalSalesModule
          ),
      },
    ]),
  ],
  declarations: [AppComponent],
  entryComponents: [AppComponent],
  exports: [AppComponent],
})
export class SellerPortalSellerAppModule {}
