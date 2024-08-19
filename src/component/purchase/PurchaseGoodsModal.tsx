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
import { PurchaseGoodsModalCard } from "component/purchase/PurchaseGoodsModalCard"
import { FC } from "react"
import { ModalProps } from "type/modalProps"
import { PurchaseGood } from "type/purchase/purchaseGood"
import { WithId } from "type/withId"

interface PurchaseGoodsModalProps extends ModalProps {
  purchaseId: number
  goods: WithId<PurchaseGood>[]
}

export const PurchaseGoodsModal: FC<PurchaseGoodsModalProps> = (props) => {
  const { purchaseId, goods, isOpen, onClose } = props

  return (
    <Modal size="xl" isOpen={isOpen} onClose={onClose} isCentered>
      <ModalBackgroundBlur />

      <ModalContent>
        <ModalHeader>Purchase #{purchaseId} Goods</ModalHeader>
        <ModalCloseButton />

        <ModalBody>
          <Flex direction="column" gap={2}>
            {goods.map((good, index) => (
              <PurchaseGoodsModalCard key={index} good={good} />
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
