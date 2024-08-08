import { queryClient } from "api/queryClient"
import {
  createSupplier,
  deleteSupplier,
  updateSupplier,
} from "api/supplier/supplier"
import { useMutation } from "react-query"

export const useSupplierCreateMutation = () => {
  return useMutation(createSupplier, {
    onSuccess: () => {
      queryClient.invalidateQueries("suppliersWithManagersList")
    },
  })
}

export const useSupplierUpdateMutation = () => {
  return useMutation(updateSupplier, {
    onSuccess: () => {
      queryClient.invalidateQueries("suppliersWithManagersList")
    },
  })
}

export const useSupplierDeleteMutation = () => {
  return useMutation(deleteSupplier, {
    onSuccess: () => {
      queryClient.invalidateQueries("suppliersWithManagersList")
    },
  })
}
