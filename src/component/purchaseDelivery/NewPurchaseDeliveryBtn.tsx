import { Button, useDisclosure } from "@chakra-ui/react"
import { NewDeliveryModal } from "component/purchaseDelivery/NewPurchaseDeliveryModal"
import { useUserPermissions } from "hook/useUserPermissions"
import { FC } from "react"

export const NewPurchaseDeliveryBtn: FC = () => {
  const {
    isOpen: isNewPurchaseDeliveryModalOpen,
    onOpen: onNewPurchaseDeliveryModalOpen,
    onClose: onNewPurchaseDeliveryModalClose,
  } = useDisclosure()

  const { canEditPurchases } = useUserPermissions()

  return (
    <>
      <Button
        w="fit-content"
        onClick={onNewPurchaseDeliveryModalOpen}
        isDisabled={!canEditPurchases}
      >
        Add delivery
      </Button>

      <NewDeliveryModal
        isOpen={isNewPurchaseDeliveryModalOpen}
        onClose={onNewPurchaseDeliveryModalClose}
      />
    </>
  )
}
