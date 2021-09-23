import { Image } from './../listings/i-listing';
export interface IUser {
  id: string;
  firstName: string;
  surname: string;
  roles: [];
  sellers: any[];
  createdAt: any;
  updatedAt: any;
  profilePicture?: Image;

  age: number;
  bio: string;
  countriesvisited: string;
  gender: string;
  location: string;
  occupation: string;
}
