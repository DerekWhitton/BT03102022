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
  loadCategories(parentId: string = null) {
    const query = parentId ? `?parentId=${parentId}` : '';

    return this.httpClient.get<ICategory[]>(
      `${this.base}api/v${this.version}/Categories${query}`
    );
  }

  loadCategoryProperties(categoryId: string) {
    return this.httpClient.get<ICategoryProperty[]>(
      `${this.base}api/v${this.version}/Categories/${categoryId}/properties`
    );
  }
}
