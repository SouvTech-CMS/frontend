import { queryClient } from "api/queryClient"
import {
  createSupplierManager,
  deleteSupplierManager,
  updateSupplierManager,
} from "api/supplier/supplierManager"
import { useMutation } from "react-query"

export const useSupplierManagerCreateMutation = () => {
  return useMutation(createSupplierManager, {
    onSuccess: () => {
      queryClient.invalidateQueries("suppliersWithManagersList")
    },
  })
}

export const useSupplierManagerUpdateMutation = () => {
  return useMutation(updateSupplierManager, {
    onSuccess: () => {
      queryClient.invalidateQueries("suppliersWithManagersList")
    },
  })
}

export const useSupplierManagerDeleteMutation = () => {
  return useMutation(deleteSupplierManager, {
    onSuccess: () => {
      queryClient.invalidateQueries("suppliersWithManagersList")
    },
  })
}
