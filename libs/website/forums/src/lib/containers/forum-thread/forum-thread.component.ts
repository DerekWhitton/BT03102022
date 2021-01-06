import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { ForumsService } from '@bushtrade/website/shared/services';
import { Store } from '@ngrx/store';
import { take } from 'rxjs/operators';
import {
  createThreadPost,
  loadThreadPosts,
  loadTopicThreadsSuccess,
  setSelectedThread,
} from '../../+state/forums.actions';
import { ForumsFacade } from '../../+state/forums.facade';

@Component({
  selector: 'bushtrade.web-forum-thread',
  templateUrl: './forum-thread.component.html',
  styleUrls: ['./forum-thread.component.scss'],
})
export class ForumThreadComponent implements OnInit {
  showAddPost: boolean = false;
  content: string;
  thread$ = this.forumsFacade.selectedThread$;
  nextPage$ = this.forumsFacade.nextThreadPostPage$;
  previousPage$ = this.forumsFacade.previousThreadPostPage$;

  constructor(
    private forumsFacade: ForumsFacade,
    private forumsSvc: ForumsService,
    private route: ActivatedRoute,
    private store: Store
  ) {}

  ngOnInit(): void {
    var params = this.route.snapshot.params;

    this.forumsFacade.dispatch(
      setSelectedThread({ topicId: params.topicId, threadId: params.threadId })
    );

    this.tryEnsureThread(params.topicId);
  }

  // todo: need to add a direct thread id GET on the API
  // nasty nasty things
  private async tryEnsureThread(topicId: string, previousPage: number = null) {
    if (previousPage != null && previousPage > 10) {
      return;
    }

    if (!(await this.threadExists())) {
      var page = previousPage == null ? 1 : previousPage + 1;
      var threads = await this.forumsSvc
        .listTopicThreads(topicId, page)
        .toPromise();

      this.forumsFacade.dispatch(
        loadTopicThreadsSuccess({
          threads: threads.items,
          page: threads.page,
          nextPage: threads.nextPage,
          previousPage: threads.previousPage,
        })
      );

      if (!(await this.threadExists())) {
        this.tryEnsureThread(topicId, page);
        return;
      }
    }

    this.forumsFacade.dispatch(loadThreadPosts(null));
  }

  private async threadExists() {
    return await this.forumsFacade.selectedThread$.pipe(take(1)).toPromise();
  }

  createPost() {
    this.forumsFacade.dispatch(createThreadPost({ content: this.content }));

    this.content = '';

    this.showAddPost = false;
  }

  loadPage(page: number) {
    this.forumsFacade.dispatch(loadThreadPosts({ page }));
  }
}


