import { Inject, Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { APP_CONFIG } from '@bushtrade/app-config';
import {
  IRole,
  IUser,
  IUsers,
} from '@bushtrade/administration-portal/shared/entites';
@Injectable({
  providedIn: 'root',
})
export class UsersService {
  private base: string;
  private version: string;
  constructor(
    @Inject(APP_CONFIG) private configuration: any,
    private httpClient: HttpClient
  ) {
    this.base = configuration.apiRoute;
    this.version = configuration.apiVersion;
  }

  listUsers(query: string = '', skipToken: string = '') {
    return this.httpClient.get<IUsers>(
      `${this.base}api/v${this.version}/Users`,
      {
        params: { query, skipToken },
      }
    );
  }

  loadUserDetails(id: string) {
    return this.httpClient.get<IUser>(
      `${this.base}api/v${this.version}/Users/${id}`
    );
  }

  addRoleUser(role: IRole, userId: string) {
    return this.httpClient.post<IUser>(
      `${this.base}api/v${this.version}/Users/${userId}/roles`,
      {
        roleId: role.id,
      }
    );
  }

  removeRoleUser(roleId: string, userId: string) {
    return this.httpClient.delete<IUser>(
      `${this.base}api/v${this.version}/Users/${userId}/roles/${roleId}`
    );
  }
}
