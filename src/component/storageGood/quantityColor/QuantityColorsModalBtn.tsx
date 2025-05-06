import { Button, useDisclosure } from "@chakra-ui/react"
import { QuantityColorsModal } from "component/storageGood/quantityColor/QuantityColorsModal"
import { FC } from "react"

export const QuantityColorsModalBtn: FC = () => {
  const {
    isOpen: isModalOpen,
    onOpen: onModalOpen,
    onClose: onModalClose,
  } = useDisclosure()

  return (
    <>
      <Button variant="secondary" onClick={onModalOpen}>
        Quantity Colors Variants
      </Button>

      <QuantityColorsModal isOpen={isModalOpen} onClose={onModalClose} />
    </>
  )
}
