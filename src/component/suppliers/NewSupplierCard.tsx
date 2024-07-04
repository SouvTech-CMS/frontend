import { Button, Flex, Text, useDisclosure } from "@chakra-ui/react"
import { SupplierModal } from "component/suppliers/SupplierModal"
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
      <Button
        h="full"
        minH={250}
        maxW={250}
        bgColor="gray.200"
        onClick={onSupplierEditModalOpen}
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

      {/* Edit supplier modal */}
      <SupplierModal
        isOpen={isSupplierEditModalOpen}
        onClose={onSupplierEditModalClose}
      />
    </>
  )
}
