import {
  Avatar,
  AvatarBadge,
  Button,
  Flex,
  Popover,
  PopoverBody,
  PopoverContent,
  PopoverHeader,
  PopoverTrigger,
  Text,
} from "@chakra-ui/react"
import { getAllNotifications } from "api/notification"
import { NotificationCard } from "component/notification/Notification"
import { FC } from "react"
import { FiBell } from "react-icons/fi"
import { useQuery } from "react-query"
import { UserRoleNotifications } from "type/notification"

export const NotificationsPopover: FC = () => {
  const { data: notificationsList } = useQuery<UserRoleNotifications>(
    "notificationsList",
    getAllNotifications,
  )

  const userNotifications = notificationsList?.user_notifications
  const roleNotifications = notificationsList?.role_notifications

  const isNewNotificationsExist =
    userNotifications?.find((notification) => !notification.is_read) !==
    undefined

  return (
    <Popover>
      <PopoverTrigger>
        <Avatar
          size="md"
          icon={<FiBell />}
          bgColor="white"
          color="bodyText"
          cursor="pointer"
        >
          {isNewNotificationsExist && (
            <AvatarBadge boxSize={5} bgColor="red.400" />
          )}
        </Avatar>
      </PopoverTrigger>

      <PopoverContent>
        <PopoverHeader>
          <Flex justifyContent="space-between" alignItems="center">
            <Text fontWeight="semibold">Notifications</Text>

            <Button size="xs" variant="ghost">
              Mark all as read
            </Button>
          </Flex>
        </PopoverHeader>

        <PopoverBody>
          <Flex direction="column">
            {notificationsList?.user_notifications?.map(
              (notification, index) => (
                <NotificationCard key={index} notification={notification} />
              ),
            )}
          </Flex>
        </PopoverBody>
      </PopoverContent>
    </Popover>
  )
}
