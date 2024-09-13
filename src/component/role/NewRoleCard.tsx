import { Button, Flex, Text, useDisclosure } from "@chakra-ui/react"
import { RoleModal } from "component/role/RoleModal"
import { FC } from "react"
import { FiPlusCircle } from "react-icons/fi"

export const NewRoleCard: FC = () => {
  const {
    isOpen: isRoleUpdateModalOpen,
    onOpen: onRoleUpdateModalOpen,
    onClose: onRoleUpdateModalClose,
  } = useDisclosure()

  return (
    <>
      <Button
        h="full"
        w="full"
        minH={250}
        variant="newCard"
        onClick={onRoleUpdateModalOpen}
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
      </Button>

      <RoleModal
        isOpen={isRoleUpdateModalOpen}
        onClose={onRoleUpdateModalClose}
      />
    </>
  )
}
