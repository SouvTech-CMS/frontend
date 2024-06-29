import { queryClient } from "api/queryClient"
import {
  createSupplierManager,
  deleteSupplierManager,
  updateSupplierManager,
} from "api/supplierManager"
import { useMutation } from "react-query"

export const useSupplierManagerCreateMutation = () => {
  return useMutation(createSupplierManager, {
    onSuccess: () => {
      queryClient.invalidateQueries("supplierManagersList")
    },
  })
}

export const useSupplierManagerUpdateMutation = () => {
  return useMutation(updateSupplierManager, {
    onSuccess: () => {
      queryClient.invalidateQueries("supplierManagersList")
    },
  })
}

export const useSupplierManagerDeleteMutation = () => {
  return useMutation(deleteSupplierManager, {
    onSuccess: () => {
      queryClient.invalidateQueries("supplierManagersList")
    },
  })
}
