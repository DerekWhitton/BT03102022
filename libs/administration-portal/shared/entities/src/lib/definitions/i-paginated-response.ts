export interface IPaginatedResponse<T> {
  items: T[];
  nextPage?: number;
  page: number;
  previousPage?: number;
  totalItems: number;
  totalPages: number;
}
