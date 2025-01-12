import { axiosClient } from "api/axiosClient"
import { Supplier, SupplierWithManagers } from "type/supplier/supplier"
import { WithId } from "type/withId"

export const getAllSuppliers = async (): Promise<SupplierWithManagers[]> => {
  const { data: suppliersList } = await axiosClient.get("/supplier/all/")
  return suppliersList
}

export const getSupplierById = async (
  supplierId: number,
): Promise<SupplierWithManagers> => {
  const { data: supplier } = await axiosClient.get(`/supplier/id/${supplierId}`)
  return supplier
}

export const createSupplier = async (
  supplier: Supplier,
): Promise<WithId<Supplier>> => {
  const { data: newSupplier } = await axiosClient.post("/supplier/", supplier)
  return newSupplier
}

export const updateSupplier = async (supplier: WithId<Supplier>) => {
  await axiosClient.put("/supplier/", supplier)
}

export const deleteSupplier = async (supplierId: number) => {
  await axiosClient.delete(`/supplier/${supplierId}`)
}
