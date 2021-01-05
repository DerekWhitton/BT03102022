import { IBlogPost } from '@bushtrade/website/shared/entites';
import { createAction, props } from '@ngrx/store';

export const loadBlogs = createAction(
  '[Blog] Load Blogs',
  props<{ page: number | null }>()
);

export const loadBlogsSuccess = createAction(
  '[Blog] Load Blogs Success',
  props<{
    blogs: IBlogPost[];
    page: number;
    previousPage?: number;
    nextPage?: number;
  }>()
);

export const loadBlogsFailure = createAction(
  '[Blog] Load Blogs Failure',
  props<{ error: any }>()
);

export const setSelectedBlog = createAction(
  '[Blog] Set Selected Blog',
  props<{ id: string }>()
);

export const loadBlog = createAction('[Blog] Load Blog');

export const loadBlogSuccess = createAction(
  '[Blog] Load Blog Success',
  props<{
    blog: IBlogPost;
  }>()
);

export const loadBlogFailure = createAction(
  '[Blog] Load Blog Failure',
  props<{ error: any }>()
);
