import { Button, useDisclosure } from "@chakra-ui/react"
import { NewDeliveryModal } from "component/purchaseDelivery/NewPurchaseDeliveryModal"
import { FC } from "react"

export const NewPurchaseDeliveryBtn: FC = () => {
  const {
    isOpen: isNewPurchaseDeliveryModalOpen,
    onOpen: onNewPurchaseDeliveryModalOpen,
    onClose: onNewPurchaseDeliveryModalClose,
  } = useDisclosure()

  return (
    <>
      <Button w="fit-content" onClick={onNewPurchaseDeliveryModalOpen}>
        Add delivery
      </Button>

      <NewDeliveryModal
        isOpen={isNewPurchaseDeliveryModalOpen}
        onClose={onNewPurchaseDeliveryModalClose}
      />
    </>
  )
}
