import { axiosClient } from "api/axiosClient"
import { Engraver } from "type/engraver/engraver"
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
