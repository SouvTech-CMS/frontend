import { Button, Flex, Text, useDisclosure } from "@chakra-ui/react"
import { StorageModal } from "component/storage/StorageModal"
import { FC } from "react"
import { FiPlusCircle } from "react-icons/fi"

interface NewStorageCardProps {
  storageGoodId: number
}

export const NewStorageCard: FC<NewStorageCardProps> = (props) => {
  const { storageGoodId } = props

  const {
    isOpen: isStorageCreateModalOpen,
    onOpen: onStorageCreateModalOpen,
    onClose: onStorageCreateModalClose,
  } = useDisclosure()

  return (
    <>
      <Button
        h="full"
        w="full"
        minH={300}
        variant="newCard"
        onClick={onStorageCreateModalOpen}
        borderRadius={10}
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

      <StorageModal
        storageGoodId={storageGoodId}
        isOpen={isStorageCreateModalOpen}
        onClose={onStorageCreateModalClose}
      />
    </>
  )
}
