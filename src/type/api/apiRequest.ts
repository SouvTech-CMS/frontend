import { SortDirection } from "type/sortDirection"
import { WithId } from "type/withId"

export type LimitOffset = {
  limit?: number
  offset?: number
}

export type ApiRequest<SearchFilterType> = LimitOffset & {
  shopId?: number
  sortField?: keyof WithId<SearchFilterType>
  sortDirection?: SortDirection
  searchFilter?: SearchFilterType
}
