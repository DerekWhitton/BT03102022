import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { RouterModule } from '@angular/router';
import { UiModule } from '@bushtrade/ui';
import { UiElementsModule } from '@bushtrade/ui-elements';
import { EffectsModule } from '@ngrx/effects';
import { StoreModule } from '@ngrx/store';
import { ForumsEffects } from './+state/forums.effects';
import { ForumsFacade } from './+state/forums.facade';
import * as fromForums from './+state/forums.reducer';
import { ForumsIndexComponent } from './containers/forums-index/forums-index.component';
import { ForumsTopicComponent } from './containers/forums-topic/forums-topic.component';
import { ForumThreadComponent } from './containers/forum-thread/forum-thread.component';
@NgModule({
  imports: [
    CommonModule,
    UiModule,
    UiElementsModule,
    FormsModule,
    ReactiveFormsModule,
    RouterModule.forChild([
      { path: '', pathMatch: 'full', component: ForumsIndexComponent },
      {
        path: 'topic/:topicId',
        component: ForumsTopicComponent,
      },
      {
        path: 'topic/:topicId/threads/:threadId',
        component: ForumThreadComponent,
      },
    ]),
    StoreModule.forFeature(fromForums.FORUMS_FEATURE_KEY, fromForums.reducer),
    EffectsModule.forFeature([ForumsEffects]),
  ],
  declarations: [
    ForumsIndexComponent,
    ForumsTopicComponent,
    ForumThreadComponent,
  ],
  providers: [ForumsFacade],
})
export class WebsiteForumsModule {}
