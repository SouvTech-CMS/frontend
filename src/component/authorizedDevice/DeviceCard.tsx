import {
  Card,
  CardFooter,
  CardHeader,
  Flex,
  Heading,
  Text,
  useDisclosure,
} from "@chakra-ui/react"
import { DeviceCardMenu } from "component/authorizedDevice/DeviceCardMenu"
import { DeviceDeleteModal } from "component/authorizedDevice/DeviceDeleteModal"
import { useUserPermissions } from "hook/useUserPermissions"
import { FC } from "react"
import { FiClock } from "react-icons/fi"
import { AuthorizedDevice } from "type/authorizedDevice/authorizedDevice"
import { WithId } from "type/withId"
import { dateAsStringToDate, formatDate } from "util/formatting"

interface DeviceCardProps {
  device: WithId<AuthorizedDevice>
}

export const DeviceCard: FC<DeviceCardProps> = (props) => {
  const { device } = props

  const { canEditDevices } = useUserPermissions()

  const authorizedAt = dateAsStringToDate(device.authorized_at)

  // Delete
  const {
    isOpen: isDeviceDeleteModalOpen,
    onOpen: onDeviceDeleteModalOpen,
    onClose: onDeviceDeleteModalClose,
  } = useDisclosure()

  return (
    <>
      <Card h="full" w="full" minH={150} variant="card" borderRadius={20}>
        <CardHeader>
          <Flex direction="column" pr={5} gap={2}>
            <Heading size="md">
              <Flex direction="row" alignItems="center" gap={2}>
                {/* Name */}
                {device.name}
              </Flex>
            </Heading>

            {/* Comment */}
            {/* {isCommentExists && (
            <Flex alignItems="center" gap={1}>
              <FiMessageSquare color="gray" />

              <Text color="gray" fontSize="sm">
                {comment}
              </Text>
            </Flex>
          )} */}
          </Flex>

          {/* Menu Btn */}
          {canEditDevices && (
            <DeviceCardMenu onDelete={onDeviceDeleteModalOpen} />
          )}
        </CardHeader>

        <CardFooter mt="auto">
          <Flex w="full" direction="column" gap={5}>
            <Flex
              w="full"
              direction="row"
              alignItems="center"
              fontSize="sm"
              color="gray"
              gap={1}
            >
              <FiClock />

              <Text>{formatDate(authorizedAt)}</Text>
            </Flex>
          </Flex>
        </CardFooter>
      </Card>

      {/* Delete Modal */}
      <DeviceDeleteModal
        device={device}
        isOpen={isDeviceDeleteModalOpen}
        onClose={onDeviceDeleteModalClose}
      />
    </>
  )
}
