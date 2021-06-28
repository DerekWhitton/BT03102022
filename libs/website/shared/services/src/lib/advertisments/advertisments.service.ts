
import { HttpClient } from '@angular/common/http';
import { Inject, Injectable } from '@angular/core';
import { IDashboardAdvertisment } from '@bushtrade/administration-portal/shared/entites';
import { APP_CONFIG } from '@bushtrade/app-config';

@Injectable({
  providedIn: 'root'
})
export class AdvertismentsService {
  private base: string;
  private version: string;
  constructor(
    @Inject(APP_CONFIG) private configuration: any,
    private httpClient: HttpClient
  ) {
    this.base = configuration.apiRoute;
    this.version = configuration.apiVersion;
  }

  listDashboardAdvertisments(numberOfBanners, onlyActive) {
    return this.httpClient.get<IDashboardAdvertisment[]>(
      `${this.base}api/v${this.version}/Sponsored/dashboard`,
      {
        params: { numberOfAds: numberOfBanners, onlyActive },
      }
    );
  }
}
