import { HttpClient } from '@angular/common/http';
import { Inject, Injectable } from '@angular/core';
import { APP_CONFIG } from '@bushtrade/app-config';
import { IListingReviews, IReview, ISellerReviewRequest } from '@bushtrade/website/shared/entites';

@Injectable({
  providedIn: 'root',
})
export class ReviewsService {
  private base: string;
  private version: string;

  constructor(
    @Inject(APP_CONFIG) private configuration: any,
    private httpClient: HttpClient
  ) {
    this.base = configuration.apiRoute;
    this.version = configuration.apiVersion;
  }

  getListingReviews(listingId: string) {
    return this.httpClient.get<IListingReviews>(
      `${this.base}api/v${this.version}/Review/ListingReviews/${listingId}`
    );
  }

  reviewSeller(reviewRequest: ISellerReviewRequest) {
    return this.httpClient.post<IReview>(
      `${this.base}api/v${this.version}/Review/ReviewSeller/`,
      {
        ...reviewRequest,
      }
    );
  }
}
