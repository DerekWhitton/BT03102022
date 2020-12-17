import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { StoreModule } from '@ngrx/store';
import { EffectsModule } from '@ngrx/effects';
import * as fromUser from './+state/user/user.reducer';
import { UserEffects } from './+state/user/user.effects';
import { UserFacade } from './+state/user/user.facade';

@NgModule({
  imports: [
    CommonModule,
    StoreModule.forFeature(fromUser.USER_FEATURE_KEY, fromUser.reducer),
    EffectsModule.forFeature([UserEffects]),
  ],
  providers: [UserFacade],
})
export class WebsiteSharedStateModule {}
