import { UiModule } from './../../../../ui/src/lib/ui.module';
import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule, Route } from '@angular/router';
import { TransactionsIndexComponent } from './containers/transactions-index/transactions-index.component';
import { UiElementsModule } from '@bushtrade/ui-elements';

export const administrationPortalTransactionsRoutes: Route[] = [];

@NgModule({
  imports: [
    CommonModule,
    UiModule,
    UiElementsModule,
    RouterModule.forChild([
      { path: '', pathMatch: 'full', component: TransactionsIndexComponent },
    ]),
  ],
  declarations: [TransactionsIndexComponent],
  entryComponents: [TransactionsIndexComponent],
})
export class AdministrationPortalTransactionsModule {}
