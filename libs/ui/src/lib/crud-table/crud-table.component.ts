import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { ConfirmationService } from 'primeng/api';

@Component({
  selector: 'bushtrade-web-crud-table',
  templateUrl: './crud-table.component.html',
  styleUrls: ['./crud-table.component.scss'],
})
export class CrudTableComponent implements OnInit {
  @Input() updateFormTemplateReference;
  @Input() allowDelete = false;
  @Input() viewable = false;
  @Input() searchable = true;
  @Input() data;
  @Input() selectableColumns;
  @Input() loading = true;
  @Input() queryParam = '';
  @Input() nextPage: number = undefined;
  @Input() modalWidth: string = '450px';

  @Output() createSubmit = new EventEmitter();
  @Output() updateSubmit = new EventEmitter();
  @Output() createSelection = new EventEmitter();
  @Output() updateSelection = new EventEmitter();
  @Output() viewSelection = new EventEmitter();
  @Output() itemDeleted = new EventEmitter();

  @Output() queryChanged: EventEmitter<string> = new EventEmitter();
  @Output() nextPageClicked: EventEmitter<boolean> = new EventEmitter();
  @Input() headersValue;
  @Input() createFormTemplateReference;
  @Input() createFormValid = true;

  _selectedColumns: any[];
  displayCreateDialog = false;
  displayUpdateDialog = false;

  constructor(private confirmationService: ConfirmationService) {}

  ngOnInit() {
    this.selectedColumns = this.selectableColumns;
    if (!this.queryParam) {
      this.queryParam = '';
    }
    this.displayCreateDialog = false;
    this.displayUpdateDialog = false;
  }

  @Input() get selectedColumns(): any[] {
    return this._selectedColumns;
  }

  set selectedColumns(val: any[]) {
    this._selectedColumns = this.selectableColumns.filter((col) =>
      val.includes(col)
    );
  }

  searchUpdated(ev) {
    this.queryChanged.emit(ev.target.value);
  }

  loadNextPage() {
    this.nextPageClicked.emit(true);
  }

  handleItemUpdateSelection(data: Object) {
    this.updateSelection.emit(data);
    this.displayUpdateDialog = true;
  }

  handleCreateSelection() {
    this.displayCreateDialog = true;
    this.createSelection.emit();
  }

  handleItemView(data: any) {
    this.viewSelection.emit(data);
  }

  createItem() {
    this.createSubmit.emit();
    this.displayCreateDialog = false;
  }

  updateItem() {
    this.updateSubmit.emit();
    this.displayUpdateDialog = false;
  }

  deleteItem(data) {
    this.confirmationService.confirm({
      message: 'Are you sure you want to delete the selected item?',
      header: 'Confirm',
      icon: 'pi pi-exclamation-triangle',
      accept: () => {
        this.itemDeleted.emit(data);
      },
    });
  }
}
