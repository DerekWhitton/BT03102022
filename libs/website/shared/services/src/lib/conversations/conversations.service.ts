import { HttpClient } from '@angular/common/http';
import { Inject, Injectable } from '@angular/core';
import { APP_CONFIG } from '@bushtrade/app-config';
import { IConversationMessage, ICreatePurchaseMessage, IConversation, IPurchaseConversation } from '@bushtrade/website/shared/entites';

@Injectable({
  providedIn: 'root'
})
export class ConversationsService {
  private base: string;
  private version: string;
  constructor(
    @Inject(APP_CONFIG) private configuration: any,
    private httpClient: HttpClient
  ) {
    this.base = configuration.apiRoute;
    this.version = configuration.apiVersion;
  }

  loadListingConversations(listingId: string, sellerId: string) {
    return this.httpClient.get<IPurchaseConversation[]>(
      `${this.base}api/v${this.version}/Conversations/PurchaseConversations/${listingId}/seller/${sellerId}`
    );
  }

  loadPurchaseConversation(conversationId: string) {
    return this.httpClient.get<IConversation>(
      `${this.base}api/v${this.version}/Conversations/PurchaseConversation/${conversationId}`
    );
  }

  loadConversationMessages(conversationId: string, skip: number, perPage: number) {
    return this.httpClient.get<IConversationMessage[]>(
      `${this.base}api/v${this.version}/Conversations/Messages/${conversationId}?skip=${skip}&perPage=${perPage}`
    );
  }

  addPurchaseMessage(purchaseMessage: ICreatePurchaseMessage, sellerId: string = null,) {
    var queryParam = '';
    if (sellerId) {
      queryParam = `/${sellerId}`
    }
    return this.httpClient.post<IConversationMessage>(
      `${this.base}api/v${this.version}/Conversations/AddPurchaseMessage${queryParam}`,
      {
        ...purchaseMessage
      }
    );
  }
}
