import { axiosClient } from "api/axiosClient"
import { Country } from "type/client/country"
import { WithId } from "type/withId"

export const getAllCountries = async (): Promise<WithId<Country>[]> => {
  const { data: countriesList } = await axiosClient.get("/country/")
  return countriesList
}
