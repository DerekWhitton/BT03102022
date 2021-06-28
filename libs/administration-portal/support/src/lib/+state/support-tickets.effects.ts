import { Injectable } from '@angular/core';
import { createEffect, Actions, ofType } from '@ngrx/effects';
import { fetch } from '@nrwl/angular';
import { map, withLatestFrom } from 'rxjs/operators';
import * as SupportTicketsActions from './support-tickets.actions';
import { Store } from '@ngrx/store';
import { SupportService } from '@bushtrade/administration-portal/shared/services';

@Injectable()
export class SupportTicketsEffects {
  loadSupportTickets$ = createEffect(() =>
    this.actions$.pipe(
      ofType(SupportTicketsActions.loadSupportTickets),
      fetch({
        run: (action) => {
          return this.supportService
            .searchUserTickets(
              action.page,
              action.perPage,
              action.query,
              action.category,
              action.includeClosed
            )
            .pipe(
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

  loadSupportTicketDetails$ = createEffect(() =>
    this.actions$.pipe(
      ofType(SupportTicketsActions.loadSupportTicketDetails),
      withLatestFrom(this.store),
      fetch({
        run: (action) => {
          return this.supportService
            .getSupportTicketDetails(action.ticketId)
            .pipe(
              map((supportTicketDetails) =>
                SupportTicketsActions.loadSupportTicketDetailsSuccess({
                  supportTicketDetails,
                })
              )
            );
        },
        onError: (action, error) => {
          console.error('Error', error);
          return SupportTicketsActions.loadSupportTicketDetailsFailure({
            error,
          });
        },
      })
    )
  );

  createSupportTicketMessage$ = createEffect(() =>
    this.actions$.pipe(
      ofType(SupportTicketsActions.createSupportTicketMessage),
      withLatestFrom(this.store),
      fetch({
        run: (action, state: any) => {
          var message = {
            message: action.supportTicketMessage,
            supportTicketId: state.supportTickets.selectedId,
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

  closeSupportTicketMessage$ = createEffect(() =>
    this.actions$.pipe(
      ofType(SupportTicketsActions.closeSupportTicket),
      withLatestFrom(this.store),
      fetch({
        run: (action) => {
          return this.supportService.closeSupportTicket(action.ticketId).pipe(
            map((supportTicket) =>
              SupportTicketsActions.closeSupportTicketSuccess({
                supportTicket,
              })
            )
          );
        },
        onError: (action, error) => {
          console.error('Error', error);
          return SupportTicketsActions.closeSupportTicketFailure({
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
