import { axiosClient } from "api/axiosClient"
import { AxiosError } from "axios"
import { Comment } from "type/comment/comment"
import { WithId } from "type/withId"

export const getCommentByObjNameAndId = async (
  objectId: number,
  objectName: string,
): Promise<WithId<Comment> | undefined> => {
  try {
    const { data: comment } = await axiosClient.get("/comment/", {
      params: {
        obj_id: objectId,
        obj_name: objectName,
      },
    })
    return comment
  } catch (e) {
    if (e instanceof AxiosError) {
      if (e.response?.status === 404) {
        return undefined
      }
    }

    throw e
  }
}

export const createComment = async (comment: Comment) => {
  await axiosClient.post("/comment/", comment)
}

export const updateComment = async (comment: WithId<Comment>) => {
  await axiosClient.put("/comment/", comment)
}

export const deleteComment = async (commentId: number) => {
  await axiosClient.delete(`/comment/${commentId}`)
}
