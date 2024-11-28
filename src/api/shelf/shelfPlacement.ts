import { axiosClient } from "api/axiosClient"
import { ApiResponse } from "type/api/apiResponse"
import { PlacementWithShelfsWithStorageGoods } from "type/shelf/shelfPlacement"

export const getAllPlacements = async (): Promise<
  ApiResponse<PlacementWithShelfsWithStorageGoods[]>
> => {
  const { data: placementsList } = await axiosClient.post(
    "/shelf/placement/storage_good/",
    {},
  )
  return placementsList
}
