import { AdvertismentsService } from '@bushtrade/administration-portal/shared/services';
import { Injectable } from '@angular/core';
import { createEffect, Actions, ofType, OnInitEffects } from '@ngrx/effects';
import { fetch } from '@nrwl/angular';

import * as fromDashboardAdvertisments from './dashboard-advertisments.reducer';
import * as DashboardAdvertismentsActions from './dashboard-advertisments.actions';
import { map, withLatestFrom } from 'rxjs/operators';
import { Action, Store } from '@ngrx/store';

@Injectable()
export class DashboardAdvertismentsEffects implements OnInitEffects {
  loadDashboardAdvertisments$ = createEffect(() =>
    this.actions$.pipe(
      ofType(DashboardAdvertismentsActions.loadDashboardAdvertisments),
      fetch({
        run: (action) => {
          return this.advertismentsService
            .listDashboardAdvertisments()
            .pipe(
              map((response) =>
                DashboardAdvertismentsActions.loadDashboardAdvertismentsSuccess({ payload: response })
              )
            );
        },

        onError: (action, error) => {
          console.error('Error', error);
          return DashboardAdvertismentsActions.loadDashboardAdvertismentsFailure({ error });
        },
      })
    )
  );

  createDashboardAdvertisment$ = createEffect(() =>
    this.actions$.pipe(
      ofType(DashboardAdvertismentsActions.createDashboardAdvertisment),
      fetch({
        run: (action) => {
          return this.advertismentsService
            .createDashboardAdvertisment(action.dashboardAdvertisment)
            .pipe(
              map((response) =>
                DashboardAdvertismentsActions.createDashboardAdvertismentSuccess({ dashboardAdvertisment: response })
              )
            );
        },
        onError: (action, error) => {
          console.error('Error', error);
          return DashboardAdvertismentsActions.createDashboardAdvertismentFailure({ error });
        },
      })
    )
  );

  loadDashboardAdvertismentDetails$ = createEffect(() =>
    this.actions$.pipe(
      ofType(DashboardAdvertismentsActions.loadDashboardAdvertismentDetails),
      fetch({
        run: (action, state: any) => {
          return this.advertismentsService
            .loadDashboardAdvertismentDetails(action.dashboardAdvertismentId)
            .pipe(
              map((response) =>
                DashboardAdvertismentsActions.loadDashboardAdvertismentDetailsSuccess({ dashboardAdvertisment: response })
              )
            );
        },

        onError: (action, error) => {
          console.error('Error', error);
          return DashboardAdvertismentsActions.loadDashboardAdvertismentDetailsFailure({ error });
        },
      })
    )
  );

  updateDashboardAdvertismentDetails$ = createEffect(() =>
    this.actions$.pipe(
      ofType(DashboardAdvertismentsActions.updateDashboardAdvertisment),
      withLatestFrom(this.store),
      fetch({
        run: (action, state: any) => {
          const { dashboardAdvertisments } = state;
          return this.advertismentsService
            .updateDashboardAdvertisment({ 
              ...action.dashboardAdvertisment,
              id: dashboardAdvertisments.selectedId
            })
            .pipe(
              map((response) =>
                DashboardAdvertismentsActions.updateDashboardAdvertismentSuccess({ dashboardAdvertisment: response })
              )
            );
        },

        onError: (action, error) => {
          console.error('Error', error);
          return DashboardAdvertismentsActions.updateDashboardAdvertismentFailure({ error });
        },
      })
    )
  );

  deleteDashboardAdvertisment$ = createEffect(() =>
    this.actions$.pipe(
      ofType(DashboardAdvertismentsActions.deleteDashboardAdvertisment),
      withLatestFrom(this.store),
      fetch({
        run: (action, state: any) => {
          return this.advertismentsService
            .deleteDashboardAdvertisment(action.dashboardAdvertismentId)
            .pipe(
              map(() =>
                DashboardAdvertismentsActions.deleteDashboardAdvertismentSuccess({ dashboardAdvertismentId: action.dashboardAdvertismentId })
              )
            );
        },

        onError: (action, error) => {
          console.error('Error', error);
          return DashboardAdvertismentsActions.deleteDashboardAdvertismentFailure({ error });
        },
      })
    )
  );

  constructor(
    private actions$: Actions,
    private store: Store,
    private advertismentsService: AdvertismentsService
  ) {}

  ngrxOnInitEffects(): Action {
    return DashboardAdvertismentsActions.loadDashboardAdvertisments();
  }
}
