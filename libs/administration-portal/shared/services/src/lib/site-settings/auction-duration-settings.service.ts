import { HttpClient, HttpResponse } from '@angular/common/http';
import { Inject, Injectable } from '@angular/core';
import { IAuctionDurationSetting, ICreateOrUpdateAuctionDurationSetting } from '@bushtrade/administration-portal/shared/entites';
import { APP_CONFIG } from '@bushtrade/app-config';

@Injectable({
  providedIn: 'root'
})
export class AuctionDurationSettingsService {
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

  createAuctionDurationSetting(auctionDurationSetting: ICreateOrUpdateAuctionDurationSetting) {
    return this.httpClient.post<IAuctionDurationSetting>(
      `${this.base}api/v${this.version}/SiteSettings/AuctionDurationSetting`,
      {
        ...auctionDurationSetting,
      }
    );
  }

  updateAuctionDurationSetting(auctionDurationSetting: ICreateOrUpdateAuctionDurationSetting) {
    return this.httpClient.post<IAuctionDurationSetting>(
      `${this.base}api/v${this.version}/SiteSettings/AuctionDurationSetting`,
      {
        ...auctionDurationSetting,
      }
    );
  }

  deleteAuctionDurationSetting(auctionDurationSettingId: string) {
    return this.httpClient.delete<HttpResponse<any>>(
      `${this.base}api/v${this.version}/SiteSettings/AuctionDurationSetting/${auctionDurationSettingId}`
    );
  }
}
