import { queryClient } from "api/queryClient"
import { updateRoleTableAccess } from "api/tableAccess/tableAccess"
import { useMutation } from "react-query"

export const useRoleTableAccessUpdateMutation = () => {
  return useMutation(updateRoleTableAccess, {
    onSuccess: ({ role_id }) => {
      queryClient.invalidateQueries(["roleTableAccess", role_id])
    },
  })
}
