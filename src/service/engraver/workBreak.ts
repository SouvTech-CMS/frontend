import { finishWorkBreak, startWorkBreak } from "api/engraver/workBreak"
import { queryClient } from "api/queryClient"
import { AxiosError } from "axios"
import { useMutation } from "react-query"
import { notify } from "util/toasts"

export const useWorkBreakStartMutation = () => {
  return useMutation(startWorkBreak, {
    onSuccess: (_, body) => {
      const engraverId = body.engraver_id
      return queryClient.invalidateQueries(["activeWorkShift", engraverId])
    },
    onError: (error: AxiosError, body) => {
      // Shift may be closed on the server, so show its actual state
      queryClient.invalidateQueries(["activeWorkShift", body.engraver_id])

      const responseData = error.response?.data as { detail?: string }

      if (responseData?.detail) {
        notify(responseData.detail, "error")
      }
    },
  })
}

export const useWorkBreakFinishMutation = () => {
  return useMutation(finishWorkBreak, {
    onSuccess: (_, body) => {
      const engraverId = body.engraver_id
      return queryClient.invalidateQueries(["activeWorkShift", engraverId])
    },
    onError: (error: AxiosError, body) => {
      // Shift may be closed on the server, so show its actual state
      queryClient.invalidateQueries(["activeWorkShift", body.engraver_id])

      const responseData = error.response?.data as { detail?: string }

      if (responseData?.detail) {
        notify(responseData.detail, "error")
      }
    },
  })
}
