export interface IUser {
  id: string;
  firstName: string;
  surname: string;
  roles: [];
  sellers: IUser[];
  createdAt: any;
  updatedAt: any;
}
