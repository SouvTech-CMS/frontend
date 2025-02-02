import { axiosClient } from "api/axiosClient"
import { State } from "type/client/state"
import { WithId } from "type/withId"

export const getAllStatesByCountryId = async (
  countryId: number,
): Promise<WithId<State>[]> => {
  const { data: statesList } = await axiosClient.get("/state/", {
    params: { country_id: countryId },
  })
  return statesList
}
