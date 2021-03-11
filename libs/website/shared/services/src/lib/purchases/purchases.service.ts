import { HttpClient } from '@angular/common/http';
import { Inject, Injectable } from '@angular/core';
import { APP_CONFIG } from '@bushtrade/app-config';
import {
  IPaginatedResponse,
  IPaymentDetails,
  IPurchase,
  IPurchaseConversation,
} from '@bushtrade/website/shared/entites';

@Injectable({
  providedIn: 'root',
})
export class PurchasesService {
  private base: string;
  private version: string;
  constructor(
    @Inject(APP_CONFIG) private configuration: any,
    private httpClient: HttpClient
  ) {
    this.base = configuration.apiRoute;
    this.version = configuration.apiVersion;
  }

  getPurchases(page: number | null = 1, perPage: number | null = 25) {
    let params = [
      page ? `page=${page}` : null,
      perPage ? `page=${perPage}` : null,
    ]
      .filter((p) => p != null)
      .join('&');
    params = params ? `?${params}` : '';

    return this.httpClient.get<IPaginatedResponse<IPurchase>>(
      `${this.base}api/v${this.version}/Purchases${params}`
    );
  }

  getPaymentDetails(id: string) {
    return this.httpClient.get<IPaymentDetails>(
      `${this.base}api/v${this.version}/Purchases/${id}/PaymentDetails`
    );
  }

  markPurchaseAsCompleted(sellerId: string, purchaseId: string) {
    return this.httpClient.post<IPurchaseConversation>(
      `${this.base}api/v${this.version}/Purchases/MarkPurchaseAsCompleted/${sellerId}`,
      {
        purchaseId: purchaseId
      }
    );
  }

  cancelPurchase(id: string) {
    return this.httpClient.delete(
      `${this.base}api/v${this.version}/Purchases/CancelPurchase/${id}`
    );
  }
}
