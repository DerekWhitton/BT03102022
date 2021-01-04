import { createAction, props } from '@ngrx/store';
import { IPost, IThread, ITopic } from '@bushtrade/website/shared/entites';

export const loadTopics = createAction('[Forums] Load Topics');

export const loadTopicsSuccess = createAction(
  '[Forums] Load Topics Success',
  props<{ topics: ITopic[] }>()
);

export const loadTopicsFailure = createAction(
  '[Forums] Load Topics Failure',
  props<{ error: any }>()
);

export const setSelectedTopic = createAction(
  '[Forums] Set Selected Topic',
  props<{ id: string }>()
);

export const loadTopicThreads = createAction('[Forums] Load Topic Threads');

export const loadTopicThreadsSuccess = createAction(
  '[Forums] Load Topic Threads Success',
  props<{
    threads: IThread[];
    nextPage: number;
    previousPage: number;
    page: number;
  }>()
);

export const loadTopicThreadsFailure = createAction(
  '[Forums] Load Topic Threads Failure',
  props<{ error: any }>()
);

export const createTopicThread = createAction(
  '[Forums] Create Topic Thread',
  props<{ name: string }>()
);

export const createTopicThreadSuccess = createAction(
  '[Forums] Create Topic Thread Success',
  props<{ thread: IThread }>()
);

export const createTopicThreadFailure = createAction(
  '[Forums] Create Topic Thread Failure',
  props<{ error: string }>()
);

export const setSelectedThread = createAction(
  '[Forums] Set Selected Thread',
  props<{ topicId: string; threadId }>()
);

export const loadThreadPosts = createAction('[Forums] Load Thread Posts');

export const loadThreadPostsSuccess = createAction(
  '[Forums] Load  Thread Posts Success',
  props<{
    posts: IPost[];
    nextPage: number;
    previousPage: number;
    page: number;
  }>()
);

export const loadThreadPostsFailure = createAction(
  '[Forums] Load  Thread Posts Failure',
  props<{ error: any }>()
);

export const createThreadPost = createAction(
  '[Forums] Create Thread Post',
  props<{ content: string }>()
);

export const createThreadPostSuccess = createAction(
  '[Forums] Create Thread Post Success',
  props<{ post: IPost }>()
);

export const createThreadPostFailure = createAction(
  '[Forums] Create Thread Post Failure',
  props<{ error: string }>()
);
