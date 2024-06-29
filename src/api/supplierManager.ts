import { axiosClient } from "api/axiosClient"
import { SupplierManager } from "type/supplierManager"
import { WithId } from "type/withId"

export const getAllSupplierManagers = async (): Promise<
  WithId<SupplierManager>[]
> => {
  const { data: supplierManagersList } = await axiosClient.get(
    "/supplier_manager/"
  )
  return supplierManagersList
}

export const getManagersBySupplierId = async (
  supplierId: number
): Promise<WithId<SupplierManager>[]> => {
  const { data: supplierManagersList } = await axiosClient.get(
    `/supplier_manager/by_supplier_id/${supplierId}`
  )
  return supplierManagersList
}

export const createSupplierManager = async (
  supplierManager: SupplierManager
) => {
  await axiosClient.post("/supplier_manager/", supplierManager)
}

export const updateSupplierManager = async (
  supplierManager: SupplierManager
) => {
  await axiosClient.put("/supplier_manager/", supplierManager)
}

export const deleteSupplierManager = async (supplierManagerId: number) => {
  await axiosClient.delete(`/supplier_manager/${supplierManagerId}`)
}
