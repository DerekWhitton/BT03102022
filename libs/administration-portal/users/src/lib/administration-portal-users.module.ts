import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule, Route } from '@angular/router';
import { UsersIndexComponent } from './containers/users/users-index/users-index.component';
import { UiModule } from '@bushtrade/ui';
import { StoreModule } from '@ngrx/store';
import { EffectsModule } from '@ngrx/effects';
import * as fromUsers from './+state/users/users.reducer';
import { UsersEffects } from './+state/users/users.effects';
import { UsersFacade } from './+state/users/users.facade';
import { RolesIndexComponent } from './containers/roles/roles-index/roles-index.component';
import * as fromRoles from './+state/roles/roles.reducer';
import { RolesEffects } from './+state/roles/roles.effects';
import { RolesFacade } from './+state/roles/roles.facade';

export const administrationPortalUsersRoutes: Route[] = [];

@NgModule({
  imports: [
    CommonModule,
    UiModule,
    RouterModule.forChild([
      { path: '', pathMatch: 'full', component: UsersIndexComponent },
      { path: 'roles', component: RolesIndexComponent },
    ]),
    StoreModule.forFeature(fromUsers.USERS_FEATURE_KEY, fromUsers.reducer),
    EffectsModule.forFeature([UsersEffects]),
    StoreModule.forFeature(fromRoles.ROLES_FEATURE_KEY, fromRoles.reducer),
    EffectsModule.forFeature([RolesEffects]),
  ],
  declarations: [UsersIndexComponent, RolesIndexComponent],
  entryComponents: [UsersIndexComponent],
  providers: [UsersFacade, RolesFacade],
})
export class AdministrationPortalUsersModule {}
