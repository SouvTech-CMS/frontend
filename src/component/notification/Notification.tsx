import { Flex, IconButton, Text } from "@chakra-ui/react"
import { FC } from "react"
import { FiCheckCircle, FiCircle } from "react-icons/fi"
import { useNotificationMarkAsReadMutation } from "service/notification"
import { Notification } from "type/notification"
import { WithId } from "type/withId"

interface NotificationCardProps {
  notification: WithId<Notification>
}

export const NotificationCard: FC<NotificationCardProps> = (props) => {
  const { notification } = props

  const notificationMarkAsReadMutation = useNotificationMarkAsReadMutation()

  const onNotificationMarkAsRead = async () => {
    await notificationMarkAsReadMutation.mutateAsync(notification.id)
  }

  return (
    <Flex alignItems="center" gap={2}>
      {notification.is_read ? (
        <FiCheckCircle color="bodyText" />
      ) : (
        <FiCircle color="bodyText" />
      )}

      <Flex w="full">
        <Text>{notification.message}</Text>
      </Flex>

      {/* Mark as Read Btn */}
      <Flex alignItems="center" gap={2}>
        <IconButton
          aria-label="mark-as-read-btn"
          variant="ghost"
          onClick={onNotificationMarkAsRead}
        />
      </Flex>
    </Flex>
  )
}
