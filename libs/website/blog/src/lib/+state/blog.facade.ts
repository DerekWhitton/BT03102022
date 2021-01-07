import { Injectable } from '@angular/core';

import { select, Store, Action } from '@ngrx/store';

import * as fromBlog from './blog.reducer';
import * as BlogSelectors from './blog.selectors';

@Injectable()
export class BlogFacade {
  loaded$ = this.store.pipe(select(BlogSelectors.getBlogLoaded));
  allBlogs$ = this.store.pipe(select(BlogSelectors.getAllBlogs));
  selectedBlog$ = this.store.pipe(select(BlogSelectors.getSelected));
  selectedId$ = this.store.pipe(select(BlogSelectors.getSelectedId));

  constructor(private store: Store<fromBlog.BlogPartialState>) {}

  dispatch(action: Action) {
    this.store.dispatch(action);
  }
}
