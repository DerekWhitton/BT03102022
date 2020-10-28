import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule, Route } from '@angular/router';
import { UsersIndexComponent } from './containers/users-index/users-index.component';

export const administrationPortalUsersRoutes: Route[] = [];

@NgModule({
  imports: [
    CommonModule,
    RouterModule.forChild([
      { path: '', pathMatch: 'full', component: UsersIndexComponent },
    ]),
  ],
  declarations: [UsersIndexComponent],
  entryComponents: [UsersIndexComponent],
})
export class AdministrationPortalUsersModule {}
