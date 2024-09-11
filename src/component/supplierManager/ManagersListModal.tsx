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
import { ManagerCard } from "component/supplierManager/ManagerCard"
import { ManagerModal } from "component/supplierManager/ManagerModal"
import { FC } from "react"
import { ModalProps } from "type/modalProps"
import { SupplierManager } from "type/supplier/supplierManager"
import { WithId } from "type/withId"

interface SupplierManagersModalProps extends ModalProps {
  supplierId: number
  managers: WithId<SupplierManager>[]
}

export const SupplierManagersModal: FC<SupplierManagersModalProps> = (
  props,
) => {
  const { supplierId, managers, isOpen, onClose } = props

  const {
    isOpen: isNewManagerModalOpen,
    onOpen: onNewManagerModalOpen,
    onClose: onNewManagerModalClose,
  } = useDisclosure()

  return (
    <>
      <Modal size="xl" isOpen={isOpen} onClose={onClose} isCentered>
        <ModalBackgroundBlur />

        <ModalContent>
          <ModalHeader>Managers</ModalHeader>
          <ModalCloseButton />

          <ModalBody>
            <Flex w="full" direction="column" gap={5}>
              {managers?.map((manager, index) => (
                <ManagerCard key={index} manager={manager} />
              ))}
            </Flex>
          </ModalBody>

          <ModalFooter>
            <Button w="full" colorScheme="blue" onClick={onNewManagerModalOpen}>
              Add manager
            </Button>
          </ModalFooter>
        </ModalContent>
      </Modal>

      <ManagerModal
        supplierId={supplierId}
        isOpen={isNewManagerModalOpen}
        onClose={onNewManagerModalClose}
      />
    </>
  )
}
