import { Inject, Injectable } from '@angular/core';
import { APP_CONFIG } from '@bushtrade/app-config';
import { HttpClient, HttpResponse } from '@angular/common/http';
import { ISeller, IUser } from '@bushtrade/website/shared/entites';
import { MsalService } from '@azure/msal-angular';
@Injectable({
  providedIn: 'root',
})
export class UserService {
  private base: string;
  private version: string;
  constructor(
    @Inject(APP_CONFIG) private configuration: any,
    private httpClient: HttpClient,
    private authService: MsalService
  ) {
    this.base = configuration.apiRoute;
    this.version = configuration.apiVersion;
  }

  loggedIn() {
    return this.authService.getAccount() !== null ? true : false;
  }

  loadUser() {
    return this.httpClient.get<IUser>(
      `${this.base}api/v${this.version}/Profiles/Me`
    );
  }

  startSelling(sellingProfile: ISeller) {
    return this.httpClient.post<ISeller>(
      `${this.base}api/v${this.version}/Profiles/StartSelling`,
      {
        ...sellingProfile,
      }
    );
  }
}
