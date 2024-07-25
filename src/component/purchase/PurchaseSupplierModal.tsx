import {
  Button,
  Modal,
  ModalBody,
  ModalCloseButton,
  ModalContent,
  ModalFooter,
  ModalHeader,
  ModalOverlay,
} from "@chakra-ui/react"
import { PurchaseSupplierModalCard } from "component/purchase/PurchaseSupplierModalCard"
import { FC } from "react"
import { ModalProps } from "type/modalProps"
import { Supplier } from "type/supplier"
import { SupplierManager } from "type/supplierManager"
import { WithId } from "type/withId"

interface PurchaseSupplierModalProps extends ModalProps {
  purchaseId: number
  supplier: WithId<Supplier>
  manager: WithId<SupplierManager>
}

export const PurchaseSupplierModal: FC<PurchaseSupplierModalProps> = (
  props,
) => {
  const { purchaseId, supplier, manager, isOpen, onClose } = props

  return (
    <Modal size="xl" isOpen={isOpen} onClose={onClose} isCentered>
      <ModalOverlay backdropFilter="blur(10px)" />

      <ModalContent>
        <ModalHeader>Purchase #{purchaseId} Manager</ModalHeader>
        <ModalCloseButton />

        <ModalBody>
          <PurchaseSupplierModalCard supplier={supplier} manager={manager} />
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
