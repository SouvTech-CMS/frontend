import { axiosClient } from "api/axiosClient"
import { Supplier } from "type/supplier"
import { WithId } from "type/withId"

export const getAllSuppliers = async (): Promise<WithId<Supplier>[]> => {
  const { data: suppliersList } = await axiosClient.get("/supplier/")
  return suppliersList
}

export const createSupplier = async (supplier: Supplier) => {
  await axiosClient.post("/supplier/", supplier)
}

export const updateSupplier = async (supplier: WithId<Supplier>) => {
  await axiosClient.put("/supplier/", supplier)
}

export const deleteSupplier = async (supplierId: number) => {
  await axiosClient.delete(`/supplier/${supplierId}`)
}
