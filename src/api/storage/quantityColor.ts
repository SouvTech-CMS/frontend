import { axiosClient } from "api/axiosClient"
import { QuantityColor } from "type/storage/quantityColor/quantityColor"
import { WithId } from "type/withId"

export const getAllQuantityColors = async (): Promise<
  WithId<QuantityColor>[]
> => {
  const { data: quantityColorsList } = await axiosClient.get(
    "/quantity_color/all/",
  )
  return quantityColorsList
}

export const createQuantityColor = async (body: QuantityColor) => {
  await axiosClient.post("/quantity_color/", body)
}

export const updateQuantityColor = async (body: WithId<QuantityColor>) => {
  await axiosClient.put("/quantity_color/", body)
}

export const deleteQuantityColor = async (quantityColorId: number) => {
  await axiosClient.delete(`/quantity_color/${quantityColorId}`)
}
