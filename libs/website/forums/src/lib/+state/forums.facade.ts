import { Injectable } from '@angular/core';

import { select, Store, Action } from '@ngrx/store';

import * as fromForums from './forums.reducer';
import * as ForumsSelectors from './forums.selectors';

@Injectable()
export class ForumsFacade {
  loaded$ = this.store.pipe(select(ForumsSelectors.getForumsLoaded));
  allTopics$ = this.store.pipe(select(ForumsSelectors.getAllForums));
  selectedTopics$ = this.store.pipe(select(ForumsSelectors.getSelected));
  selectedThread$ = this.store.pipe(select(ForumsSelectors.getSelectedThread));
  nextThreadPostPage$ = this.store.pipe(
    select(ForumsSelectors.getNextThreadPostsPageNumber)
  );
  previousThreadPostPage$ = this.store.pipe(
    select(ForumsSelectors.getPreviousThreadPostsPageNumber)
  );

  nextThreadPage$ = this.store.pipe(select(ForumsSelectors.getNextThreadPage));
  previousThreadPage$ = this.store.pipe(
    select(ForumsSelectors.getPreviousThreadPage)
  );

  constructor(private store: Store<fromForums.ForumsPartialState>) {}

  dispatch(action: Action) {
    this.store.dispatch(action);
  }
}
