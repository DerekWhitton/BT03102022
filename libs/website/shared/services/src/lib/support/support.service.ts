import { HttpClient } from '@angular/common/http';
import { Inject, Injectable } from '@angular/core';
import { APP_CONFIG } from '@bushtrade/app-config';
import {
  ICreateSupportTicket,
  ICreateSupportTicketMessage,
  IPaginatedResponse,
  ISupportTicket,
  ISupportTicketMessage,
  SupportTicketCategory,
} from '@bushtrade/website/shared/entites';

@Injectable({
  providedIn: 'root',
})
export class SupportService {
  private base: string;
  private version: string;
  constructor(
    @Inject(APP_CONFIG) private configuration: any,
    private httpClient: HttpClient
  ) {
    this.base = configuration.apiRoute;
    this.version = configuration.apiVersion;
  }

  searchUserTickets(
    page: number,
    perPage: number,
    query: string,
    category: SupportTicketCategory,
    includeClosed: boolean = false
  ) {
    let queryParams = `?page=${page}&perPage=${perPage}`;
    if (query) {
      queryParams += `&query=${query}`;
    }
    if (category != null && !isNaN(category)) {
      queryParams += `&category=${category}`;
    }
    if (includeClosed) {
      queryParams += `&includeClosed=${includeClosed}`;
    }
    return this.httpClient.get<IPaginatedResponse<ISupportTicket>>(
      `${this.base}api/v${this.version}/Support/UserTickets${queryParams}`
    );
  }

  getSupportTicketDetails(ticketId: string) {
    return this.httpClient.get<ISupportTicket>(
      `${this.base}api/v${this.version}/Support/Ticket/${ticketId}`
    );
  }

  addSupportTicket(supportTicket: ICreateSupportTicket) {
    return this.httpClient.post<ISupportTicket>(
      `${this.base}api/v${this.version}/Support/Ticket`,
      {
        ...supportTicket,
      }
    );
  }

  addSupportTicketMessage(supportTicketMessage: ICreateSupportTicketMessage) {
    return this.httpClient.post<ISupportTicketMessage>(
      `${this.base}api/v${this.version}/Support/Ticket/Message`,
      {
        ...supportTicketMessage,
      }
    );
  }
}
