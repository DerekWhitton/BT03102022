import { HttpClient } from '@angular/common/http';
import { Inject, Injectable } from '@angular/core';
import { ICreateSupportTicketMessage, IPaginatedResponse, ISupportTicket, ISupportTicketMessage, SupportTicketCategory } from '@bushtrade/administration-portal/shared/entites';
import { APP_CONFIG } from '@bushtrade/app-config';

@Injectable({
  providedIn: 'root'
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
      `${this.base}api/v${this.version}/Support/Tickets${queryParams}`
    );
  }

  getSupportTicketDetails(ticketId: string) {
    return this.httpClient.get<ISupportTicket>(
      `${this.base}api/v${this.version}/Support/Ticket/${ticketId}`
    );
  }

  addSupportTicketMessage(supportTicketMessage: ICreateSupportTicketMessage) {
    return this.httpClient.post<ISupportTicketMessage>(
      `${this.base}api/v${this.version}/Support/Ticket/AdminMessage`,
      {
        ...supportTicketMessage,
      }
    );
  }

  closeSupportTicket(ticketId: string) {
    return this.httpClient.post<ISupportTicket>(
      `${this.base}api/v${this.version}/Support/CloseTicket`, 
      {
        ticketId
      }
    );
  }
}
