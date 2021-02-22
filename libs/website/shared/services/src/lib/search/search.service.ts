import { HttpClient } from '@angular/common/http';
import { Inject, Injectable } from '@angular/core';
import { APP_CONFIG } from '@bushtrade/app-config';
import {
  IListing,
  IPaginatedResponse,
  ISearchFacet,
  ListingType,
} from '@bushtrade/website/shared/entites';

@Injectable({
  providedIn: 'root',
})
export class SearchService {
  private base: string;
  private version: string;
  constructor(
    @Inject(APP_CONFIG) private configuration: any,
    private httpClient: HttpClient
  ) {
    this.base = configuration.apiRoute;
    this.version = configuration.apiVersion;
  }

  searchListings(
    type: ListingType,
    query: string,
    categoryId: string = null,
    facets: { key: string; value: string }[] = [],
    minPrice: number = null,
    maxPrice: number = null
  ) {
    let queryParams = `?type=${type}`;
    if (query) {
      queryParams += `&query=${query}`;
    }
    if (categoryId) {
      queryParams += `&categoryId=${categoryId}`;
    }
    if (facets && facets.length) {
      const filterValue = facets.map((f) => `${f.key}:${f.value}`).join('|');
      queryParams += `&filters=${filterValue}`;
    }
    if (minPrice) {
      queryParams += `&minPrice=${minPrice}`;
    }
    if (maxPrice) {
      queryParams += `&maxPrice=${maxPrice}`;
    }
    return this.httpClient.get<IPaginatedResponse<IListing>>(
      `${this.base}api/v${this.version}/Search/Listings${queryParams}`
    );
  }

  getListingSearchFacets(
    type: ListingType,
    query: string,
    categoryId: string = null
  ) {
    let queryParams = `?type=${type}`;
    if (query) {
      queryParams += `&query=${query}`;
    }
    if (query) {
      categoryId += `&categoryId=${categoryId}`;
    }

    return this.httpClient.get<ISearchFacet[]>(
      `${this.base}api/v${this.version}/Search/Listings/Facets${queryParams}`
    );
  }

  getMaxPrice(type: ListingType) {
    return this.httpClient.get<number>(
      `${this.base}api/v${this.version}/Search/Listings/MaxPrice?type=${type}`
    );
  }
}
