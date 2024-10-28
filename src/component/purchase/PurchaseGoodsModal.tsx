import {
  Button,
  Flex,
  Modal,
  ModalBody,
  ModalCloseButton,
  ModalContent,
  ModalFooter,
  ModalHeader,
  useDisclosure,
} from "@chakra-ui/react"
import { ModalBackgroundBlur } from "component/ModalBackgroundBlur"
import { PurchaseGoodsModalCard } from "component/purchase/PurchaseGoodsModalCard"
import { NewPurchaseGoodModal } from "component/purchaseGood/NewPurchaseGoodModal"
import { FC } from "react"
import { usePurchaseGoodCreateMutation } from "service/purchase/purchaseGood"
import { ModalProps } from "type/modalProps"
import { PurchaseGood } from "type/purchase/purchaseGood"
import { WithId } from "type/withId"
import { notify } from "util/toasts"

interface PurchaseGoodsModalProps extends ModalProps {
  purchaseId: number
  goods: WithId<PurchaseGood>[]
}

export const PurchaseGoodsModal: FC<PurchaseGoodsModalProps> = (props) => {
  const { purchaseId, goods, isOpen, onClose, isReadOnly } = props

  const purchaseGoodCreateMutation = usePurchaseGoodCreateMutation()

  const isLoading = purchaseGoodCreateMutation.isLoading

  const {
    isOpen: isNewGoodAddModalOpen,
    onOpen: onNewGoodAddModalOpen,
    onClose: onNewGoodAddModalClose,
  } = useDisclosure()

  const handleAddGood = async (good: PurchaseGood) => {
    const body: PurchaseGood = {
      ...good,
      purchase_id: purchaseId,
    }

    await purchaseGoodCreateMutation.mutateAsync(body)

    notify(
      `New good ${good.name} for Purchase #${purchaseId} was added successfully`,
      "success",
    )

    onNewGoodAddModalClose()
  }

  return (
    <>
      <Modal size="xl" isOpen={isOpen} onClose={onClose} isCentered>
        <ModalBackgroundBlur />

        <ModalContent>
          <ModalHeader>Purchase #{purchaseId} Goods</ModalHeader>
          <ModalCloseButton />

          <ModalBody>
            <Flex direction="column" gap={2}>
              {goods.map((good, index) => (
                <PurchaseGoodsModalCard
                  key={index}
                  good={good}
                  isReadOnly={isReadOnly}
                />
              ))}
            </Flex>
          </ModalBody>

          <ModalFooter>
            <Flex w="full" justifyContent="flex-end" gap={2}>
              {!isReadOnly && (
                <Button w="full" onClick={onNewGoodAddModalOpen}>
                  Add
                </Button>
              )}

              <Button variant="secondary" onClick={onClose}>
                Close
              </Button>
            </Flex>
          </ModalFooter>
        </ModalContent>
      </Modal>

      <NewPurchaseGoodModal
        onAddGood={handleAddGood}
        isLoading={isLoading}
        isOpen={isNewGoodAddModalOpen}
        onClose={onNewGoodAddModalClose}
      />
    </>
  )
}
