import {
  Button,
  Flex,
  Modal,
  ModalBody,
  ModalCloseButton,
  ModalContent,
  ModalFooter,
  ModalHeader,
} from "@chakra-ui/react"
import { ModalBackgroundBlur } from "component/ModalBackgroundBlur"
import { PurchaseDeliveryGoodsModalCard } from "component/purchaseDelivery/PurchaseDeliveryGoodsModalCard"
import { FC } from "react"
import { ModalProps } from "type/modalProps"
import { PurchaseGood } from "type/purchaseGood"
import { WithId } from "type/withId"

interface PurchaseDeliveryGoodsModalProps extends ModalProps {
  purchaseDeliveryId: number
  goods: WithId<PurchaseGood>[]
}

export const PurchaseDeliveryGoodsModal: FC<PurchaseDeliveryGoodsModalProps> = (
  props,
) => {
  const { purchaseDeliveryId, goods, isOpen, onClose } = props

  return (
    <Modal size="xl" isOpen={isOpen} onClose={onClose} isCentered>
      <ModalBackgroundBlur />

      <ModalContent>
        <ModalHeader>Delivery #{purchaseDeliveryId} Goods</ModalHeader>
        <ModalCloseButton />

        <ModalBody>
          <Flex direction="column" gap={2}>
            {goods.map((good, index) => (
              <PurchaseDeliveryGoodsModalCard key={index} good={good} />
            ))}
          </Flex>
        </ModalBody>

        <ModalFooter>
          <Button variant="secondary" onClick={onClose}>
            Close
          </Button>
        </ModalFooter>
      </ModalContent>
    </Modal>
  )
}
