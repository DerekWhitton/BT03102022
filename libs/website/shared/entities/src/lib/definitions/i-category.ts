export interface ICategory {
  id: string;
  name: string;
  children: ICategory[];
}

export interface ICategoryProperty {
  categoryPropertyId: string;
  value: string;
}
