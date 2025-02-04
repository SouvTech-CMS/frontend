import { Button, Flex, Text, useDisclosure } from "@chakra-ui/react"
import { DeviceModal } from "component/authorizedDevice/DeviceModal"
import { FC } from "react"
import { FiPlusCircle } from "react-icons/fi"

export const NewDeviceCard: FC = () => {
  const {
    isOpen: isDeviceEditModalOpen,
    onOpen: onDeviceEditModalOpen,
    onClose: onDeviceEditModalClose,
  } = useDisclosure()

  return (
    <>
      <Button
        h="full"
        w="full"
        minH={150}
        variant="newCard"
        onClick={onDeviceEditModalOpen}
        borderRadius={20}
      >
        <Flex
          w="full"
          direction="column"
          justifyContent="center"
          alignItems="center"
          gap={3}
        >
          <FiPlusCircle size={36} />

          <Text fontSize="xl" fontWeight="bold" whiteSpace="pre-wrap">
            Authorize This Device
          </Text>
        </Flex>
      </Button>

      {/* Device Edit Modal */}
      <DeviceModal
        isOpen={isDeviceEditModalOpen}
        onClose={onDeviceEditModalClose}
      />
    </>
  )
}
