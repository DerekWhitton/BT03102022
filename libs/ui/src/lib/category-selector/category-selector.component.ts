import {
  Component,
  EventEmitter,
  Input,
  OnInit,
  Output,
  SimpleChanges,
} from '@angular/core';
import { ICategory } from '@bushtrade/website/shared/entites';
@Component({
  selector: 'bushtrade-category-selector',
  templateUrl: './category-selector.component.html',
  styleUrls: ['./category-selector.component.scss'],
})
export class CategorySelectorComponent implements OnInit {
  @Input() categoryTree: ICategory[];
  @Input() loading: boolean = false;
  @Input() selectedCategoryId: string = null;
  @Output() categorySelected = new EventEmitter<string>();
  @Output() chainComplete = new EventEmitter<boolean>();

  selectedPath: ICategory[] = [];
  selectedCategoryOption: string = null;
  categoryOptions: { label: string; value: string }[];
  isChainComplete: boolean = false;

  constructor() {}

  ngOnInit(): void {}

  ngOnChanges(changes: SimpleChanges) {
    this.setSelectionOptions();
    console.log(changes);
  }

  private setSelectionOptions(): void {
    if (!this.categoryTree.length || this.loading) {
      return;
    }

    if (this.selectedPath.length <= 0 && this.selectedCategoryId) {
      this.reconstructSelectedPath(this.selectedCategoryId);
      this.selectedCategoryOption = this.selectedCategoryId;
    }

    if (this.selectedPath.length <= 0) {
      this.categoryOptions = [{ label: 'Select Category', value: null }].concat(
        this.categoryTree.map((c) => ({
          label: c.name,
          value: c.id,
        }))
      );
      this.isChainComplete = false;
    } else {
      const subCategoryOptions = this.getCategoryFromTreeById(
        this.selectedCategoryOption
      )?.children.map((c) => ({
        label: c.name,
        value: c.id,
      }));

      if (subCategoryOptions) {
        this.categoryOptions = [
          { label: 'Select Subcategory', value: null },
        ].concat(subCategoryOptions);
      }
      this.isChainComplete =
        subCategoryOptions && subCategoryOptions.length <= 0 && !this.loading;
    }
    this.chainComplete.emit(this.isChainComplete);
  }

  handleCategorySelectionChange() {
    if (!this.selectedCategoryOption) {
      return;
    }

    this.categorySelected.emit(this.selectedCategoryOption);
    this.selectedPath = [...this.selectedPath].concat([
      this.getCategoryFromTreeById(this.selectedCategoryOption),
    ]);

    this.setSelectionOptions();
  }

  private reconstructSelectedPath(categoryId: string) {
    let category = this.getCategoryFromTreeById(categoryId);
    let path = [category];
    while (
      category.parentId &&
      category.parentId != '00000000-0000-0000-0000-000000000000'
    ) {
      category = this.getCategoryFromTreeById(category.parentId);
      path = [category].concat(path);
    }

    this.selectedPath = path;
  }

  private getFlatCategoryList(tree: ICategory[]) {
    return tree.reduce((acc, cat) => {
      if (!cat.children?.length) {
        acc.push(cat);
      } else {
        acc = acc.concat(cat).concat(this.getFlatCategoryList(cat.children));
      }
      return acc;
    }, []);
  }

  private getCategoryFromTreeById(id: string): ICategory {
    return this.getFlatCategoryList(this.categoryTree).filter(
      (x) => x.id === id
    )[0];
  }

  returnToNode(id: string) {
    const index = this.selectedPath.findIndex((p) => p.id == id);

    if (index === -1) {
      return;
    }

    this.selectedPath = this.selectedPath.splice(0, index);
    this.selectedCategoryOption = this.selectedPath.length
      ? this.selectedPath[index - 1].id
      : null;
    //this.selectedCategoryId = this.selectedCategoryOption;

    this.setSelectionOptions();
  }
}
