import {
  Button,
  Card,
  CardBody,
  Flex,
  Heading,
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
import { FiAtSign, FiPhone } from "react-icons/fi"
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
  props
) => {
  const { purchaseId, supplier, manager, isOpen, onClose } = props

  const isEmailExists = !!manager.email.trim()
  const isPhoneExists = !!manager.phone_number.trim()

  return (
    <Modal size="xl" isOpen={isOpen} onClose={onClose} isCentered>
      <ModalOverlay backdropFilter="blur(10px)" />

      <ModalContent>
        <ModalHeader>Purchase #{purchaseId} Managers</ModalHeader>
        <ModalCloseButton />

        <ModalBody>
          <Card>
            <CardBody>
              <Flex w="full" direction="column" gap={5}>
                {/* Supplier & Manager names */}
                <Heading size="md">
                  {supplier.name} - {manager.name}
                </Heading>

                {/* Manager Info */}
                <Flex direction="column" gap={2}>
                  {/* Email */}
                  {isEmailExists && (
                    <Flex alignItems="center" gap={2}>
                      <FiAtSign color="gray" />

                      <Text fontSize="md" color="gray">
                        {manager.email}
                      </Text>
                    </Flex>
                  )}

                  {/* Phone */}
                  {isPhoneExists && (
                    <Flex alignItems="center" gap={2}>
                      <FiPhone color="gray" />

                      <Text fontSize="md" color="gray">
                        {manager.phone_number}
                      </Text>
                    </Flex>
                  )}
                </Flex>
              </Flex>
            </CardBody>
          </Card>
        </ModalBody>

        <ModalFooter>
          <Button colorScheme="gray" onClick={onClose}>
            Close
          </Button>
        </ModalFooter>
      </ModalContent>
    </Modal>
  )
}
