import { queryClient } from "api/queryClient"
import { createRole, deleteRole, updateRole } from "api/role/role"
import { useMutation } from "react-query"

export const useRoleCreateMutation = () => {
  return useMutation(createRole, {
    onSuccess: () => {
      queryClient.invalidateQueries("rolesWithPermissionsList")
    },
  })
}

export const useRoleUpdateMutation = () => {
  return useMutation(updateRole, {
    onSuccess: () => {
      queryClient.invalidateQueries("rolesWithPermissionsList")
    },
  })
}

export const useRoleDeleteMutation = () => {
  return useMutation(deleteRole, {
    onSuccess: () => {
      queryClient.invalidateQueries("rolesWithPermissionsList")
    },
  })
}
