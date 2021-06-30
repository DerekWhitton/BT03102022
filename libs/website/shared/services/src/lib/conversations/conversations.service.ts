import { HttpClient } from '@angular/common/http';
import { Inject, Injectable } from '@angular/core';
import { APP_CONFIG } from '@bushtrade/app-config';
import {
  IConversationMessage,
  ICreatePurchaseMessage,
  IConversation,
  IPurchaseConversation,
  ISellerListingConversation,
  ICreateListingQuestion,
  ICreateListingAnswer,
  ISellerListingConversationMessage,
} from '@bushtrade/website/shared/entites';

@Injectable({
  providedIn: 'root',
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

  loadPurchaseConversation(conversationId: string, isSellerUser: boolean) {
    return this.httpClient.get<IConversation>(
      `${this.base}api/v${this.version}/Conversations/PurchaseConversation/${conversationId}?isSellerConversation=${isSellerUser}`
    );
  }

  loadConversationMessages(
    conversationId: string,
    skip: number,
    perPage: number
  ) {
    return this.httpClient.get<IConversationMessage[]>(
      `${this.base}api/v${this.version}/Conversations/Messages/${conversationId}?skip=${skip}&perPage=${perPage}`
    );
  }

  addPurchaseMessage(
    purchaseMessage: ICreatePurchaseMessage,
    sellerId: string = null
  ) {
    var queryParam = '';
    if (sellerId) {
      queryParam = `/${sellerId}`;
    }
    return this.httpClient.post<IConversationMessage>(
      `${this.base}api/v${this.version}/Conversations/AddPurchaseMessage${queryParam}`,
      {
        ...purchaseMessage,
      }
    );
  }

  // (Q&A) Get the conversation for a listing (returns a conversationid)
  loadListingConversation(listingId: string) {
    // Retrieve the reference to the conversation
    return this.httpClient.get<ISellerListingConversation>(
      `${this.base}api/v${this.version}/Conversations/ListingConversation/${listingId}`
    );
  }

  // (Q&A) Ask a new question
  addListingQuestion(question: ICreateListingQuestion) {
    return this.httpClient.post<IConversationMessage>(
      `${this.base}api/v${this.version}/Conversations/AddListingQuestion`,
      {
        ...question,
      }
    );
  }

  // (Q&A) Answer a question
  addListingAnswer(sellerId: string, answer: ICreateListingAnswer) {
    return this.httpClient.post<ISellerListingConversationMessage>(
      `${this.base}api/v${this.version}/Conversations/AddListingQuestionResponse/${sellerId}`,
      {
        ...answer,
      }
    );
  }
}
