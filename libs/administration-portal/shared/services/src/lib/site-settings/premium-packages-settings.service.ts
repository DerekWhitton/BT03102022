import { HttpClient, HttpResponse } from '@angular/common/http';
import { Inject, Injectable } from '@angular/core';
import { ICreateOrUpdatePremiumPackageSetting, IPremiumPackageSetting } from '@bushtrade/administration-portal/shared/entites';
import { APP_CONFIG } from '@bushtrade/app-config';

@Injectable({
  providedIn: 'root'
})
export class PremiumPackagesSettingsService {
  private base: string;
  private version: string;
  constructor(
    @Inject(APP_CONFIG) private configuration: any,
    private httpClient: HttpClient
  ) {
    this.base = configuration.apiRoute;
    this.version = configuration.apiVersion;
  }

  loadPremiumPackageSettings() {
    return this.httpClient.get<IPremiumPackageSetting[]>(
      `${this.base}api/v${this.version}/SiteSettings/PremiumPackageSettings`
    );
  }

  createPremiumPackageSetting(premiumPackageSetting: ICreateOrUpdatePremiumPackageSetting) {
    return this.httpClient.post<IPremiumPackageSetting>(
      `${this.base}api/v${this.version}/SiteSettings/PremiumPackageSetting`,
      {
        ...premiumPackageSetting,
      }
    );
  }

  updatePremiumPackageSetting(premiumPackageSetting: ICreateOrUpdatePremiumPackageSetting) {
    return this.httpClient.post<IPremiumPackageSetting>(
      `${this.base}api/v${this.version}/SiteSettings/PremiumPackageSetting`,
      {
        ...premiumPackageSetting,
      }
    );
  }

  deletePremiumPackageSetting(premiumPackageSettingId: string) {
    return this.httpClient.delete<HttpResponse<any>>(
      `${this.base}api/v${this.version}/SiteSettings/PremiumPackageSetting/${premiumPackageSettingId}`
    );
  }
}
