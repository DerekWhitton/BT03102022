import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule } from '@angular/router';
import { AccountIndexComponent } from './containers/account-index/account-index.component';

@NgModule({
  imports: [
    CommonModule,
    RouterModule.forChild([
      { path: '', pathMatch: 'full', component: AccountIndexComponent },
    ]),
  ],
  declarations: [AccountIndexComponent],
  entryComponents: [AccountIndexComponent],
})
export class SellerPortalAccountModule {}
