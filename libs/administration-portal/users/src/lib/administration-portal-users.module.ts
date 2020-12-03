import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule, Route } from '@angular/router';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { UiModule } from '@bushtrade/ui';
import { UiElementsModule } from '@bushtrade/ui-elements';
import { UsersIndexComponent } from './containers/users/users-index/users-index.component';

import { StoreModule } from '@ngrx/store';
import { EffectsModule } from '@ngrx/effects';
import * as fromUsers from './+state/users/users.reducer';
import { UsersEffects } from './+state/users/users.effects';
import { UsersFacade } from './+state/users/users.facade';
import { RolesIndexComponent } from './containers/roles/roles-index/roles-index.component';
import * as fromRoles from './+state/roles/roles.reducer';
import { RolesEffects } from './+state/roles/roles.effects';
import { RolesFacade } from './+state/roles/roles.facade';
import { UsersDetailsComponent } from './containers/users/users-details/users-details.component';

export const administrationPortalUsersRoutes: Route[] = [];

@NgModule({
  imports: [
    CommonModule,
    UiModule,
    UiElementsModule,
    FormsModule,
    ReactiveFormsModule,
    RouterModule.forChild([
      { path: '', pathMatch: 'full', component: UsersIndexComponent },
      { path: 'user/:id', component: UsersDetailsComponent },
      { path: 'roles', component: RolesIndexComponent },
    ]),
    StoreModule.forFeature(fromUsers.USERS_FEATURE_KEY, fromUsers.reducer),
    EffectsModule.forFeature([UsersEffects]),
    StoreModule.forFeature(fromRoles.ROLES_FEATURE_KEY, fromRoles.reducer),
    EffectsModule.forFeature([RolesEffects]),
  ],
  declarations: [
    UsersIndexComponent,
    RolesIndexComponent,
    UsersDetailsComponent,
  ],
  entryComponents: [UsersIndexComponent],
  providers: [UsersFacade, RolesFacade],
})
export class AdministrationPortalUsersModule {}
