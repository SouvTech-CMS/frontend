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
import { PurchaseDelivereryGood } from "type/purchaseDelivery/purchaseDelivereryGood"
import { WithId } from "type/withId"

interface PurchaseDeliveryGoodsModalProps extends ModalProps {
  deliveryId: number
  goods: WithId<PurchaseDelivereryGood>[]
}

export const PurchaseDeliveryGoodsModal: FC<PurchaseDeliveryGoodsModalProps> = (
  props,
) => {
  const { deliveryId, goods, isOpen, onClose } = props

  return (
    <Modal size="xl" isOpen={isOpen} onClose={onClose} isCentered>
      <ModalBackgroundBlur />

      <ModalContent>
        <ModalHeader>Delivery #{deliveryId} Goods</ModalHeader>
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
