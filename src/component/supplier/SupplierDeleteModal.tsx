import {
  Button,
  Flex,
  Modal,
  ModalBody,
  ModalCloseButton,
  ModalContent,
  ModalFooter,
  ModalHeader,
  ModalOverlay,
  Text,
} from "@chakra-ui/react"
import { FC } from "react"
import { useSupplierDeleteMutation } from "service/supplier"
import { ModalProps } from "type/modalProps"
import { Supplier } from "type/supplier"
import { WithId } from "type/withId"
import { notify } from "util/toasts"

interface SupplierDeleteModalProps extends ModalProps {
  supplier: WithId<Supplier>
}

export const SupplierDeleteModal: FC<SupplierDeleteModalProps> = (props) => {
  const { supplier, isOpen, onClose } = props

  const supplierDeleteMutation = useSupplierDeleteMutation()

  const isLoading = supplierDeleteMutation.isLoading

  const onSupplierDeleteConfirm = async () => {
    await supplierDeleteMutation.mutateAsync(supplier.id)

    notify(`Supplier ${supplier.name} was successfully deleted`, "success")
    onClose()
  }

  return (
    <Modal isOpen={isOpen} onClose={onClose} isCentered>
      <ModalOverlay backdropFilter="blur(10px)" />

      <ModalContent>
        <ModalHeader>Delete Supplier</ModalHeader>
        <ModalCloseButton />

        <ModalBody>
          <Text>Are you sure you want to delete the supplier</Text>
          <Text fontWeight="bold">{supplier.name}</Text>
        </ModalBody>

        <ModalFooter>
          <Flex gap={5}>
            <Button
              variant="danger"
              onClick={onSupplierDeleteConfirm}
              isLoading={isLoading}
              isDisabled={isLoading}
            >
              Delete
            </Button>

            <Button variant="secondary" onClick={onClose}>
              Cancel
            </Button>
          </Flex>
        </ModalFooter>
      </ModalContent>
    </Modal>
  )
}
