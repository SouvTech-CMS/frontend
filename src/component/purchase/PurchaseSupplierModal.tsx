import {
  Button,
  Modal,
  ModalBody,
  ModalCloseButton,
  ModalContent,
  ModalFooter,
  ModalHeader,
} from "@chakra-ui/react"
import { ModalBackgroundBlur } from "component/ModalBackgroundBlur"
import { PurchaseSupplierModalCard } from "component/purchase/PurchaseSupplierModalCard"
import { FC } from "react"
import { ModalProps } from "type/modalProps"
import { Supplier } from "type/supplier/supplier"
import { SupplierManager } from "type/supplier/supplierManager"
import { WithId } from "type/withId"

interface PurchaseSupplierModalProps extends ModalProps {
  purchaseId: number
  supplier?: WithId<Supplier>
  manager?: WithId<SupplierManager>
}

export const PurchaseSupplierModal: FC<PurchaseSupplierModalProps> = (
  props,
) => {
  const { purchaseId, supplier, manager, isOpen, onClose } = props

  const isSupplierExists = !!supplier
  const isManagerExists = !!manager

  return (
    <Modal size="xl" isOpen={isOpen} onClose={onClose} isCentered>
      <ModalBackgroundBlur />

      <ModalContent>
        <ModalHeader>Order #{purchaseId} Manager</ModalHeader>
        <ModalCloseButton />

        <ModalBody>
          {isSupplierExists && isManagerExists && (
            <PurchaseSupplierModalCard supplier={supplier} manager={manager} />
          )}
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
