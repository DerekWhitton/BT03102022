import { HttpClient } from '@angular/common/http';
import { Inject, Injectable } from '@angular/core';
import { APP_CONFIG } from '@bushtrade/app-config';
import {
  IListing,
  ILocation,
  IPaginatedResponse,
  ISearchFacet,
  ListingSortField,
  ListingType,
  SortOrder,
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
    listingSortField: ListingSortField,
    sortOrder: SortOrder,
    query: string,
    categoryId: string = null,
    facets: { key: string; value: string }[] = [],
    minPrice: number = null,
    maxPrice: number = null,
    userLocation: ILocation = null,
    nrOfKm: number
  ) {
    let queryParams = [];
    let urlQuery = '';
    if (type) {
      queryParams.push(`type=${type}`);
    }
    if (listingSortField != null) {
      queryParams.push(`sortField=${listingSortField}`);
    }
    if (sortOrder != null) {
      queryParams.push(`sortOrder=${sortOrder}`);
    }
    if (query) {
      queryParams.push(`query=${query}`);
    }
    if (categoryId) {
      queryParams.push(`categoryId=${categoryId}`);
    }
    if (facets && facets.length) {
      const filterValue = facets.map((f) => `${f.key}:${f.value}`).join('|');
      queryParams.push(`filters=${filterValue}`);
    }
    if (minPrice) {
      queryParams.push(`minPrice=${minPrice}`);
    }
    if (maxPrice) {
      queryParams.push(`maxPrice=${maxPrice}`);
    }
    if (userLocation && nrOfKm) {
      queryParams.push(`lat=${userLocation.lat}`);
      queryParams.push(`lng=${userLocation.lng}`);
      queryParams.push(`nrOfKm=${nrOfKm}`);
    }
    if (queryParams.length > 0) {
      urlQuery = `?${queryParams.join("&")}`;
    }
    return this.httpClient.get<IPaginatedResponse<IListing>>(
      `${this.base}api/v${this.version}/Search/Listings${urlQuery}`
    );
  }

  getListingSearchFacets(
    type: ListingType,
    query: string,
    categoryId: string = null
  ) {
    let queryParams = [];
    let urlQuery = '';
    if (type) {
      queryParams.push(`type=${type}`);
    }
    if (query) {
      queryParams.push(`query=${query}`);
    }
    if (categoryId) {
      queryParams.push(`categoryId=${categoryId}`);
    }
    if (queryParams.length > 0) {
      urlQuery = `?${queryParams.join("&")}`;
    }
    return this.httpClient.get<ISearchFacet[]>(
      `${this.base}api/v${this.version}/Search/Listings/Facets${urlQuery}`
    );
  }

  getMaxPrice(type: ListingType) {
    const queryParams = type ? `?type=${type}`: '';
    return this.httpClient.get<number>(
      `${this.base}api/v${this.version}/Search/Listings/MaxPrice${queryParams}`
    );
  }

  getSuggestions(type: string = "", query: string) {
    let queryParams = [];
    let urlQuery = '';
    if (type) {
      queryParams.push(`type=${type}`);
    }
    if (query) {
      queryParams.push(`query=${query}`);
    }
    if (queryParams.length > 0) {
      urlQuery = `?${queryParams.join("&")}`;
    }
    return this.httpClient.get<any>(
      `${this.base}api/v${this.version}/Search/Listings/Suggestions${urlQuery}`
    );
  }

}
