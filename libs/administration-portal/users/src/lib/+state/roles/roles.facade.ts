import { Injectable } from '@angular/core';

import { select, Store, Action } from '@ngrx/store';

import * as fromRoles from './roles.reducer';
import * as RolesSelectors from './roles.selectors';

@Injectable()
export class RolesFacade {
  loaded$ = this.store.pipe(select(RolesSelectors.getRolesLoaded));
  allRoles$ = this.store.pipe(select(RolesSelectors.getAllRoles));
  selectedRoles$ = this.store.pipe(select(RolesSelectors.getSelected));

  constructor(private store: Store<fromRoles.RolesPartialState>) {}

  dispatch(action: Action) {
    this.store.dispatch(action);
  }
}
