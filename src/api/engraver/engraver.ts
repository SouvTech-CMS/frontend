import { axiosClient } from "api/axiosClient"
import { Engraver } from "type/engraver/engraver"
import { WithId } from "type/withId"

export const getAllEngravers = async (): Promise<WithId<Engraver>[]> => {
  const { data: engraversList } = await axiosClient.get("/engraver/all/")
  return engraversList
}
