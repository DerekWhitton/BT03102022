import { ITopic } from '@bushtrade/administration-portal/shared/entites';
import { createEntityAdapter, EntityAdapter, EntityState } from '@ngrx/entity';
import { Action, createReducer, on } from '@ngrx/store';
import * as TopicsActions from './topics.actions';

export const TOPICS_FEATURE_KEY = 'topics';

export interface State extends EntityState<ITopic> {
  selectedId?: string | number;
  loaded: boolean;
  error?: string | null;
  query?: string | null;
}

export interface TopicsPartialState {
  readonly [TOPICS_FEATURE_KEY]: State;
}

export const topicsAdapter: EntityAdapter<ITopic> = createEntityAdapter<
  ITopic
>();

export const initialState: State = topicsAdapter.getInitialState({
  // set initial required properties
  loaded: false,
});

const topicsReducer = createReducer(
  initialState,
  on(TopicsActions.loadTopics, (state) => ({
    ...state,
    loaded: false,
    error: null,
  })),
  on(TopicsActions.loadTopicsSuccess, (state, { topics }) =>
    topicsAdapter.setAll(topics, { ...state, loaded: true })
  ),
  on(TopicsActions.loadTopicsFailure, (state, { error }) => ({
    ...state,
    error,
  })),
  on(TopicsActions.searchTopics, (state, { query }) => ({
    ...state,
    query,
  })),
  on(TopicsActions.searchTopicsSuccess, (state, { payload }) => {
    return topicsAdapter.setAll(payload, {
      ...state,
      loaded: true,
      error: '',
    });
  }),
  on(TopicsActions.setSelectedTopic, (state, action) => {
    return {
      ...state,
      selectedId: action.id,
    };
  }),
  on(TopicsActions.loadTopicDetails, (state, action) => {
    return {
      ...state,
      loaded: false,
    };
  }),
  on(TopicsActions.loadTopicDetailsSuccess, (state, action) => {
    return topicsAdapter.upsertOne(action.Topic, {
      ...state,
      loaded: true,
      error: '',
    });
  }),
  on(TopicsActions.loadTopicDetailsFailure, (state, action) => {
    return {
      ...state,
      error: action.error,
    };
  }),
  on(TopicsActions.createTopicSuccess, (state, action) => {
    return topicsAdapter.upsertOne(action.topic, {
      ...state,
      error: '',
    });
  }),
  on(TopicsActions.createTopicFailure, (state, action) => {
    return {
      ...state,
      error: action.error,
    };
  }),
  on(TopicsActions.updateTopicSuccess, (state, action) => {
    return topicsAdapter.upsertOne(action.topic, {
      ...state,
      error: '',
    });
  }),
  on(TopicsActions.updateTopicFailure, (state, action) => {
    return {
      ...state,
      error: action.error,
    };
  })
);

export function reducer(state: State | undefined, action: Action) {
  return topicsReducer(state, action);
}
