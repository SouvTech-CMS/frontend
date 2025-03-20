import { createWorkShift, updateWorkShift } from "api/engraver/workShift"
import { queryClient } from "api/queryClient"
import { AxiosError } from "axios"
import { useMutation } from "react-query"
import { notify } from "util/toasts"

export const useWorkShiftCreateMutation = () => {
  return useMutation(createWorkShift, {
    onSuccess: (_, body) => {
      const engraverId = body.engraver_id

      queryClient.invalidateQueries("workShift")
      queryClient.invalidateQueries(["activeWorkShift", engraverId])
    },
    onError: (error: AxiosError) => {
      const responseData = error.response?.data as { detail?: string }

      if (responseData?.detail) {
        notify(responseData.detail, "error")
      }
    },
  })
}

export const useWorkShiftUpdateMutation = () => {
  return useMutation(updateWorkShift, {
    onSuccess: (_, body) => {
      const engraverId = body.engraver_id

      queryClient.invalidateQueries("workShift")
      queryClient.invalidateQueries(["activeWorkShift", engraverId])
    },
    onError: (error: AxiosError) => {
      const responseData = error.response?.data as { detail?: string }

      if (responseData?.detail) {
        notify(responseData.detail, "error")
      }
    },
  })
}
