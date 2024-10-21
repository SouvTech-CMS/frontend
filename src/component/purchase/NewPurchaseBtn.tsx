import { Button, useDisclosure } from "@chakra-ui/react"
import { NewPurchaseModal } from "component/purchase/NewPurchaseModal"
import { useUserPermissions } from "hook/useUserPermissions"
import { FC } from "react"

export const NewPurchaseBtn: FC = () => {
  const {
    isOpen: isNewPurchaseModalOpen,
    onOpen: onNewPurchaseModalOpen,
    onClose: onNewPurchaseModalClose,
  } = useDisclosure()

  const { canEditPurchases } = useUserPermissions()

  return (
    <>
      <Button
        w="fit-content"
        onClick={onNewPurchaseModalOpen}
        isDisabled={!canEditPurchases}
      >
        Add purchase
      </Button>

      <NewPurchaseModal
        isOpen={isNewPurchaseModalOpen}
        onClose={onNewPurchaseModalClose}
      />
    </>
  )
}
