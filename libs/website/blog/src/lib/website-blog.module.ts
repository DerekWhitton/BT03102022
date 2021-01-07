import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { RouterModule } from '@angular/router';
import { UiModule } from '@bushtrade/ui';
import { UiElementsModule } from '@bushtrade/ui-elements';
import { EffectsModule } from '@ngrx/effects';
import { StoreModule } from '@ngrx/store';
import { BlogEffects } from './+state/blog.effects';
import { BlogFacade } from './+state/blog.facade';
import * as fromBlog from './+state/blog.reducer';
import { IndexComponent } from './containers/index/index.component';
import { PostComponent } from './containers/post/post.component';

@NgModule({
  imports: [
    CommonModule,
    UiModule,
    UiElementsModule,
    FormsModule,
    ReactiveFormsModule,
    RouterModule.forChild([
      { path: '', pathMatch: 'full', component: IndexComponent },
      { path: ':id', component: PostComponent },
    ]),
    StoreModule.forFeature(fromBlog.BLOG_FEATURE_KEY, fromBlog.reducer),
    EffectsModule.forFeature([BlogEffects]),
  ],
  declarations: [IndexComponent, PostComponent],
  providers: [BlogFacade],
})
export class WebsiteBlogModule {}
