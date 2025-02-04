import {
  blockOrUnblockEngraver,
  createEngraver,
  updateEngraver,
} from "api/engraver/engraver"
import { queryClient } from "api/queryClient"
import { AxiosError } from "axios"
import { useMutation } from "react-query"
import { notify } from "util/toasts"

export const useEngraverCreateMutation = () => {
  return useMutation(createEngraver, {
    onSuccess: () => {
      queryClient.invalidateQueries("engraversList")
    },
    onError: (error: AxiosError) => {
      const responseData = error.response?.data as { detail?: string }

      if (responseData?.detail) {
        notify(responseData.detail, "error")
      }
    },
  })
}

export const useEngraverUpdateMutation = () => {
  return useMutation(updateEngraver, {
    onSuccess: () => {
      queryClient.invalidateQueries("engraversList")
    },
    onError: (error: AxiosError) => {
      const responseData = error.response?.data as { detail?: string }

      if (responseData?.detail) {
        notify(responseData.detail, "error")
      }
    },
  })
}

export const useEngraverBlockMutation = () => {
  return useMutation(blockOrUnblockEngraver, {
    onSuccess: () => {
      queryClient.invalidateQueries("engraversList")
    },
    onError: (error: AxiosError) => {
      const responseData = error.response?.data as { detail?: string }

      if (responseData?.detail) {
        notify(responseData.detail, "error")
      }
    },
  })
}
