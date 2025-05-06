import { SortDirection } from "type/sortDirection"

export type LimitOffset = {
  limit?: number
  offset?: number
}

export type ApiRequest<SearchFilterType> = LimitOffset & {
  shopId?: number
  sortField?: string
  sortDirection?: SortDirection
  searchFilter?: SearchFilterType
}
