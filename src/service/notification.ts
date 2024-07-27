import { setNotificationAsRead } from "api/notification"
import { queryClient } from "api/queryClient"
import { useMutation } from "react-query"

export const useNotificationMarkAsReadMutation = () => {
  return useMutation(setNotificationAsRead, {
    onSuccess: () => {
      queryClient.invalidateQueries("notificationsList")
    },
  })
}
