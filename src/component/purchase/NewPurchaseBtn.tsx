import { Button, useDisclosure } from "@chakra-ui/react"
import { NewPurchaseModal } from "component/purchase/NewPurchaseModal"
import { FC } from "react"

export const NewPurchaseBtn: FC = () => {
  const {
    isOpen: isNewPurchaseModalOpen,
    onOpen: onNewPurchaseModalOpen,
    onClose: onNewPurchaseModalClose,
  } = useDisclosure()

  return (
    <>
      <Button w="fit-content" onClick={onNewPurchaseModalOpen}>
        Add purchase
      </Button>

      <NewPurchaseModal
        isOpen={isNewPurchaseModalOpen}
        onClose={onNewPurchaseModalClose}
      />
    </>
  )
}
