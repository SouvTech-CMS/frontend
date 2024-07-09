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
  useDisclosure,
} from "@chakra-ui/react"
import { getManagersBySupplierId } from "api/supplierManager"
import { ManagerCard } from "component/manager/ManagerCard"
import { NewManagerModal } from "component/manager/NewManagerModal"
import { FC } from "react"
import { useQuery } from "react-query"
import { ModalProps } from "type/modalProps"
import { SupplierManager } from "type/supplierManager"
import { WithId } from "type/withId"

interface SupplierManagersModalProps extends ModalProps {
  supplierId: number
}

export const SupplierManagersModal: FC<SupplierManagersModalProps> = (
  props
) => {
  const { supplierId, isOpen, onClose } = props

  const { data: managersList } = useQuery<WithId<SupplierManager>[]>(
    ["supplierManagersList", supplierId],
    () => getManagersBySupplierId(supplierId)
  )

  const {
    isOpen: isNewManagerModalOpen,
    onOpen: onNewManagerModalOpen,
    onClose: onNewManagerModalClose,
  } = useDisclosure()

  return (
    <>
      <Modal size="xl" isOpen={isOpen} onClose={onClose} isCentered>
        <ModalOverlay backdropFilter="blur(10px)" />

        <ModalContent>
          <ModalHeader>Managers</ModalHeader>
          <ModalCloseButton />

          <ModalBody>
            <Flex w="full" direction="column" gap={5}>
              {managersList?.map((manager, index) => (
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

      <NewManagerModal
        supplierId={supplierId}
        isOpen={isNewManagerModalOpen}
        onClose={onNewManagerModalClose}
      />
    </>
  )
}
