export interface ICategory {
  id: string;
  name: string;
  parentId: string;
  children: ICategory[];
  properties: ICategoryProperty[];
  isActive: boolean;
}

export interface ICategoryProperty {
  name: string;
  type: number;
  required: boolean;
  options: string[];
}

export enum CategoryPropertyType {
  Text,
  Numeric,
  SingleSelect,
}
