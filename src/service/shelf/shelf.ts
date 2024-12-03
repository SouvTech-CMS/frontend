import { queryClient } from "api/queryClient"
import { createShelf, deleteShelf, updateShelf } from "api/shelf/shelf"
import { useMutation } from "react-query"

export const useShelfCreateMutation = () => {
  return useMutation(createShelf, {
    onSuccess: () => {
      queryClient.invalidateQueries("placementsList")
      queryClient.invalidateQueries("shelfsList")
    },
  })
}

export const useShelfUpdateMutation = () => {
  return useMutation(updateShelf, {
    onSuccess: () => {
      queryClient.invalidateQueries("placementsList")
      queryClient.invalidateQueries("shelfsList")
    },
  })
}

export const useShelfDeleteMutation = () => {
  return useMutation(deleteShelf, {
    onSuccess: () => {
      queryClient.invalidateQueries("placementsList")
      queryClient.invalidateQueries("shelfsList")
    },
  })
}
