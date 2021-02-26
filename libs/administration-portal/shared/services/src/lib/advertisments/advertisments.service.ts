import { IDashboardAdvertisment } from './../../../../entities/src/lib/advertisments/i-dashboard-advertisment';
import { HttpClient, HttpResponse } from '@angular/common/http';
import { Inject, Injectable } from '@angular/core';
import { IAdvertismentImage, ICreateDashboardAdvertisment, IPaginatedResponse, IUpdateDashboardAdvertisment } from '@bushtrade/administration-portal/shared/entites';
import { APP_CONFIG } from '@bushtrade/app-config';

@Injectable({
  providedIn: 'root'
})
export class AdvertismentsService {
  private base: string;
  private version: string;
  constructor(
    @Inject(APP_CONFIG) private configuration: any,
    private httpClient: HttpClient
  ) {
    this.base = configuration.apiRoute;
    this.version = configuration.apiVersion;
  }

  listDashboardAdvertisments(page: string = '1', query: string = '', perPage: string = '25') {
    return this.httpClient.get<IPaginatedResponse<IDashboardAdvertisment>>(
      `${this.base}api/v${this.version}/Advertisments/dashboard`,
      {
        params: { page, query, perPage },
      }
    );
  }

  loadDashboardAdvertismentDetails(dashboardAdvertismentId: string) {
    return this.httpClient.get<IDashboardAdvertisment>(
      `${this.base}api/v${this.version}/Advertisments/dashboard/${dashboardAdvertismentId}`
    );
  }

  createDashboardAdvertisment(dashboardAdvertisment: ICreateDashboardAdvertisment) {
    return this.httpClient.post<IDashboardAdvertisment>(
      `${this.base}api/v${this.version}/Advertisments/dashboard`,
      {
        ...dashboardAdvertisment,
      }
    );
  }

  updateDashboardAdvertisment(dashboardAdvertisment: IUpdateDashboardAdvertisment) {
    return this.httpClient.patch<IDashboardAdvertisment>(
      `${this.base}api/v${this.version}/Advertisments/dashboard`,
      {
        ...dashboardAdvertisment,
      }
    );
  }

  deleteDashboardAdvertisment(dashboardAdvertismentId: string) {
    return this.httpClient.delete<HttpResponse<any>>(
      `${this.base}api/v${this.version}/Advertisments/dashboard/${dashboardAdvertismentId}`
    );
  }

  uploadAdvertismentImage(file: File) {
    const formData = new FormData();
    formData.append('file', file, file.name);
    return this.httpClient.post<IAdvertismentImage>(
      `${this.base}api/v${this.version}/Advertisments/UploadAdvertismentImage`,
      formData
    )
  }
}
