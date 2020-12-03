import { HttpClient } from '@angular/common/http';
import { Inject, Injectable } from '@angular/core';
import {
  IPaginatedResponse,
  IRole,
} from '@bushtrade/administration-portal/shared/entites';
import { APP_CONFIG } from '@bushtrade/app-config';

@Injectable({
  providedIn: 'root',
})
export class RolesService {
  private base: string;
  private version: string;
  constructor(
    @Inject(APP_CONFIG) private configuration: any,
    private httpClient: HttpClient
  ) {
    this.base = configuration.apiRoute;
    this.version = configuration.apiVersion;
  }

  listRoles(page: string = '1', query: string = '', perPage: string = '25') {
    return this.httpClient.get<IPaginatedResponse<IRole>>(
      `${this.base}api/v${this.version}/Roles`,
      {
        params: { page, query, perPage },
      }
    );
  }
}
