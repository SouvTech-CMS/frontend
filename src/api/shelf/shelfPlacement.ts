import { axiosClient } from "api/axiosClient"
import { ApiResponse } from "type/api/apiResponse"
import {
  PlacementWithShelfsWithStorageGoods,
  ShelfPlacement,
} from "type/shelf/shelfPlacement"
import { WithId } from "type/withId"

export const getAllPlacements = async (): Promise<
  ApiResponse<PlacementWithShelfsWithStorageGoods[]>
> => {
  const { data: placementsList } = await axiosClient.post(
    "/shelf/placement/storage_good/",
    {},
  )
  return placementsList
}

export const createPlacement = async (
  placement: ShelfPlacement,
): Promise<WithId<ShelfPlacement>> => {
  const { data: newPlacement } = await axiosClient.post(
    "/shelf/placement/",
    placement,
  )
  return newPlacement
}

export const updatePlacement = async (placement: WithId<ShelfPlacement>) => {
  await axiosClient.put("/shelf/placement/", placement)
}

export const deletePlacement = async (placementId: number) => {
  await axiosClient.delete(`/shelf/placement/${placementId}`)
}
