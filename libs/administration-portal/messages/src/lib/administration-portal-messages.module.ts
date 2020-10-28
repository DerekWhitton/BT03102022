import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule, Route } from '@angular/router';
import { MessagesIndexComponent } from './containers/messages-index/messages-index.component';

export const administrationPortalMessagesRoutes: Route[] = [];

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
export class AdministrationPortalMessagesModule {}
