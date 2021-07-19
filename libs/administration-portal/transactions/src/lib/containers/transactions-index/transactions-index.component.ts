import { TransactionsService } from './../../../../../shared/services/src/lib/transactions/transactions.service';
import { Component, OnInit } from '@angular/core';
import {
  ITransaction,
  PackageType,
  PaymentStatus,
  SortOrder,
  TransactionSortField,
  TransactionType,
} from '@bushtrade/administration-portal/shared/entites';
import { MessageService } from 'primeng/api';

@Component({
  selector: 'bushtrade-administration-transactions-index',
  templateUrl: './transactions-index.component.html',
  styleUrls: ['./transactions-index.component.scss'],
})
export class TransactionsIndexComponent implements OnInit {
  transactionType = TransactionType;
  paymentStatus = PaymentStatus;
  packageTypes = PackageType;

  loading = false;
  transactions: ITransaction[];
  selectableTransactionTypes: any[] = [];
  selectedTransactionType: TransactionType;
  startDate: Date;
  endDate: Date;

  page = 1;
  perPage = 10;
  totalRecords: number;
  sortField: TransactionSortField;
  sortOrder: SortOrder;

  constructor(
    private transactionsService: TransactionsService,
    private messageService: MessageService
  ) {}

  ngOnInit(): void {
    this.selectableTransactionTypes = Object.keys(TransactionType)
      .filter((s) => isNaN(Number(s)))
      .map((s) => {
        return {
          label:
            TransactionType[s] == TransactionType.ListingPayment
              ? 'Auction Fees'
              : 'Premium Packages',
          value: TransactionType[s],
        };
      });
    //this.fetchTransactions();
  }

  loadTransactions(event: any) {
    this.loading = true;
    this.page = event.first == 0 ? 1 : event.rows / event.first + 1;
    this.perPage = event.rows;
    this.sortOrder =
      event.sortOrder == -1 ? SortOrder.Descending : SortOrder.Ascending;
    switch (event.sortField) {
      case 'grossAmount':
        this.sortField = TransactionSortField.GrossAmount;
        break;
      case 'netAmount':
        this.sortField = TransactionSortField.NetAmount;
        break;
      case 'feeAmount':
        this.sortField = TransactionSortField.FeeAmount;
        break;
      case 'createdDate':
        this.sortField = TransactionSortField.CreatedDate;
        break;
    }
    this.fetchTransactions();
  }

  fetchTransactions() {
    this.loading = true;
    this.transactionsService
      .searchTransactions(
        this.page,
        this.perPage,
        this.sortField,
        this.sortOrder,
        this.selectedTransactionType,
        this.startDate?.toISOString(),
        this.endDate?.toISOString()
      )
      .subscribe(
        (results) => {
          this.transactions = results.items;
          this.totalRecords = results.totalItems;
          this.loading = false;
        },
        (error) => {
          this.loading = false;
          this.messageService.add({
            severity: 'error',
            detail: 'There was an error loading your transactions',
          });
        }
      );
  }

  onStartDateSelect(event: any) {}

  onEndDateSelect(event: any) {}

  clearSelectedType() {
    this.selectedTransactionType = null;
    this.fetchTransactions();
  }
}
