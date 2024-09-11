import { axiosClient } from "api/axiosClient"
import { SupplierManager } from "type/supplier/supplierManager"
import { WithId } from "type/withId"

export const createSupplierManager = async (
  supplierManager: SupplierManager,
): Promise<WithId<SupplierManager>> => {
  const { data: newSupplierManager } = await axiosClient.post(
    "/supplier/manager/",
    supplierManager,
  )
  return newSupplierManager
}

export const updateSupplierManager = async (
  supplierManager: WithId<SupplierManager>,
) => {
  await axiosClient.put("/supplier/manager/", supplierManager)
}

export const deleteSupplierManager = async (supplierManagerId: number) => {
  await axiosClient.delete(`/supplier/manager/${supplierManagerId}`)
}
