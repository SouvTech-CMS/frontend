import { queryClient } from "api/queryClient"
import { createSupplier, deleteSupplier, updateSupplier } from "api/supplier"
import { useMutation } from "react-query"

export const useSupplierCreateMutation = () => {
  return useMutation(createSupplier, {
    onSuccess: () => {
      queryClient.invalidateQueries("suppliersList")
    },
  })
}

export const useSupplierUpdateMutation = () => {
  return useMutation(updateSupplier, {
    onSuccess: () => {
      queryClient.invalidateQueries("suppliersList")
    },
  })
}

export const useSupplierDeleteMutation = () => {
  return useMutation(deleteSupplier, {
    onSuccess: () => {
      queryClient.invalidateQueries("suppliersList")
    },
  })
}
