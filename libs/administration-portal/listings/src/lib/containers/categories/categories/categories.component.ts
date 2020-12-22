import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { ICategory } from '@bushtrade/administration-portal/shared/entites';
import { Store } from '@ngrx/store';
import { ConfirmationService } from 'primeng/api';
import {
  createCategory,
  deleteCategory,
  updateCategory,
} from '../../../+state/categories/categories.actions';

@Component({
  selector: 'bushtrade-administration-categories',
  templateUrl: './categories.component.html',
  styleUrls: ['./categories.component.scss'],
})
export class CategoriesComponent implements OnInit {
  @Input() categories;
  @Input() sub;
  @Input() loaded;
  @Output() goDeeper = new EventEmitter();
  @Output() jumpChain = new EventEmitter();

  categoryChain: Array<any> = [
    {
      id: null,
      name: 'All',
    },
  ];

  displayCreateDialog: boolean = false;

  curentItemLocalMetadata: any;
  displayAddLocaleDialog: boolean = false;

  parentCategoryId: string = '';

  categoryProperties: object[];

  createFormGroup: FormGroup = new FormGroup({
    parentId: new FormControl(''),
    name: new FormControl('', Validators.required),
    isActive: new FormControl(false, Validators.required),
    properties: new FormControl(''),
  });
  addPropertyFormGroup: FormGroup = new FormGroup({
    name: new FormControl('', Validators.required),
    type: new FormControl('', Validators.required),
    required: new FormControl(false, Validators.required),
    options: new FormControl('', Validators.required),
  });
  constructor(
    private store: Store,
    private confirmationService: ConfirmationService
  ) {}

  ngOnInit(): void {
    this.categoryProperties = [];
    this.parentCategoryId = '';
  }

  onGoDeeper(data) {
    this.parentCategoryId = data.id;
    var category = {
      id: data.id,
      name: data.name,
    };
    this.categoryChain.push(category);
    this.goDeeper.emit(data);
  }

  onJumpChain(chainId: string, chainName: string, index: number) {
    if (index != this.categoryChain.length - 1) {
      this.categoryChain.splice(index + 1);
      this.parentCategoryId = chainId;
    }
    this.jumpChain.emit(chainId);
  }

  attachProperty() {
    this.categoryProperties.push(this.addPropertyFormGroup.value);
    this.addPropertyFormGroup.reset();
  }

  discardCategoryProperty(name) {
    this.categoryProperties = this.categoryProperties.filter(
      (prop) => prop['name'] != name
    );
  }

  createCategory() {
    this.createFormGroup.patchValue({
      parentId: this.parentCategoryId != '' ? this.parentCategoryId : null,
      properties: this.categoryProperties,
    });
    console.log(this.createFormGroup.value);
    this.store.dispatch(
      createCategory({
        category: this.createFormGroup.value as ICategory,
        parent: this.parentCategoryId != '' ? false : true,
      })
    );
    this.categoryProperties = [];
    this.createFormGroup.reset();
    this.displayCreateDialog = false;
  }

  deleteCategory(categoryId: string) {
    this.confirmationService.confirm({
      message:
        'Deleting this category will delete all subcategories and information relating to it. Are you sure you like to proceed?',
      accept: () => {
        this.store.dispatch(
          deleteCategory({
            categoryId: categoryId,
          })
        );
      },
    });
  }
}
