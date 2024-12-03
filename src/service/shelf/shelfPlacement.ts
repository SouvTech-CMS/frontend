import { queryClient } from "api/queryClient"
import {
  createPlacement,
  deletePlacement,
  updatePlacement,
} from "api/shelf/shelfPlacement"
import { useMutation } from "react-query"

export const usePlacementCreateMutation = () => {
  return useMutation(createPlacement, {
    onSuccess: () => {
      queryClient.invalidateQueries("placementsList")
    },
  })
}

export const usePlacementUpdateMutation = () => {
  return useMutation(updatePlacement, {
    onSuccess: () => {
      queryClient.invalidateQueries("placementsList")
    },
  })
}

export const usePlacementDeleteMutation = () => {
  return useMutation(deletePlacement, {
    onSuccess: () => {
      queryClient.invalidateQueries("placementsList")
    },
  })
}
