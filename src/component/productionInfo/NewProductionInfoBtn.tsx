import { Button, useDisclosure } from "@chakra-ui/react"
import { NewProductionInfoModal } from "component/productionInfo/NewProductionInfoModal"
import { FC } from "react"

export const NewProductionInfoBtn: FC = () => {
  const {
    isOpen: isProductionInfoCreateModalOpen,
    onOpen: onProductionInfoCreateModalOpen,
    onClose: onProductionInfoCreateModalClose,
  } = useDisclosure()

  return (
    <>
      <Button onClick={onProductionInfoCreateModalOpen}>
        Create production info
      </Button>

      <NewProductionInfoModal
        isOpen={isProductionInfoCreateModalOpen}
        onClose={onProductionInfoCreateModalClose}
      />
    </>
  )
}
