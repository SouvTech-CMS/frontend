import { Button, Flex, Text, useDisclosure } from "@chakra-ui/react"
import { UserModal } from "component/users/UserModal"
import { FC } from "react"
import { FiPlusCircle } from "react-icons/fi"

export const NewUserCard: FC = () => {
  const {
    isOpen: isUserEditOpenModal,
    onOpen: onUserEditOpenModal,
    onClose: onUserEditCloseModal,
  } = useDisclosure()

  return (
    <>
      <Button
        h="full"
        maxW={400}
        bgColor="gray.200"
        onClick={onUserEditOpenModal}
        borderRadius={20}
        boxShadow="lg"
      >
        <Flex
          direction="column"
          justifyContent="center"
          alignItems="center"
          gap={5}
        >
          <FiPlusCircle color="gray" size={64} />
          <Text color="gray" fontSize={24} fontWeight="bold">
            Добавить
          </Text>
        </Flex>
      </Button>

      {/* Edit user modal */}
      <UserModal isOpen={isUserEditOpenModal} onClose={onUserEditCloseModal} />
    </>
  )
}
