import { Button, useDisclosure } from "@chakra-ui/react"
import { StorageGoodModal } from "component/storageGood/StorageGoodModal"
import { useUserPermissions } from "hook/useUserPermissions"
import { FC } from "react"

export const NewStorageGoodBtn: FC = () => {
  const { canEditStorage } = useUserPermissions()

  const {
    isOpen: isNewStorageGoodModalOpen,
    onOpen: onNewStorageGoodModalOpen,
    onClose: onNewStorageGoodModalClose,
  } = useDisclosure()

  return (
    <>
      <Button
        w="fit-content"
        onClick={onNewStorageGoodModalOpen}
        isDisabled={!canEditStorage}
      >
        Create Storage Good
      </Button>

      <StorageGoodModal
        isOpen={isNewStorageGoodModalOpen}
        onClose={onNewStorageGoodModalClose}
      />
    </>
  )
}
