import { HttpClient } from '@angular/common/http';
import { Inject, Injectable } from '@angular/core';
import { APP_CONFIG } from '@bushtrade/app-config';
import {
  ICategory,
  ICategoryProperty,
} from '@bushtrade/website/shared/entites';

@Injectable({
  providedIn: 'root',
})
export class CategoryService {
  private base: string;
  private version: string;
  constructor(
    @Inject(APP_CONFIG) private configuration: any,
    private httpClient: HttpClient
  ) {
    this.base = configuration.apiRoute;
    this.version = configuration.apiVersion;
  }

  loadCategories(parentId: string = null, onlyActive: boolean = false) {
    let queries = [];
    if (parentId) {
      queries.push(`parentId=${parentId}`);
    }
    if (onlyActive) {
      queries.push(`onlyActive=${onlyActive}`);
    }
    let queryString = '';
    if (queries.length > 0) {
      queryString = `?${queries.join('&')}`;
    }

    return this.httpClient.get<ICategory[]>(
      `${this.base}api/v${this.version}/Categories${queryString}`
    );
  }

  loadFeaturedCategories(limitNumber: number) {
    return this.httpClient.get<ICategory[]>(
      `${this.base}api/v${this.version}/Categories/Featured?limitNumber=${limitNumber}`
    );
  }

  getCategoryById(id: string = null) {
    return this.httpClient.get<ICategory>(
      `${this.base}api/v${this.version}/Categories/${id}`
    );
  }

  loadCategoryProperties(categoryId: string) {
    return this.httpClient.get<ICategoryProperty[]>(
      `${this.base}api/v${this.version}/Categories/${categoryId}/properties`
    );
  }
}
