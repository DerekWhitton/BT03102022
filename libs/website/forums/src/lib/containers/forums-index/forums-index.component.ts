import { Component, OnInit } from '@angular/core';
import { ForumsFacade } from '../../+state/forums.facade';

@Component({
  selector: 'bushtrade-web-forums-index',
  templateUrl: './forums-index.component.html',
  styleUrls: ['./forums-index.component.scss'],
})
export class ForumsIndexComponent implements OnInit {
  topics$ = this.forumsFacade.allTopics$;
  loaded$ = this.forumsFacade.loaded$;

  constructor(private forumsFacade: ForumsFacade) {}

  ngOnInit(): void {}
}
