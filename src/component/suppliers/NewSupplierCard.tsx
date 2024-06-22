import { Button, Flex, Text, useDisclosure } from "@chakra-ui/react"
import { SupplierModal } from "component/suppliers/SupplierModal"
import { FC } from "react"
import { FiPlusCircle } from "react-icons/fi"

export const NewSupplierCard: FC = () => {
  const {
    isOpen: isSupplierEditOpenModal,
    onOpen: onSupplierEditOpenModal,
    onClose: onSupplierEditCloseModal,
  } = useDisclosure()

  return (
    <>
      <Button
        h="full"
        minH={250}
        maxW={400}
        bgColor="gray.200"
        onClick={onSupplierEditOpenModal}
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

      {/* Edit supplier modal */}
      <SupplierModal
        isOpen={isSupplierEditOpenModal}
        onClose={onSupplierEditCloseModal}
      />
    </>
  )
}
