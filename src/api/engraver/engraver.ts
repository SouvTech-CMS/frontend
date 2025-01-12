import { axiosClient } from "api/axiosClient"
import {
  Engraver,
  EngraverCreate,
  EngraverUpdate,
} from "type/engraver/engraver"
import { WithId } from "type/withId"

export const getAllEngravers = async (): Promise<WithId<Engraver>[]> => {
  const { data: engraversList } = await axiosClient.get("/engraver/all/")
  return engraversList
}

export const getEngraverById = async (
  engraverId: number,
): Promise<WithId<Engraver>> => {
  const { data: engraver } = await axiosClient.get(`/engraver/id/${engraverId}`)
  return engraver
}

export const createEngraver = async (
  engraver: EngraverCreate,
): Promise<WithId<Engraver>> => {
  const { data: newEngraver } = await axiosClient.post("/engraver/", engraver)
  return newEngraver
}

export const updateEngraver = async (engraver: EngraverUpdate) => {
  await axiosClient.put("/engraver/", engraver)
}

export const blockOrUnblockEngraver = async (engraverId: number) => {
  await axiosClient.delete(`/engraver/${engraverId}/block_or_unblock`)
}
