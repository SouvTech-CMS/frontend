import { Flex, Text } from "@chakra-ui/react"
import { getCommentByObjNameAndId } from "api/comment/comment"
import { CommentInput } from "component/comment/Comment"
import { CommentTooltip } from "component/comment/CommentTooltip"
import { useUserContext } from "context/user"
import { ChangeEvent, useEffect, useState } from "react"
import { FiMessageSquare } from "react-icons/fi"
import { useQuery } from "react-query"
import {
  useCommentCreateMutation,
  useCommentDeleteMutation,
  useCommentUpdateMutation,
} from "service/comment/comment"
import { Comment } from "type/comment/comment"
import { WithId } from "type/withId"

interface useCommentInputProps {
  objectId?: number
  objectName: string
  isAsTooltip?: boolean
}

export const useCommentInput = (props: useCommentInputProps) => {
  const { objectId, objectName, isAsTooltip } = props

  const { currentUser } = useUserContext()
  const userId = currentUser?.id

  const { data: prevComment } = useQuery<WithId<Comment> | undefined>(
    ["comment", objectId, objectName],
    () => getCommentByObjNameAndId(objectId!, objectName),
    {
      enabled: !!objectId,
    },
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
  const isCommentExists = !!comment.trim()
  const isCommentEmpty = isPrevCommentExists && !comment.trim()
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

  const CommentComponent = isCommentExists ? (
    <>
      {isAsTooltip ? (
        <CommentTooltip comment={comment} />
      ) : (
        <Flex alignItems="center" gap={1}>
          <FiMessageSquare color="gray" />

          <Text color="gray" fontSize="sm">
            {comment}
          </Text>
        </Flex>
      )}
    </>
  ) : (
    <></>
  )

  const CommentInputComponent = (
    <CommentInput
      comment={comment}
      handleCommentChange={handleCommentChange}
      isDisabled={isCommentLoading}
    />
  )

  return {
    CommentComponent,
    CommentInputComponent,
    comment,
    handleCommentChange,
    onCommentSubmit,
    handleCommentClear,
    isCommentLoading,
    isCommentExists,
  }
}
