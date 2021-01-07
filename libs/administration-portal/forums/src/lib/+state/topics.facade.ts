import { Injectable } from '@angular/core';
import { Action, select, Store } from '@ngrx/store';
import * as fromTopics from './topics.reducer';
import * as TopicsSelectors from './topics.selectors';

@Injectable()
export class TopicsFacade {
  loaded$ = this.store.pipe(select(TopicsSelectors.getTopicsLoaded));
  allTopics$ = this.store.pipe(select(TopicsSelectors.getAllTopics));
  selectedTopics$ = this.store.pipe(select(TopicsSelectors.getSelected));

  constructor(private store: Store<fromTopics.TopicsPartialState>) {}

  dispatch(action: Action) {
    this.store.dispatch(action);
  }
}
