import { Injectable } from '@angular/core';
import { createEffect, Actions, ofType, OnInitEffects } from '@ngrx/effects';
import { fetch } from '@nrwl/angular';
import { SupportService } from '@bushtrade/website/shared/services';
import { map, withLatestFrom } from 'rxjs/operators';

import * as fromSupportTickets from './support-tickets.reducer';
import * as SupportTicketsActions from './support-tickets.actions';
import { Action, Store } from '@ngrx/store';

@Injectable()
export class SupportTicketsEffects {
  loadSupportTickets$ = createEffect(() =>
    this.actions$.pipe(
      ofType(SupportTicketsActions.loadSupportTickets),
      withLatestFrom(this.store),
      fetch({
        run: (action) => {
          return this.supportService
            .searchUserTickets(
              action.page,
              action.perPage,
              action.query,
              action.category,
              action.includeClosed
            ).pipe(
              map((supportTickets) =>
                SupportTicketsActions.loadSupportTicketsSuccess({
                  supportTickets,
                })
              )
            );
        },
        onError: (action, error) => {
          console.error('Error', error);
          return SupportTicketsActions.loadSupportTicketsFailure({ error });
        },
      })
    )
  );

  createSupportTicket$ = createEffect(() =>
    this.actions$.pipe(
      ofType(SupportTicketsActions.createSupportTicket),
      withLatestFrom(this.store),
      fetch({
        run: (action, state: any) => {
          this.supportService
            .addSupportTicket(action.supportTicket).subscribe();
            // .pipe(
            //   map((supportTicketDetails) => {
            //     return SupportTicketsActions.loadSupportTickets({
            //       page: state.supportTickets.page,
            //       perPage: state.supportTickets.perPage,
            //       query: state.supportTickets.query,
            //       category: state.supportTickets.category,
            //       includeClosed: state.supportTickets.includeClosed
            //     })
            //   })
            // );
        },
        onError: (action, error) => {
          console.error('Error', error);
          return SupportTicketsActions.createSupportTicketFailure({ error });
        },
      })
    )
  );

  loadSupportTicketDetails$ = createEffect(() =>
    this.actions$.pipe(
      ofType(SupportTicketsActions.loadSupportTicketDetails),
      withLatestFrom(this.store),
      fetch({
        run: (action, state: any) => {
          return this.supportService.getSupportTicketDetails(action.ticketId).pipe(
            map((supportTicketDetails) =>
              SupportTicketsActions.loadSupportTicketDetailsSuccess({
                supportTicketDetails
              })
            )
          );
        },
        onError: (action, error) => {
          console.error('Error', error);
          return SupportTicketsActions.loadSupportTicketDetailsFailure({ error });
        }
      })
    ));

  createSupportTicketMessage$ = createEffect(() =>
    this.actions$.pipe(
      ofType(SupportTicketsActions.createSupportTicketMessage),
      withLatestFrom(this.store),
      fetch({
        run: (action, state: any) => {
          var message = {
            message: action.supportTicketMessage,
            supportTicketId: state.supportTickets.selectedId
          };
          return this.supportService.addSupportTicketMessage(message).pipe(
            map((supportTicketMessage) =>
              SupportTicketsActions.createSupportTicketMessageSuccess({
                supportTicketMessage,
              })
            )
          );
        },
        onError: (action, error) => {
          console.error('Error', error);
          return SupportTicketsActions.createSupportTicketMessageFailure({
            error,
          });
        },
      })
    )
  );

  constructor(
    private actions$: Actions,
    private store: Store,
    private supportService: SupportService
  ) {}
}
