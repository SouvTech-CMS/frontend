import { axiosClient } from "api/axiosClient"
import { Shelf } from "type/shelf/shelf"
import { WithId } from "type/withId"

export const getAllShelfs = async (): Promise<WithId<Shelf>[]> => {
  const { data: shelfsList } = await axiosClient.get("/shelf/")
  return shelfsList
}
