import { SortDirection } from "type/sortDirection"

export type ApiRequest<SearchFilterType> = {
  limit: number
  offset: number
  shopId: number
  sortField?: string
  sortDirection?: SortDirection
  searchFilter?: SearchFilterType
}
