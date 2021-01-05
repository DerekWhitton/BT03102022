import { createReducer, on, Action } from '@ngrx/store';
import { EntityState, EntityAdapter, createEntityAdapter } from '@ngrx/entity';
import { IBlogPost } from '@bushtrade/website/shared/entites';
import * as BlogActions from './blog.actions';

export const BLOG_FEATURE_KEY = 'blog';

export interface State extends EntityState<IBlogPost> {
  selectedId?: string | number; // which Blog record has been selected
  loaded: boolean; // has the Blog list been loaded
  error?: string | null; // last known error (if any)
}

export interface BlogPartialState {
  readonly [BLOG_FEATURE_KEY]: State;
}

export const blogAdapter: EntityAdapter<IBlogPost> = createEntityAdapter<
  IBlogPost
>();

export const initialState: State = blogAdapter.getInitialState({
  // set initial required properties
  loaded: false,
});

const blogReducer = createReducer(
  initialState,
  on(BlogActions.loadBlogs, (state) => ({
    ...state,
    loaded: false,
    error: null,
  })),
  on(BlogActions.loadBlogsSuccess, (state, { blogs: blog }) =>
    blogAdapter.setAll(blog, { ...state, loaded: true })
  ),
  on(BlogActions.loadBlogsFailure, (state, { error }) => ({ ...state, error })),
  on(BlogActions.setSelectedBlog, (state, action) => {
    return {
      ...state,
      selectedId: action.id,
    };
  }),
  on(BlogActions.loadBlogSuccess, (state, { blog }) =>
    blogAdapter.upsertOne(blog, { ...state, loaded: true })
  ),
  on(BlogActions.loadBlogFailure, (state, { error }) => ({ ...state, error }))
);

export function reducer(state: State | undefined, action: Action) {
  return blogReducer(state, action);
}
