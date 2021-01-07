import { HttpClient } from '@angular/common/http';
import { Inject, Injectable } from '@angular/core';
import { APP_CONFIG } from '@bushtrade/app-config';
import {
  ICreateOrUpdateListing,
  IListing,
  IPaginatedResponse,
  ISellerListing,
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

  loadSellerListings(sellerId: string) {
    return this.httpClient.get<IPaginatedResponse<ISellerListing>>(
      `${this.base}api/v${this.version}/Sellers/${sellerId}/Listings`
    );
  }

  loadSellerListing(sellerId: string, listingId: string) {
    return this.httpClient.get<ISellerListing>(
      `${this.base}api/v${this.version}/Sellers/${sellerId}/Listings/${listingId}`
    );
  }

  updateSellerListing(
    sellerId: string,
    listingId: string,
    listing: ICreateOrUpdateListing
  ) {
    return this.httpClient.patch<ISellerListing>(
      `${this.base}api/v${this.version}/Sellers/${sellerId}/Listings/${listingId}`,
      {
        ...listing,
      }
    );
  }

  deleteSellerListing(sellerId: string, listingId: string) {
    return this.httpClient.delete<any>(
      `${this.base}api/v${this.version}/Sellers/${sellerId}/Listings/${listingId}`
    );
  }

  uploadSellerListingImage(sellerId: string, file: File) {
    let formData = new FormData();
    formData.append('file', file, file.name);
    return this.httpClient.post<string>(
      `${this.base}api/v${this.version}/Sellers/${sellerId}/Listings/UploadImage`,
      formData
    );
  }

  AddSellerListing(sellerId: string, listing: ICreateOrUpdateListing) {
    return this.httpClient.post<ISellerListing>(
      `${this.base}api/v${this.version}/Sellers/${sellerId}/Listings`,
      {
        ...listing,
      }
    );
  }
}
