import { getCommentByObjNameAndId } from "api/comment"
import { useUserContext } from "context/user"
import { ChangeEvent, useEffect, useState } from "react"
import { useQuery } from "react-query"
import {
  useCommentCreateMutation,
  useCommentDeleteMutation,
  useCommentUpdateMutation,
} from "service/comment"
import { Comment } from "type/comment"
import { WithId } from "type/withId"

interface useCommentInputProps {
  objectId?: number
  objectName: string
}

export const useCommentInput = (props: useCommentInputProps) => {
  const { objectId, objectName } = props

  const { currentUser } = useUserContext()
  const userId = currentUser?.id

  const { data: prevComment } = useQuery<WithId<Comment>>(
    ["comment", objectId, objectName],
    () => getCommentByObjNameAndId(objectId!, objectName),
    {
      enabled: !!objectId && !!objectName,
    }
  )

  const [comment, setComment] = useState<string>(prevComment?.comment || "")

  const commentCreateMutation = useCommentCreateMutation()
  const commentUpdateMutation = useCommentUpdateMutation()
  const commentDeleteMutation = useCommentDeleteMutation()

  const isCommentLoading =
    commentCreateMutation.isLoading ||
    commentUpdateMutation.isLoading ||
    commentDeleteMutation.isLoading

  const isPrevCommentExists = !!prevComment
  const isCommentEmpty = !comment.trim()
  const isCommentChanged = prevComment?.comment?.trim() !== comment.trim()

  const handleCommentChange = (event: ChangeEvent<HTMLInputElement>) => {
    setComment(event.target.value)
  }

  const handleCommentClear = () => {
    setComment("")
  }

  const onCommentDelete = async () => {
    await commentDeleteMutation.mutateAsync(prevComment?.id!)
  }

  const onCommentUpdate = async () => {
    const body: WithId<Comment> = {
      ...prevComment!,
      comment,
    }
    await commentUpdateMutation.mutateAsync(body)
  }

  const onCommentCreate = async (objectId: number) => {
    const body: Comment = {
      obj_id: objectId,
      obj_name: objectName,
      user_id: userId!,
      comment,
    }
    await commentCreateMutation.mutateAsync(body)
  }

  const onCommentSubmit = async (objectId?: number) => {
    if (isCommentEmpty) {
      await onCommentDelete()
    } else if (isPrevCommentExists && isCommentChanged) {
      await onCommentUpdate()
    } else if (!isPrevCommentExists && isCommentChanged && objectId) {
      await onCommentCreate(objectId)
    }
    handleCommentClear()
  }

  useEffect(() => {
    setComment(prevComment?.comment || "")
  }, [prevComment])

  return {
    comment,
    handleCommentChange,
    onCommentSubmit,
    isCommentLoading,
  }
}
