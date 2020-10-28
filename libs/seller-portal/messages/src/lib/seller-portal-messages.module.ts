import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule } from '@angular/router';
import { MessagesIndexComponent } from './containers/messages-index/messages-index.component';

@NgModule({
  imports: [
    CommonModule,

    RouterModule.forChild([
      { path: '', pathMatch: 'full', component: MessagesIndexComponent },
    ]),
  ],
  declarations: [MessagesIndexComponent],
  entryComponents: [MessagesIndexComponent],
})
export class SellerPortalMessagesModule {}
