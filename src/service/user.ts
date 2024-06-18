import { queryClient } from "api/queryClient"
import { deleteUser } from "api/user"
import { useMutation } from "react-query"

export const useUserDeleteMutation = () => {
  return useMutation(deleteUser, {
    onSuccess: () => {
      queryClient.invalidateQueries("usersList")
    },
  })
}
