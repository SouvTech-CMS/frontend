import { createComment, deleteComment, updateComment } from "api/comment"
import { queryClient } from "api/queryClient"
import { useMutation } from "react-query"

export const useCommentCreateMutation = () => {
  return useMutation(createComment, {
    onSuccess: () => {
      queryClient.cancelQueries("comment")
      queryClient.invalidateQueries("comment")
    },
  })
}

export const useCommentUpdateMutation = () => {
  return useMutation(updateComment, {
    onSuccess: () => {
      queryClient.cancelQueries("comment")
      queryClient.invalidateQueries("comment")
    },
  })
}

export const useCommentDeleteMutation = () => {
  return useMutation(deleteComment, {
    onSuccess: () => {
      queryClient.cancelQueries("comment")
      queryClient.invalidateQueries("comment")
    },
  })
}
