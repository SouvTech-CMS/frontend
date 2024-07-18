import { Button, Card, Flex, Text, useDisclosure } from "@chakra-ui/react"
import { SupplierModal } from "component/supplier/SupplierModal"
import { FC } from "react"
import { FiPlusCircle } from "react-icons/fi"

export const NewSupplierCard: FC = () => {
  const {
    isOpen: isSupplierEditModalOpen,
    onOpen: onSupplierEditModalOpen,
    onClose: onSupplierEditModalClose,
  } = useDisclosure()

  return (
    <>
      <Card
        as={Button}
        h="full"
        w="full"
        minH={250}
        variant="newCard"
        onClick={onSupplierEditModalOpen}
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

      {/* Edit supplier modal */}
      <SupplierModal
        isOpen={isSupplierEditModalOpen}
        onClose={onSupplierEditModalClose}
      />
    </>
  )
}
