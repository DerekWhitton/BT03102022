import { HttpClient } from '@angular/common/http';
import { Inject, Injectable } from '@angular/core';
import { APP_CONFIG } from '@bushtrade/app-config';
import {
  IListing,
  IPaginatedResponse,
} from '@bushtrade/website/shared/entites';

@Injectable({
  providedIn: 'root',
})
export class ListingsService {
  private base: string;
  private version: string;
  constructor(
    @Inject(APP_CONFIG) private configuration: any,
    private httpClient: HttpClient
  ) {
    this.base = configuration.apiRoute;
    this.version = configuration.apiVersion;
  }

  loadListings(sellerId: string) {
    return this.httpClient.get<IPaginatedResponse<IListing>>(
      `${this.base}api/v${this.version}/Sellers/${sellerId}/Listings`
    );
  }

  uploadListingImage(sellerId: string, file: File) {
    let formData = new FormData();
    formData.append('file', file, file.name);
    return this.httpClient.post<string>(
      `${this.base}api/v${this.version}/Sellers/${sellerId}/Listings/UploadImage`,
      formData
    );
  }

  addListing(sellerId: string, listing: IListing) {
    return this.httpClient.post<IListing>(
      `${this.base}api/v${this.version}/Sellers/${sellerId}/Listings`,
      {
        ...listing,
      }
    );
  }
}
