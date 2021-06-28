import { UiModule } from './../../../../ui/src/lib/ui.module';
import { NgModule } from '@angular/core';
import { CommonModule, DatePipe } from '@angular/common';
import { SiteSettingsIndexComponent } from './site-settings-index/site-settings-index.component';
import { UiElementsModule } from '@bushtrade/ui-elements';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { RouterModule } from '@angular/router';
import { StoreModule } from '@ngrx/store';
import { EffectsModule } from '@ngrx/effects';
import * as fromAuctionDurationSettings from './+state/auction-duration/auction-duration-settings.reducer';
import { AuctionDurationSettingsEffects } from './+state/auction-duration/auction-duration-settings.effects';
import { AuctionDurationSettingsFacade } from './+state/auction-duration/auction-duration-settings.facade';
import * as fromPremiumPackagesSettings from './+state/premium-package/premium-packages-settings.reducer';
import { PremiumPackagesSettingsEffects } from './+state/premium-package/premium-packages-settings.effects';
import { PremiumPackagesSettingsFacade } from './+state/premium-package/premium-packages-settings.facade';

@NgModule({
  imports: [
    CommonModule,
    UiModule,
    UiElementsModule,
    FormsModule,
    ReactiveFormsModule,
    CommonModule,
    RouterModule.forChild([
      { path: '', pathMatch: 'full', component: SiteSettingsIndexComponent },
    ]),
    StoreModule.forFeature(
      fromAuctionDurationSettings.AUCTIONDURATIONSETTINGS_FEATURE_KEY,
      fromAuctionDurationSettings.auctionDurationReducer
    ),
    EffectsModule.forFeature([AuctionDurationSettingsEffects]),
    StoreModule.forFeature(
      fromPremiumPackagesSettings.PREMIUMPACKAGESSETTINGS_FEATURE_KEY,
      fromPremiumPackagesSettings.premiumPackagesReducer
    ),
    EffectsModule.forFeature([PremiumPackagesSettingsEffects]),
  ],
  declarations: [SiteSettingsIndexComponent],
  providers: [AuctionDurationSettingsFacade, PremiumPackagesSettingsFacade, DatePipe],
})
export class AdministrationPortalSiteSettingsModule {}
