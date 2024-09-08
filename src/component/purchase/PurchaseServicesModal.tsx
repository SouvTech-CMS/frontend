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
import { getPurchaseServices } from "api/purchase/purchaseService"
import { ModalBackgroundBlur } from "component/ModalBackgroundBlur"
import { PurchaseServicesModalCard } from "component/purchase/PurchaseServicesModalCard"
import { FC } from "react"
import { useQuery } from "react-query"
import { ModalProps } from "type/modalProps"
import { PurchaseService } from "type/purchase/purchaseService"
import { WithId } from "type/withId"

interface PurchaseServicesModalProps extends ModalProps {
  purchaseId: number
}

export const PurchaseServicesModal: FC<PurchaseServicesModalProps> = (
  props,
) => {
  const { purchaseId, isOpen, onClose } = props

  const { data: servicesList } = useQuery<WithId<PurchaseService>[]>(
    ["purchaseServicesList", purchaseId],
    () => getPurchaseServices(purchaseId),
  )

  return (
    <Modal size="xl" isOpen={isOpen} onClose={onClose} isCentered>
      <ModalBackgroundBlur />

      <ModalContent>
        <ModalHeader>Purchase #{purchaseId} Services</ModalHeader>
        <ModalCloseButton />

        <ModalBody>
          <Flex direction="column" gap={2}>
            {servicesList?.map((service, index) => (
              <PurchaseServicesModalCard key={index} service={service} />
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
