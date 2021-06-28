import { Injectable } from '@angular/core';
import { ForumsService } from '@bushtrade/administration-portal/shared/services';
import { Actions, createEffect, ofType, OnInitEffects } from '@ngrx/effects';
import { Action, Store } from '@ngrx/store';
import { fetch } from '@nrwl/angular';
import { of } from 'rxjs';
import { catchError, exhaustMap, map, withLatestFrom } from 'rxjs/operators';
import * as TopicsActions from './topics.actions';

@Injectable()
export class TopicsEffects implements OnInitEffects {
  loadTopics$ = createEffect(() =>
    this.actions$.pipe(
      ofType(TopicsActions.loadTopics),
      exhaustMap((action) =>
        this.forumsService.listTopics().pipe(
          map((data) =>
            TopicsActions.loadTopicsSuccess({
              topics: data,
            })
          ),
          catchError((error) => of(TopicsActions.loadTopicsFailure({ error })))
        )
      )
    )
  );

  searchCourses$ = createEffect(() =>
    this.actions$.pipe(
      ofType(TopicsActions.searchTopics),
      withLatestFrom(this.store),
      fetch({
        id: () => {
          return 'TopicsSearch'; // ensures events are cancelled if a new one is started
        },
        run: (action, state: any) => {
          const { topics } = state;
          return this.forumsService
            .listTopics(action.query)
            .pipe(
              map((response) =>
                TopicsActions.searchTopicsSuccess({ payload: response })
              )
            );
        },
        onError: (action, error) => {
          console.error('Error', error);
          return TopicsActions.loadTopicDetailsFailure({ error });
        },
      })
    )
  );

  loadTopicDetails$ = createEffect(() => {
    return this.actions$.pipe(
      ofType(TopicsActions.loadTopicDetails),
      exhaustMap((action) =>
        this.forumsService.getTopicDetails(action.topicId).pipe(
          map((data) =>
            TopicsActions.loadTopicDetailsSuccess({
              Topic: data,
            })
          ),
          catchError((error) =>
            of(TopicsActions.loadTopicDetailsFailure({ error }))
          )
        )
      )
    );
  });

  createTopic$ = createEffect(() => {
    return this.actions$.pipe(
      ofType(TopicsActions.createTopic),
      exhaustMap((action) =>
        this.forumsService.createTopic(action.topic).pipe(
          map((data) =>
            TopicsActions.createTopicSuccess({
              topic: data,
            })
          ),
          catchError((error) => of(TopicsActions.createTopicFailure({ error })))
        )
      )
    );
  });

  updateRoleDetails$ = createEffect(() =>
    this.actions$.pipe(
      ofType(TopicsActions.updateTopic),
      withLatestFrom(this.store),
      fetch({
        run: (action, state: any) => {
          const { topics } = state;
          return this.forumsService
            .updateTopic(action.topic, topics.selectedId)
            .pipe(
              map((response) =>
                TopicsActions.updateTopicSuccess({
                  topic: response,
                  topicId: response.id,
                })
              )
            );
        },

        onError: (action, error) => {
          console.error('Error', error);
          return TopicsActions.updateTopicFailure({ error });
        },
      })
    )
  );

  constructor(
    private actions$: Actions,
    private store: Store,
    private forumsService: ForumsService
  ) {}

  ngrxOnInitEffects(): Action {
    return TopicsActions.loadTopics();
  }
}
