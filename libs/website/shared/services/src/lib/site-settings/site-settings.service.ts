import { HttpClient } from '@angular/common/http';
import { Inject, Injectable } from '@angular/core';
import { APP_CONFIG } from '@bushtrade/app-config';
import { IAuctionDurationSetting } from '@bushtrade/website/shared/entites';

@Injectable({
  providedIn: 'root'
})
export class SiteSettingsService {
  private base: string;
  private version: string;
  constructor(
    @Inject(APP_CONFIG) private configuration: any,
    private httpClient: HttpClient
  ) {
    this.base = configuration.apiRoute;
    this.version = configuration.apiVersion;
  }

  loadAuctionDurationSettings() {
    return this.httpClient.get<IAuctionDurationSetting[]>(
      `${this.base}api/v${this.version}/SiteSettings/AuctionDurationSettings`
    );
  }
}
