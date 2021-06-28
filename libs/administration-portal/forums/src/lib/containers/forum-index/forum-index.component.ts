import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { ITopic } from '@bushtrade/administration-portal/shared/entites';
import {
  createTopic,
  searchTopics,
  setSelectedTopic,
  updateTopic,
} from '../../+state/topics.actions';
import { TopicsFacade } from '../../+state/topics.facade';

@Component({
  selector: 'bushtrade-administration-forums-index',
  templateUrl: './forum-index.component.html',
  styleUrls: ['./forum-index.component.scss'],
})
export class ForumIndexComponent implements OnInit {
  columns = [{ field: 'name', header: 'Name' }];
  listings$ = this.topicsFacade.allTopics$;
  loading$ = this.topicsFacade.loaded$;

  constructor(private topicsFacade: TopicsFacade) {}

  createFormGroup: FormGroup = new FormGroup({
    name: new FormControl('', Validators.required),
  });
  updateFormGroup: FormGroup = new FormGroup({
    name: new FormControl('', Validators.required),
  });

  ngOnInit(): void {}

  onCreateSubmit() {
    const topic = this.createFormGroup.value as ITopic;
    this.topicsFacade.dispatch(createTopic({ topic }));
  }

  handleUpdateSelection(data) {
    this.topicsFacade.dispatch(setSelectedTopic({ id: data.id }));
    let ctx = this;
    this.topicsFacade.selectedTopics$.subscribe({
      next(topic) {
        ctx.updateFormGroup.patchValue({ ...topic });
      },
    });
  }

  onUpdateSubmit() {
    const topic = this.updateFormGroup.value as ITopic;
    this.topicsFacade.dispatch(updateTopic({ topic }));
  }

  search(query: string) {
    this.topicsFacade.dispatch(searchTopics({ query }));
  }
}
