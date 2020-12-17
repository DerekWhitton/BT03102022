import { Inject, Injectable } from '@angular/core';
import { APP_CONFIG } from '@bushtrade/app-config';
import { HttpClient, HttpResponse } from '@angular/common/http';
import { IUser } from '@bushtrade/website/shared/entites';
@Injectable({
  providedIn: 'root',
})
export class UserService {
  private base: string;
  private version: string;
  constructor(
    @Inject(APP_CONFIG) private configuration: any,
    private httpClient: HttpClient
  ) {
    this.base = configuration.apiRoute;
    this.version = configuration.apiVersion;
  }
  loadUser() {
    return this.httpClient.get<IUser>(
      `${this.base}api/v${this.version}/Profiles/Me`
    );
  }
}
