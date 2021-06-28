import { HttpClient } from '@angular/common/http';
import { Inject, Injectable } from '@angular/core';
import { IPaginatedResponse, ITransaction, SortOrder, TransactionSortField, TransactionType } from '@bushtrade/administration-portal/shared/entites';
import { APP_CONFIG } from '@bushtrade/app-config';

@Injectable({
  providedIn: 'root',
})
export class TransactionsService {
  private base: string;
  private version: string;

  constructor(
    @Inject(APP_CONFIG) private configuration: any,
    private httpClient: HttpClient
  ) {
    this.base = configuration.apiRoute;
    this.version = configuration.apiVersion;
  }

  searchTransactions (
    page: number = 1,
    perPage: number = 25,
    sortField: TransactionSortField = TransactionSortField.CreatedDate,
    sortOrder: SortOrder = SortOrder.Descending,
    type: TransactionType = null,
    startDate: string = null,
    endDate: string = null
  ) {
    let queryParams = `?page=${page}&perPage=${perPage}`;
    if ((sortField || sortField == 0) && (sortOrder || sortOrder == 0)) {
      queryParams += `&sortField=${sortField}&sortOrder=${sortOrder}`;
    }
    if (type || type == 0) {
      queryParams += `&type=${type}`;
    }
    if (startDate != null) {
      queryParams += `&startDate=${startDate}`;
    }
    if (endDate) {
      queryParams += `&endDate=${endDate}`;
    }
    return this.httpClient.get<IPaginatedResponse<ITransaction>>(
      `${this.base}api/v${this.version}/Transactions/GetTransactions${queryParams}`
    );
  }
}
