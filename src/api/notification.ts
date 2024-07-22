import { axiosClient } from "api/axiosClient"
import { UserRoleNotifications } from "type/notification"

export const getAllNotifications = async (): Promise<UserRoleNotifications> => {
  const { data: notificationsList } = await axiosClient.get("/notify/")
  return notificationsList
}

export const setNotificationAsRead = async (notificationId: number) => {
  await axiosClient.put(
    "/notify/",
    {},
    {
      params: {
        notify_id: notificationId,
      },
    },
  )
}
