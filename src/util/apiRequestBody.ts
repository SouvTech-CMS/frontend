import { ApiRequest } from "type/api/apiRequest"

export const beautifyBody = (body: ApiRequest<any>) => {
  return {
    limit: body.limit,
    offset: body.offset,
    shops: body.shopId > 0 ? [body.shopId] : undefined,
    sort_field: body.sortField,
    sort_direction: body.sortDirection,
    search_filter: body.searchFilter,
  }
}
