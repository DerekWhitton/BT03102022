import { ITopic } from '@bushtrade/administration-portal/shared/entites';
import { createAction, props } from '@ngrx/store';

export const loadTopics = createAction('[Topics] Load Topics');

export const loadTopicsSuccess = createAction(
  '[Topics] Load Topics Success',
  props<{ topics: ITopic[] }>()
);

export const loadTopicsFailure = createAction(
  '[Topics] Load Topics Failure',
  props<{ error: any }>()
);

export const searchTopics = createAction(
  '[Topics] Search Topics',
  props<{ query: string }>()
);

export const searchTopicsSuccess = createAction(
  '[Topics] Search Topics Success',
  props<{ payload: ITopic[] }>()
);

export const setSelectedTopic = createAction(
  '[Topics] Set Selected Topic',
  props<{ id: string }>()
);

export const loadTopicDetails = createAction(
  '[Topics] Load Topic Details',
  props<{ topicId: string }>()
);

export const loadTopicDetailsSuccess = createAction(
  '[Topics] Load Topic Details Success',
  props<{ Topic: ITopic }>()
);

export const loadTopicDetailsFailure = createAction(
  '[Topics] Load Topic Details Failure',
  props<{ error: any }>()
);

export const createTopic = createAction(
  '[Topics] Create Topic',
  props<{ topic: ITopic }>()
);

export const createTopicSuccess = createAction(
  '[Topics] Create Topic Success',
  props<{ topic: ITopic }>()
);

export const createTopicFailure = createAction(
  '[Topics] Create Topic Failure',
  props<{ error: any }>()
);

export const updateTopic = createAction(
  '[Topics] Update Topic',
  props<{ topic: ITopic }>()
);

export const updateTopicSuccess = createAction(
  '[Topics] Update Topic Success',
  props<{ topic: ITopic; topicId: string }>()
);

export const updateTopicFailure = createAction(
  '[Topics] Update Topic Failure',
  props<{ error: any }>()
);
