import { Button, Flex, Text, useDisclosure } from "@chakra-ui/react"
import { UserModal } from "component/users/UserModal"
import { FC } from "react"
import { FiPlusCircle } from "react-icons/fi"

export const NewUserCard: FC = () => {
  const {
    isOpen: isUserEditModalOpen,
    onOpen: onUserEditModalOpen,
    onClose: onUserEditModalClose,
  } = useDisclosure()

  return (
    <>
      <Button
        h="full"
        w="full"
        minH={360}
        bgColor="gray.200"
        onClick={onUserEditModalOpen}
        borderRadius={20}
        boxShadow="lg"
      >
        <Flex
          direction="column"
          justifyContent="center"
          alignItems="center"
          gap={5}
        >
          <FiPlusCircle color="gray" size={48} />
          <Text color="gray" fontSize={24} fontWeight="bold">
            New
          </Text>
        </Flex>
      </Button>

      {/* Edit user modal */}
      <UserModal isOpen={isUserEditModalOpen} onClose={onUserEditModalClose} />
    </>
  )
}
