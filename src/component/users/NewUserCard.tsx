import { Button, Card, Flex, Text, useDisclosure } from "@chakra-ui/react"
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
      <Card
        as={Button}
        h="full"
        w="full"
        minH={360}
        variant="newCard"
        onClick={onUserEditModalOpen}
        borderRadius={20}
      >
        <Flex
          direction="column"
          justifyContent="center"
          alignItems="center"
          gap={5}
        >
          <FiPlusCircle size={48} />
          <Text fontSize={24} fontWeight="bold">
            New
          </Text>
        </Flex>
      </Card>

      {/* Edit user modal */}
      <UserModal isOpen={isUserEditModalOpen} onClose={onUserEditModalClose} />
    </>
  )
}
