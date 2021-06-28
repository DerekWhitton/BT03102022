import { Injectable } from '@angular/core';
import { createEffect, Actions, ofType } from '@ngrx/effects';
import { fetch } from '@nrwl/angular';
import { SupportService } from '@bushtrade/website/shared/services';
import { map, withLatestFrom } from 'rxjs/operators';
import * as SupportTicketsActions from './support-tickets.actions';
import { Store } from '@ngrx/store';

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
        run: (action) => {
          return this.supportService.addSupportTicket(action.supportTicket).pipe(
            map((supportTicketDetails) =>
              SupportTicketsActions.createSupportTicketSuccess({
                supportTicketDetails
              })
            ));
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
        run: (action) => {
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
