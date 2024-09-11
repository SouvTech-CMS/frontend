import {
  createComment,
  deleteComment,
  updateComment,
} from "api/comment/comment"
import { queryClient } from "api/queryClient"
import { useMutation } from "react-query"

export const useCommentCreateMutation = () => {
  return useMutation(createComment, {
    onSuccess: () => {
      queryClient.invalidateQueries("comment")
    },
  })
}

export const useCommentUpdateMutation = () => {
  return useMutation(updateComment, {
    onSuccess: () => {
      queryClient.invalidateQueries("comment")
    },
  })
}

export const useCommentDeleteMutation = () => {
  return useMutation(deleteComment, {
    onSuccess: () => {
      queryClient.invalidateQueries("comment")
    },
  })
}
