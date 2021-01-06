export interface ICategory {
  id: string;
  name: string;
  children: ICategory[];
}

export interface ICategoryProperty {
  id: string;
  name: string;
  type: CategoryPropertyType;
  required: boolean;
  options: string[];
}

export enum CategoryPropertyType {
  Text,
  Numeric,
  SingleSelect,
}
