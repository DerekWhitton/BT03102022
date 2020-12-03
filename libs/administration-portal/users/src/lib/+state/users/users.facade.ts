import { Injectable } from '@angular/core';

import { select, Store, Action } from '@ngrx/store';

import * as fromUsers from './users.reducer';
import * as UsersSelectors from './users.selectors';

@Injectable()
export class UsersFacade {
  loaded$ = this.store.pipe(select(UsersSelectors.getUsersLoaded));
  allUsers$ = this.store.pipe(select(UsersSelectors.getAllUsers));
  selectedUsers$ = this.store.pipe(select(UsersSelectors.getSelected));

  constructor(private store: Store<fromUsers.UsersPartialState>) {}

  dispatch(action: Action) {
    this.store.dispatch(action);
  }
}
