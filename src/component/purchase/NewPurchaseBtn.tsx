import { Button, useDisclosure } from "@chakra-ui/react"
import { NewPurchaseModal } from "component/purchase/NewPurchaseModal"
import { FC } from "react"

export const NewPurchaseBtn: FC = () => {
  const {
    isOpen: isNewPurchaseOpenModal,
    onOpen: onNewPurchaseOpenModal,
    onClose: onNewPurchaseCloseModal,
  } = useDisclosure()

  return (
    <>
      <Button
        w="fit-content"
        variant="solid"
        colorScheme="blue"
        onClick={onNewPurchaseOpenModal}
      >
        Add purchase
      </Button>

      <NewPurchaseModal
        isOpen={isNewPurchaseOpenModal}
        onClose={onNewPurchaseCloseModal}
      />
    </>
  )
}
