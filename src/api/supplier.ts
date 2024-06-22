import { axiosClient } from "api/axiosClient"
import { Supplier } from "type/supplier"

export const getCurrentSupplier = async (): Promise<Supplier> => {
  const { data: supplier } = await axiosClient.get("/supplier/current/")
  return supplier
}

export const getAllSuppliers = async (): Promise<Supplier[]> => {
  const { data: suppliersList } = await axiosClient.get("/supplier/")
  return suppliersList
}

export const createSupplier = async (supplier: Supplier) => {
  await axiosClient.post("/supplier/", supplier)
}

export const updateSupplier = async (supplier: Supplier) => {
  await axiosClient.put("/supplier/", supplier)
}

export const deleteSupplier = async (supplierId: number) => {
  await axiosClient.delete(`/supplier/${supplierId}`)
}
