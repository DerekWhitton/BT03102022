import { createReducer, on, Action } from '@ngrx/store';
import { EntityState, EntityAdapter, createEntityAdapter } from '@ngrx/entity';

import * as ForumsActions from './forums.actions';
import { ITopic } from '@bushtrade/website/shared/entites';

export const FORUMS_FEATURE_KEY = 'forums';

export interface State extends EntityState<ITopic> {
  selectedId?: string | number;
  selectedThreadId?: string | number;
  loaded: boolean;
  error?: string | null;
  threadPage: number | null;
  nextThreadPage?: number | null;
  previousThreadPage?: number | null;
  threadPostsPage: number | null;
  nextThreadPostsPage?: number | null;
  previousThreadPostsPage?: number | null;
}

export interface ForumsPartialState {
  readonly [FORUMS_FEATURE_KEY]: State;
}

export const forumsAdapter: EntityAdapter<ITopic> = createEntityAdapter<
  ITopic
>();

export const initialState: State = forumsAdapter.getInitialState({
  // set initial required properties
  loaded: false,
  threadPage: 1,
  threadPostsPage: 1,
});

const forumsReducer = createReducer(
  initialState,
  on(ForumsActions.loadTopics, (state) => ({
    ...state,
    loaded: false,
    error: null,
  })),
  on(ForumsActions.loadTopicsSuccess, (state, { topics: forums }) =>
    forumsAdapter.setAll(forums, { ...state, loaded: true })
  ),
  on(ForumsActions.loadTopicsFailure, (state, { error }) => ({
    ...state,
    error,
  })),
  on(ForumsActions.setSelectedTopic, (state, action) => {
    return {
      ...state,
      selectedId: action.id,
      threadPage: 1,
      previousThreadPage: null,
      nextThreadPage: null,
    };
  }),
  on(ForumsActions.loadTopicThreadsSuccess, (state, action) => {
    const entity = {
      ...state.entities[state.selectedId],
      threads: action.threads,
    };

    return forumsAdapter.upsertOne(entity, {
      ...state,
      threadPage: action.page,
      previousThreadPage: action.previousPage,
      nextThreadPage: action.nextPage,
    });
  }),
  on(ForumsActions.createTopicThreadSuccess, (state, action) => {
    var threads = [...state.entities[state.selectedId].threads];

    const entity = {
      ...state.entities[state.selectedId],
      threads: [action.thread].concat(threads),
    };

    return forumsAdapter.upsertOne(entity, {
      ...state,
    });
  }),
  on(ForumsActions.setSelectedThread, (state, action) => {
    return {
      ...state,
      selectedId: action.topicId,
      selectedThreadId: action.threadId,
      threadPostsPage: 1,
    };
  }),
  on(ForumsActions.loadThreadPostsSuccess, (state, action) => {
    const entityThreads = [...state.entities[state.selectedId].threads];
    const threadToUpdate = entityThreads.filter(
      (t) => t.id == state.selectedThreadId
    ).length
      ? entityThreads.filter((t) => t.id == state.selectedThreadId)[0]
      : null;

    if (threadToUpdate == null) {
      return state;
    }

    const updatedThread = { ...threadToUpdate, posts: action.posts };
    const updatedThreads = entityThreads.map((e) =>
      e.id != state.selectedThreadId ? e : updatedThread
    );

    const entity = {
      ...state.entities[state.selectedId],
      threads: updatedThreads,
    };

    return forumsAdapter.upsertOne(entity, {
      ...state,
      threadPage: action.page,
      previousThreadPage: action.previousPage,
      nextThreadPage: action.nextPage,
    });
  }),
  on(ForumsActions.createThreadPostSuccess, (state, action) => {
    const entityThreads = [...state.entities[state.selectedId].threads];
    const threadToUpdate = entityThreads.filter(
      (t) => t.id == state.selectedThreadId
    ).length
      ? entityThreads.filter((t) => t.id == state.selectedThreadId)[0]
      : null;

    if (threadToUpdate == null) {
      return state;
    }

    const updatedThread = {
      ...threadToUpdate,
      posts: [action.post].concat(threadToUpdate.posts),
    };
    const updatedThreads = entityThreads.map((e) =>
      e.id != state.selectedThreadId ? e : updatedThread
    );

    const entity = {
      ...state.entities[state.selectedId],
      threads: updatedThreads,
    };

    return forumsAdapter.upsertOne(entity, {
      ...state,
    });
  })
);

export function reducer(state: State | undefined, action: Action) {
  return forumsReducer(state, action);
}
