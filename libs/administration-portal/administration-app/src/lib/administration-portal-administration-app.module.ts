import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule } from '@angular/router';
import { AppComponent } from './app/app.component';
import { UiModule } from '@bushtrade/ui';
import { MsalGuard } from '@azure/msal-angular';
import { HttpClientModule } from '@angular/common/http';

@NgModule({
  imports: [
    CommonModule,
    HttpClientModule,
    UiModule,
    RouterModule.forRoot([
      {
        path: '',
        pathMatch: 'full',
        redirectTo: 'dashboard',
        canActivate: [MsalGuard],
      },
      {
        path: 'dashboard',
        loadChildren: () =>
          import('@bushtrade/adminsitration-portal/dashboard').then(
            (module) => module.AdministrationPortalDashboardModule
          ),
        canActivate: [MsalGuard],
      },
      {
        path: 'users',
        loadChildren: () =>
          import('@bushtrade/administration-portal/users').then(
            (module) => module.AdministrationPortalUsersModule
          ),
        canActivate: [MsalGuard],
      },
      {
        path: 'advertisments',
        loadChildren: () =>
          import('@bushtrade/administration-portal/advertisments').then(
            (module) => module.AdministrationPortalAdvertismentsModule
          ),
        canActivate: [MsalGuard],
      },
      {
        path: 'articles',
        loadChildren: () =>
          import('@bushtrade/administration-portal/articles').then(
            (module) => module.AdministrationPortalArticlesModule
          ),
        canActivate: [MsalGuard],
      },
      {
        path: 'escrow',
        loadChildren: () =>
          import('@bushtrade/administration-portal/escrow').then(
            (module) => module.AdministrationPortalEscrowModule
          ),
        canActivate: [MsalGuard],
      },
      {
        path: 'forums',
        loadChildren: () =>
          import('@bushtrade/administration-portal/forums').then(
            (module) => module.AdministrationPortalForumsModule
          ),
        canActivate: [MsalGuard],
      },
      {
        path: 'listings',
        loadChildren: () =>
          import('@bushtrade/administration-portal/listings').then(
            (module) => module.AdministrationPortalListingsModule
          ),
        canActivate: [MsalGuard],
      },
      {
        path: 'messages',
        loadChildren: () =>
          import('@bushtrade/administration-portal/messages').then(
            (module) => module.AdministrationPortalMessagesModule
          ),
        canActivate: [MsalGuard],
      },
      {
        path: 'reports',
        loadChildren: () =>
          import('@bushtrade/administration-portal/reports').then(
            (module) => module.AdministrationPortalReportsModule
          ),
        canActivate: [MsalGuard],
      },
      {
        path: 'support',
        loadChildren: () =>
          import('@bushtrade/administration-portal/support').then(
            (module) => module.AdministrationPortalSupportModule
          ),
        canActivate: [MsalGuard],
      },
      {
        path: 'settings',
        loadChildren: () =>
          import('@bushtrade/administration-portal/settings').then(
            (module) => module.AdministrationPortalSettingsModule
          ),
        canActivate: [MsalGuard],
      },
    ]),
  ],
  declarations: [AppComponent],
  entryComponents: [AppComponent],
  exports: [AppComponent],
})
export class AdministrationPortalAdministrationAppModule {}
