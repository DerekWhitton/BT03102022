import { IRole } from './i-role';

export interface IUsers {
  users: IUser[];
  skiptoken: string;
}

export interface IUser {
  id: string;
  firstName: string;
  surname: string;
  roles: IRole[];
  updatedAt: Date;
  createdAt: Date;
}

