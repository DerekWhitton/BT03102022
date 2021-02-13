import { HttpClient, HttpHeaders, HttpResponse } from '@angular/common/http';
import { Inject, Injectable } from '@angular/core';
import { ICategory, ICategoryImage } from '@bushtrade/administration-portal/shared/entites';
import { APP_CONFIG } from '@bushtrade/app-config';

@Injectable({
  providedIn: 'root',
})
export class CategoriesService {
  private base: string;
  private version: string;
  constructor(
    @Inject(APP_CONFIG) private configuration: any,
    private httpClient: HttpClient
  ) {
    this.base = configuration.apiRoute;
    this.version = configuration.apiVersion;
  }

  listCategories(
    page: string = '1',
    query: string = '',
    perPage: string = '25'
  ) {
    return this.httpClient.get<ICategory[]>(
      `${this.base}api/v${this.version}/Categories`,
      {
        params: { page, perPage, query },
      }
    );
  }

  getCategoryDetails(id: string) {
    return this.httpClient.get<ICategory>(
      `${this.base}api/v${this.version}/Categories/${id}`
    );
  }

  createCategory(category: any) {
    return this.httpClient.post<ICategory>(
      
      `${this.base}api/v${this.version}/Categories`,
      {
        ...category,
      }
    );
  }

  updateCategory(category: any, categoryId: string) {
    return this.httpClient.put<ICategory>(
      `${this.base}api/v${this.version}/Categories/${categoryId}`,
      {
        ...category,
      }
    );
  }

  deleteCategory(categoryId: string) {
    return this.httpClient.delete<HttpResponse<any>>(
      `${this.base}api/v${this.version}/Categories/${categoryId}`
    );
  }

  uploadCategoryImage(file: File) {
    const formData = new FormData();
    formData.append('file', file, file.name);
    return this.httpClient.post<ICategoryImage>(
      `${this.base}api/v${this.version}/Categories/UploadCategoryImage`,
      formData
    )
  }
}
