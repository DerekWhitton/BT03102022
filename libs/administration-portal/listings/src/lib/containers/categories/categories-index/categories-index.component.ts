import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { Store } from '@ngrx/store';
import { Observable } from 'rxjs';
import {
  loadCategories,
  loadCategoryDetails,
  switchCategoriesOrder,
} from '../../../+state/categories/categories.actions';
import {
  getAllCategories,
  getCategoriesLoaded,
  getNextPage,
  getQuery,
} from '../../../+state/categories/categories.selectors';

@Component({
  selector: 'bushtrade-administration-categories-index',
  templateUrl: './categories-index.component.html',
  styleUrls: ['./categories-index.component.scss'],
})
export class CategoriesIndexComponent implements OnInit {
  categories$: Observable<any>;
  isSub: boolean = false;
  cols: any[];
  loaded: boolean = false;
  subLoaded: boolean = false;
  queryParam$: Observable<string>;
  nextPage$: Observable<number>;
  displayCreateDialog: boolean = false;
  displayAddLocaleDialog: boolean = false;

  localeTypes: any[];
  localAddId: string;

  constructor(private store: Store, private router: Router) {}

  ngOnInit(): void {
    this.store.dispatch(loadCategories());
    this.categories$ = this.store.select(getAllCategories);
    var ctx = this;
    this.store.select(getCategoriesLoaded).subscribe({
      next(res) {
        if (res == true) {
          ctx.loaded = true;
          ctx.subLoaded = true;
        }
      },
    });
    this.queryParam$ = this.store.select(getQuery);
    this.nextPage$ = this.store.select(getNextPage);

    this.cols = [{ field: 'name', header: 'Name' }];
    this.isSub = false;
  }

  handleGoDeeper(data) {
    this.subLoaded = false;
    var ctx = this;
    this.store.dispatch(
      loadCategoryDetails({ categoryId: data.id, parent: false })
    );
    this.categories$ = this.store.select(getAllCategories);
    this.store.select(getCategoriesLoaded).subscribe({
      next(res) {
        if (res == true) {
          ctx.subLoaded = true;
          ctx.isSub = true;
        }
      },
    });
  }

  hanldeJumpChain(id) {
    var ctx = this;
    this.subLoaded = false;
    if (id == null) {
      this.store.dispatch(loadCategories());
      this.categories$ = this.store.select(getAllCategories);
      this.store.select(getCategoriesLoaded).subscribe({
        next(res) {
          if (res == true) {
            ctx.subLoaded = true;
            ctx.isSub = false;
          }
        },
      });
    } else {
      this.store.dispatch(
        loadCategoryDetails({ categoryId: id, parent: false })
      );
      this.categories$ = this.store.select(getAllCategories);
      this.store.select(getCategoriesLoaded).subscribe({
        next(res) {
          if (res == true) {
            ctx.subLoaded = true;
            ctx.isSub = true;
          }
        },
      });
    }
  }

  switchCategoriesOrder(categoryIds)
  {
    var firstCategoryId = categoryIds[0];
    var secondCategoryId = categoryIds[1];
    this.store.dispatch(
      switchCategoriesOrder({firstCategoryId, secondCategoryId})
    );
  }
}
