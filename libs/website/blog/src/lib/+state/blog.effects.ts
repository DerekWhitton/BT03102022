import { Injectable } from '@angular/core';
import { BlogService } from '@bushtrade/website/shared/services';
import { Actions, createEffect, ofType, OnInitEffects } from '@ngrx/effects';
import { Action, Store } from '@ngrx/store';
import { fetch } from '@nrwl/angular';
import { first, map, withLatestFrom } from 'rxjs/operators';
import * as BlogActions from './blog.actions';

@Injectable()
export class BlogEffects implements OnInitEffects {
  loadBlogs$ = createEffect(() =>
    this.actions$.pipe(
      ofType(BlogActions.loadBlogs),
      withLatestFrom(this.store),
      fetch({
        run: (action, state: any) => {
          const { blog } = state;
          return this.blogSvc.listPosts(action.page ?? 1).pipe(
            map((response) => {
              var currentPage = action.page ?? 1;
              var totalPages = Number(response.headers.get('X-WP-TotalPages'));
              return BlogActions.loadBlogsSuccess({
                blogs: response.body,
                page: currentPage,
                previousPage: currentPage > 1 ? currentPage - 1 : null,
                nextPage: currentPage < totalPages ? currentPage + 1 : null,
              });
            })
          );
        },

        onError: (action, error) => {
          console.error('Error', error);
          return BlogActions.loadBlogsFailure({ error });
        },
      })
    )
  );

  loadBlog$ = createEffect(() =>
    this.actions$.pipe(
      ofType(BlogActions.loadBlog),
      withLatestFrom(this.store),
      fetch({
        run: (action, state: any) => {
          const { blog } = state;
          return this.blogSvc.getPost(blog.selectedId).pipe(
            map((blog) => {
              return BlogActions.loadBlogSuccess({
                blog,
              });
            })
          );
        },

        onError: (action, error) => {
          console.error('Error', error);
          return BlogActions.loadBlogFailure({ error });
        },
      })
    )
  );

  constructor(
    private actions$: Actions,
    private blogSvc: BlogService,
    private store: Store
  ) {}

  ngrxOnInitEffects(): Action {
    return BlogActions.loadBlogs({ page: null });
  }
}
