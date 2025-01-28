import { ApiRequest } from "type/api/apiRequest"

export const beautifyBody = (body: ApiRequest<any>) => {
  const isShopIdExists = !!body.shopId && body.shopId > 0

  return {
    ...body,
    limit: body.limit,
    offset: body.offset,
    shops: isShopIdExists ? [body.shopId] : undefined,
    sort_field: body.sortField,
    sort_direction: body.sortDirection,
    search_filter: body.searchFilter,
  }
}
