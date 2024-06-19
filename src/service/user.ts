import { queryClient } from "api/queryClient"
import { createUser, deleteUser, updateUser } from "api/user"
import { useMutation } from "react-query"

export const useUserCreateMutation = () => {
  return useMutation(createUser, {
    onSuccess: () => {
      queryClient.invalidateQueries("usersList")
    },
  })
}

export const useUserUpdateMutation = () => {
  return useMutation(updateUser, {
    onSuccess: () => {
      queryClient.invalidateQueries("usersList")
    },
  })
}

export const useUserDeleteMutation = () => {
  return useMutation(deleteUser, {
    onSuccess: () => {
      queryClient.invalidateQueries("usersList")
    },
  })
}
