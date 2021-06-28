import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Inject, Injectable } from '@angular/core';
import {
  IListing,
  IPaginatedResponse,
} from '@bushtrade/administration-portal/shared/entites';
import { APP_CONFIG } from '@bushtrade/app-config';

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

  loadListings(
    page: number = 1,
    perPage: number = 25,
    query: string = '',
    showOnlyReportedListings = false,
    includeDeleted = false
  ) {
    var queryParams = `?page=${page}&perPage=${perPage}` +
      `&reportedListingsOnly=${showOnlyReportedListings}` +
      `&includeDeleted=${includeDeleted}`;
    if (query) {
      queryParams += `&query=${query}`;
    }

    return this.httpClient.get<IPaginatedResponse<IListing>>(
      `${this.base}api/v${this.version}/Listings${queryParams}`
    );
  }

  marListingDeleted(listingId: string, deleteReason: string) {
    const options = {
      headers: new HttpHeaders({
        'Content-Type': 'application/json',
      }),
      body: {
        listingId: listingId,
        deleteReason: deleteReason,
      },
    };
    return this.httpClient.delete<IListing>(
      `${this.base}api/v${this.version}/Listings`,
      options
    );
  }
}
