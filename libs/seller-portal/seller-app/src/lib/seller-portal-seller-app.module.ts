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
    ]),
  ],
  declarations: [AppComponent],
  entryComponents: [AppComponent],
  exports: [AppComponent],
})
export class SellerPortalSellerAppModule {}
