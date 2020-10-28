import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule } from '@angular/router';
import { AppComponent } from './app/app.component';
import { UiModule } from '@bushtrade/ui';
@NgModule({
  imports: [
    CommonModule,
    UiModule,
    RouterModule.forRoot([
      { path: '', pathMatch: 'full', component: AppComponent },
      {
        path: 'users',
        loadChildren: () =>
          import('@bushtrade/administration-portal/users').then(
            (module) => module.AdministrationPortalUsersModule
          ),
      },
      {
        path: 'advertisments',
        loadChildren: () =>
          import('@bushtrade/administration-portal/advertisments').then(
            (module) => module.AdministrationPortalAdvertismentsModule
          ),
      },
      {
        path: 'articles',
        loadChildren: () =>
          import('@bushtrade/administration-portal/articles').then(
            (module) => module.AdministrationPortalArticlesModule
          ),
      },
      {
        path: 'escrow',
        loadChildren: () =>
          import('@bushtrade/administration-portal/escrow').then(
            (module) => module.AdministrationPortalEscrowModule
          ),
      },
      {
        path: 'forums',
        loadChildren: () =>
          import('@bushtrade/administration-portal/forums').then(
            (module) => module.AdministrationPortalForumsModule
          ),
      },
      {
        path: 'listings',
        loadChildren: () =>
          import('@bushtrade/administration-portal/listings').then(
            (module) => module.AdministrationPortalListingsModule
          ),
      },
      {
        path: 'messages',
        loadChildren: () =>
          import('@bushtrade/administration-portal/messages').then(
            (module) => module.AdministrationPortalMessagesModule
          ),
      },
      {
        path: 'reports',
        loadChildren: () =>
          import('@bushtrade/administration-portal/reports').then(
            (module) => module.AdministrationPortalReportsModule
          ),
      },
      {
        path: 'support',
        loadChildren: () =>
          import('@bushtrade/administration-portal/support').then(
            (module) => module.AdministrationPortalSupportModule
          ),
      },
    ]),
  ],
  declarations: [AppComponent],
  entryComponents: [AppComponent],
  exports: [AppComponent],
})
export class AdministrationPortalAdministrationAppModule {}
