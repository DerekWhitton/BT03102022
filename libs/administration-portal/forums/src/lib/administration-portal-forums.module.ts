import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { Route, RouterModule } from '@angular/router';
import { UiModule } from '@bushtrade/ui';
import { UiElementsModule } from '@bushtrade/ui-elements';
import { EffectsModule } from '@ngrx/effects';
import { StoreModule } from '@ngrx/store';
import { TopicsEffects } from './+state/topics.effects';
import { TopicsFacade } from './+state/topics.facade';
import * as fromTopics from './+state/topics.reducer';
import { ForumIndexComponent } from './containers/forum-index/forum-index.component';

export const administrationPortalForumsRoutes: Route[] = [];

@NgModule({
  imports: [
    CommonModule,
    UiModule,
    UiElementsModule,
    FormsModule,
    ReactiveFormsModule,
    RouterModule.forChild([
      { path: '', pathMatch: 'full', component: ForumIndexComponent },
    ]),
    StoreModule.forFeature(fromTopics.TOPICS_FEATURE_KEY, fromTopics.reducer),
    EffectsModule.forFeature([TopicsEffects]),
  ],
  declarations: [ForumIndexComponent],
  entryComponents: [ForumIndexComponent],
  providers: [TopicsFacade],
})
export class AdministrationPortalForumsModule {}
