export interface ISearchFacetOption {
  value: string;
  total: number;
}

export interface ISearchFacet {
  key: string;
  options: ISearchFacetOption[];
}
