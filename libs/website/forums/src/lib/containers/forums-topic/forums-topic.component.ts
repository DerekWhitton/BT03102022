import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import {
  createTopicThread,
  createTopicThreadFailure,
  loadTopicThreads,
  setSelectedTopic,
} from '../../+state/forums.actions';
import { ForumsFacade } from '../../+state/forums.facade';

@Component({
  selector: 'bushtrade.web-forums-topic',
  templateUrl: './forums-topic.component.html',
  styleUrls: ['./forums-topic.component.scss'],
})
export class ForumsTopicComponent implements OnInit {
  showAddThread: boolean;
  name: string;
  topic$ = this.forumsFacade.selectedTopics$;

  constructor(
    private forumsFacade: ForumsFacade,
    private route: ActivatedRoute
  ) {}

  ngOnInit(): void {
    var params = this.route.snapshot.params;

    this.forumsFacade.dispatch(setSelectedTopic({ id: params.topicId }));
    this.forumsFacade.dispatch(loadTopicThreads());

    console.log(params);
  }

  createThread() {
    this.forumsFacade.dispatch(createTopicThread({ name: this.name }));
  }
}
