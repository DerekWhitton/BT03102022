import { Inject, Injectable } from '@angular/core';
import { APP_CONFIG } from '@bushtrade/app-config';
import { HttpClient, HttpHeaders, HttpResponse } from '@angular/common/http';
import { ISeller, IUserUpdateRequest, IUser } from '@bushtrade/website/shared/entites';
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

  startSelling(sellingProfile: ISeller) {
    return this.httpClient.post<ISeller>(
      `${this.base}api/v${this.version}/Profiles/StartSelling`,
      {
        ...sellingProfile,
      }
    );
  }

  uploadProfilePicture(file: File) {

    var HTTPOptions = {
      headers: new HttpHeaders(),
      'responseType': 'blob' as 'json'
   }
   
    let formData = new FormData();
    formData.append('file', file, file.name);

    return this.httpClient.post<string>(
      `${this.base}api/v${this.version}/Profiles/AddOrUpdateProfilePicture`,
      formData, HTTPOptions
    );
  }

  updateProfileDetails(data: IUserUpdateRequest) {
    return this.httpClient.put<IUser>(
      `${this.base}api/v${this.version}/Profiles/Me/Update`, data
    );
  }
  
}
