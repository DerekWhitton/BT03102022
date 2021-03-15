import {
  Component,
  EventEmitter,
  Input,
  OnInit,
  Output,
  ViewChild,
} from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import {
  CategoryPropertyType,
  ICategory,
  ICategoryProperty,
} from '@bushtrade/administration-portal/shared/entites';
import { CategoriesService } from '@bushtrade/administration-portal/shared/services';
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
  @Output() switchCategoriesOrder = new EventEmitter();
  @ViewChild('categoryIconUpload') categoryIconUpload: any;
  @ViewChild('categoryBannerUpload') categoryBannerUpload: any;

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

  CategoryPropertyType = CategoryPropertyType;

  categoryPropertyTypeOptions: {
    label: string;
    value: CategoryPropertyType;
  }[] = [
    { label: 'Text', value: CategoryPropertyType.Text },
    { label: 'Numeric', value: CategoryPropertyType.Numeric },
    { label: 'Option Selection', value: CategoryPropertyType.SingleSelect },
  ];
  categoryProperties: object[];
  isUploadingImageFiles: boolean;
  maxOrderIndex: number;

  categoryForm: FormGroup;
  addPropertyFormGroup: FormGroup;

  constructor(
    private store: Store,
    private confirmationService: ConfirmationService,
    private categorySvc: CategoriesService
  ) {}

  ngOnInit(): void {
    this.initializeCategoryForm();
    this.initializeCategoryProperyForm();
    this.parentCategoryId = '';
    this.maxOrderIndex = Math.max(...this.categories.map(c => c.orderIndex));
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
    let property = this.addPropertyFormGroup.value;
    if (!property.options || typeof property.options === typeof '') {
      property.options = [];
    }

    this.categoryProperties.push(property);
    this.initializeCategoryProperyForm();
  }

  discardCategoryProperty(name) {
    this.categoryProperties = this.categoryProperties.filter(
      (prop) => prop['name'] != name
    );
  }

  saveCategory() {
    this.categoryForm.patchValue({
      parentId: this.parentCategoryId != '' ? this.parentCategoryId : null,
      properties: this.categoryProperties,
    });

    let category = this.categoryForm.value as ICategory;
    category.properties = this.categoryProperties as ICategoryProperty[];

    if (category?.id) {
      this.store.dispatch(
        updateCategory({
          category: category,
          categoryId: category.id,
          parent: this.parentCategoryId != '' ? false : true,
        })
      );
    } else {
      this.store.dispatch(
        createCategory({
          category: category,
          parent: this.parentCategoryId != '' ? false : true,
        })
      );
    }

    this.initializeCategoryForm();
    this.displayCreateDialog = false;
  }

  deleteCategory(categoryId: string) {
    this.confirmationService.confirm({
      message:
        'Deleting this category will delete all subcategories and information relating to it. Are you sure you would like to proceed?',
      accept: () => {
        this.store.dispatch(
          deleteCategory({
            categoryId: categoryId,
          })
        );
      },
    });
  }

  async handleCategoryUpdateSelection(categoryId: string) {
    const category = await this.categorySvc
      .getCategoryDetails(categoryId)
      .toPromise();

    this.initializeCategoryForm(category);
    this.displayCreateDialog = true;
  }

  initializeCategoryCreation() {
    this.initializeCategoryForm();
    this.displayCreateDialog = true;
  }

  async uploadCategoryImage(event, isBanner: boolean) {
    const file = event.files[0];

    this.isUploadingImageFiles = true;
    if (isBanner) {
      this.categoryBannerUpload.clear();
    } else {
      this.categoryIconUpload.clear();
    }

    await this.categorySvc
      .uploadCategoryImage(file)
      .subscribe((res) => {
        if (isBanner)
          this.categoryForm.controls.categoryBannerUri.setValue(res.imageUri);
        else this.categoryForm.controls.categoryIconUri.setValue(res.imageUri);
      });

    this.isUploadingImageFiles = false;
  }

  removeCategoryIcon() {
    this.categoryForm.controls.categoryIconUri.setValue(null);
  }

  removeCategoryBanner() {
    this.categoryForm.controls.categoryBannerUri.setValue(null);
  }

  moveCategoryUp(category) {
    var index = this.categories.indexOf(category);
    var categoryAbove = this.categories[index-1];
    this.switchCategoriesOrder.emit([category.id, categoryAbove.id]);
  }

  moveCategoryDown(category) {
    var index = this.categories.indexOf(category);
    var categoryBelow = this.categories[index+1];
    this.switchCategoriesOrder.emit([category.id, categoryBelow.id]);
  }

  private initializeCategoryForm(category: ICategory = null) {
    this.categoryForm = new FormGroup({
      id: new FormControl(category?.id ?? null),
      parentId: new FormControl(category?.parentId ?? ''),
      name: new FormControl(category?.name ?? '', Validators.required),
      isActive: new FormControl(
        category?.isActive ?? false,
        Validators.required
      ),
      isFeatured: new FormControl(category?.isFeatured ?? false, Validators.required),
      successFee: new FormControl(category?.successFee ?? null, [Validators.min(0), Validators.max(100)]),
      maximumFee: new FormControl(category?.maximumFee ?? null),
      categoryIconUri: new FormControl(category?.categoryIconUri),
      categoryBannerUri: new FormControl(category?.categoryBannerUri),
    });
    this.categoryProperties = category ? category.properties : [];
  }

  private initializeCategoryProperyForm() {
    this.addPropertyFormGroup = new FormGroup({
      name: new FormControl('', Validators.required),
      type: new FormControl('', Validators.required),
      required: new FormControl(false, Validators.required),
      options: new FormControl('', Validators.required),
    });
  }
}
