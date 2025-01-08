import { axiosClient } from "api/axiosClient"
import { Shelf, ShelfWithPlacement } from "type/shelf/shelf"
import { WithId } from "type/withId"

export const getAllShelves = async (): Promise<ShelfWithPlacement[]> => {
  const { data: shelvesList } = await axiosClient.get("/shelf/")
  return shelvesList
}

export const createShelf = async (shelf: Shelf): Promise<WithId<Shelf>> => {
  const { data: newShelf } = await axiosClient.post("/shelf/", shelf)
  return newShelf
}

export const updateShelf = async (shelf: WithId<Shelf>) => {
  await axiosClient.put("/shelf/", shelf)
}

export const deleteShelf = async (shelfId: number) => {
  await axiosClient.delete(`/shelf/${shelfId}`)
}
