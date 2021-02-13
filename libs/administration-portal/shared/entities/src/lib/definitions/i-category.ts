export interface ICategory {
  id: string;
  name: string;
  parentId: string;
  children: ICategory[];
  properties: ICategoryProperty[];
  isActive: boolean;
  isFeatured: boolean;
  categoryIconUri: string;
  categoryBannerUri: string;
}

export interface ICategoryProperty {
  name: string;
  type: number;
  required: boolean;
  options: string[];
}

export interface ICategoryImage {
  imageUri: string;
}

export enum CategoryPropertyType {
  Text,
  Numeric,
  SingleSelect,
}
