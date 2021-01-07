import { Injectable } from '@angular/core';
import { Actions, createEffect, ofType, OnInitEffects } from '@ngrx/effects';
import { Action, Store } from '@ngrx/store';
import { fetch } from '@nrwl/angular';
import { map, withLatestFrom } from 'rxjs/operators';
import * as ForumsActions from './forums.actions';
import { ForumsService } from '@bushtrade/website/shared/services';

@Injectable()
export class ForumsEffects implements OnInitEffects {
  loadCourses$ = createEffect(() =>
    this.actions$.pipe(
      ofType(ForumsActions.loadTopics),
      withLatestFrom(this.store),
      fetch({
        run: (action, state: any) => {
          const { forums } = state;
          return this.forumSvc
            .listTopics()
            .pipe(map((topics) => ForumsActions.loadTopicsSuccess({ topics })));
        },
        onError: (action, error) => {
          console.error('Error', error);
          return ForumsActions.loadTopicsFailure({ error });
        },
      })
    )
  );

  loadTopicThreads$ = createEffect(() =>
    this.actions$.pipe(
      ofType(ForumsActions.loadTopicThreads),
      withLatestFrom(this.store),
      fetch({
        run: (action, state: any) => {
          const { forums } = state;
          return this.forumSvc
            .listTopicThreads(forums.selectedId, action.page ?? 1)
            .pipe(
              map((response) =>
                ForumsActions.loadTopicThreadsSuccess({
                  threads: response.items,
                  page: response.page,
                  previousPage: response.previousPage,
                  nextPage: response.nextPage,
                })
              )
            );
        },

        onError: (action, error) => {
          console.error('Error', error);
          return ForumsActions.loadTopicThreadsFailure({ error });
        },
      })
    )
  );

  createTopicThread$ = createEffect(() =>
    this.actions$.pipe(
      ofType(ForumsActions.createTopicThread),
      withLatestFrom(this.store),
      fetch({
        run: (action, state: any) => {
          const { forums } = state;
          return this.forumSvc
            .addTopicThread(forums.selectedId, action.name)
            .pipe(
              map((thread) =>
                ForumsActions.createTopicThreadSuccess({
                  thread,
                })
              )
            );
        },
        onError: (action, error) => {
          console.error('Error', error);
          return ForumsActions.createTopicThreadFailure({ error });
        },
      })
    )
  );

  loadThreadPosts$ = createEffect(() =>
    this.actions$.pipe(
      ofType(ForumsActions.loadThreadPosts),
      withLatestFrom(this.store),
      fetch({
        run: (action, state: any) => {
          const { forums } = state;
          return this.forumSvc
            .listThreadPosts(
              forums.selectedId,
              forums.selectedThreadId,
              action.page ?? 1
            )
            .pipe(
              map((response) =>
                ForumsActions.loadThreadPostsSuccess({
                  posts: response.items,
                  page: response.page,
                  previousPage: response.previousPage,
                  nextPage: response.nextPage,
                })
              )
            );
        },

        onError: (action, error) => {
          console.error('Error', error);
          return ForumsActions.loadThreadPostsFailure({ error });
        },
      })
    )
  );

  createThreadPost$ = createEffect(() =>
    this.actions$.pipe(
      ofType(ForumsActions.createThreadPost),
      withLatestFrom(this.store),
      fetch({
        run: (action, state: any) => {
          const { forums } = state;
          return this.forumSvc
            .addThreadPost(
              forums.selectedId,
              forums.selectedThreadId,
              action.content
            )
            .pipe(
              map((post) =>
                ForumsActions.createThreadPostSuccess({
                  post,
                })
              )
            );
        },
        onError: (action, error) => {
          console.error('Error', error);
          return ForumsActions.createThreadPostFailure({ error });
        },
      })
    )
  );

  constructor(
    private actions$: Actions,
    private forumSvc: ForumsService,
    private store: Store
  ) {}

  ngrxOnInitEffects(): Action {
    return ForumsActions.loadTopics();
  }
}
