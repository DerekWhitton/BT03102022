import { Injectable } from '@angular/core';

import { select, Store, Action } from '@ngrx/store';

import * as fromDashboardAdvertisments from './dashboard-advertisments.reducer';
import * as DashboardAdvertismentsSelectors from './dashboard-advertisments.selectors';

@Injectable()
export class DashboardAdvertismentsFacade {
  loaded$ = this.store.pipe(
    select(DashboardAdvertismentsSelectors.getDashboardAdvertismentsLoaded)
  );
  allDashboardAdvertisments$ = this.store.pipe(
    select(DashboardAdvertismentsSelectors.getAllDashboardAdvertisments)
  );
  selectedDashboardAdvertisments$ = this.store.pipe(
    select(DashboardAdvertismentsSelectors.getSelected)
  );

  constructor(
    private store: Store<
      fromDashboardAdvertisments.DashboardAdvertismentsPartialState
    >
  ) {}

  dispatch(action: Action) {
    this.store.dispatch(action);
  }
}
