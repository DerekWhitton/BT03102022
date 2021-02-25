
import { HttpClient, HttpResponse } from '@angular/common/http';
import { Inject, Injectable } from '@angular/core';
import { IAdvertismentImage, ICreateDashboardAdvertisment, IDashboardAdvertisment, IPaginatedResponse, IUpdateDashboardAdvertisment } from '@bushtrade/administration-portal/shared/entites';
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

  listDashboardAdvertisments(numberOfAds, onlyActive) {
    return this.httpClient.get<IDashboardAdvertisment[]>(
      `${this.base}api/v${this.version}/Advertisments/dashboard`,
      {
        params: { numberOfAds, onlyActive },
      }
    );
  }
}
