import { Button, useDisclosure } from "@chakra-ui/react"
import { PurchaseDeliveryModal } from "component/purchaseDelivery/PurchaseDeliveryModal"
import { FC } from "react"

export const NewPurchaseDeliveryBtn: FC = () => {
  const {
    isOpen: isNewPurchaseDeliveryModalOpen,
    onOpen: onNewPurchaseDeliveryModalOpen,
    onClose: onNewPurchaseDeliveryModalClose,
  } = useDisclosure()

  return (
    <>
      <Button
        w="fit-content"
        variant="solid"
        colorScheme="blue"
        onClick={onNewPurchaseDeliveryModalOpen}
      >
        Add purchase in delivery
      </Button>

      <PurchaseDeliveryModal
        isOpen={isNewPurchaseDeliveryModalOpen}
        onClose={onNewPurchaseDeliveryModalClose}
      />
    </>
  )
}
