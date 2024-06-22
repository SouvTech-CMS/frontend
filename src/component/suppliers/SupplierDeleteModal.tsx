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
import { Supplier } from "type/supplier"
import { notify } from "util/toasts"

interface SupplierDeleteModalProps {
  supplier: Supplier
  isOpen: boolean
  onClose: () => void
}

export const SupplierDeleteModal: FC<SupplierDeleteModalProps> = (props) => {
  const { supplier, isOpen, onClose } = props

  const supplierDeleteMutation = useSupplierDeleteMutation()

  const onSupplierDeleteConfirm = async () => {
    onClose()

    await supplierDeleteMutation.mutateAsync(supplier.id!)

    notify(`Поставщик ${supplier.name} был успешно удалён`, "success")
  }

  return (
    <Modal isOpen={isOpen} onClose={onClose} isCentered>
      <ModalOverlay backdropFilter="blur(10px)" />

      <ModalContent>
        <ModalHeader>Удаление поставщика</ModalHeader>
        <ModalCloseButton />

        <ModalBody>
          <Text>
            Вы точно хотите удалить поставщика
            <Text fontWeight="bold">{supplier.name}</Text>
          </Text>
        </ModalBody>

        <ModalFooter>
          <Flex gap={5}>
            <Button
              variant="outline"
              colorScheme="red"
              onClick={onSupplierDeleteConfirm}
            >
              Удалить
            </Button>

            <Button variant="outline" colorScheme="blue" onClick={onClose}>
              Отмена
            </Button>
          </Flex>
        </ModalFooter>
      </ModalContent>
    </Modal>
  )
}
