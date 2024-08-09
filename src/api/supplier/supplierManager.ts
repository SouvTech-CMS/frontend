import { axiosClient } from "api/axiosClient"
import { SupplierManager } from "type/supplier/supplierManager"
import { WithId } from "type/withId"

export const createSupplierManager = async (
  supplierManager: SupplierManager,
): Promise<WithId<SupplierManager>> => {
  const { data: newSupplierManager } = await axiosClient.post(
    "/supplier_manager/",
    supplierManager,
  )
  return newSupplierManager
}

export const updateSupplierManager = async (
  supplierManager: SupplierManager,
) => {
  await axiosClient.put("/supplier_manager/", supplierManager)
}

export const deleteSupplierManager = async (supplierManagerId: number) => {
  await axiosClient.delete(`/supplier_manager/${supplierManagerId}`)
}
