import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule, Route } from '@angular/router';
import { UsersIndexComponent } from './containers/users-index/users-index.component';
import { StoreModule } from '@ngrx/store';
import { EffectsModule } from '@ngrx/effects';
import * as fromUsers from './+state/users/users.reducer';
import { UsersEffects } from './+state/users/users.effects';
import { UsersFacade } from './+state/users/users.facade';

export const administrationPortalUsersRoutes: Route[] = [];

@NgModule({
  imports: [
    CommonModule,
    RouterModule.forChild([
      { path: '', pathMatch: 'full', component: UsersIndexComponent },
    ]),
    StoreModule.forFeature(fromUsers.USERS_FEATURE_KEY, fromUsers.reducer),
    EffectsModule.forFeature([UsersEffects]),
  ],
  declarations: [UsersIndexComponent],
  entryComponents: [UsersIndexComponent],
  providers: [UsersFacade],
})
export class AdministrationPortalUsersModule {}
