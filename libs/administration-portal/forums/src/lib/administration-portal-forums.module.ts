import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule, Route } from '@angular/router';
import { ForumIndexComponent } from './containers/forum-index/forum-index.component';

export const administrationPortalForumsRoutes: Route[] = [];

@NgModule({
  imports: [
    CommonModule,
    RouterModule.forChild([
      { path: '', pathMatch: 'full', component: ForumIndexComponent },
    ]),
  ],
  declarations: [ForumIndexComponent],
  entryComponents: [ForumIndexComponent],
})
export class AdministrationPortalForumsModule {}
