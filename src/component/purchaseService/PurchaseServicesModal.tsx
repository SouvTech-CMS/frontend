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
import { getPurchaseServices } from "api/purchase/purchaseService"
import { ModalBackgroundBlur } from "component/ModalBackgroundBlur"
import { PurchaseServiceModal } from "component/purchaseService/PurchaseServiceModal"
import { PurchaseServicesModalCard } from "component/purchaseService/PurchaseServicesModalCard"
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

  const { data: servicesList, isLoading } = useQuery<WithId<PurchaseService>[]>(
    ["purchaseServicesList", purchaseId],
    () => getPurchaseServices(purchaseId),
  )

  const {
    isOpen: isServiceCreateModalOpen,
    onOpen: onServiceCreateModalOpen,
    onClose: onServiceCreateModalClose,
  } = useDisclosure()

  return (
    <>
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

              {/* TODO: add creating new service to existing purchase, not priority */}
            </Flex>
          </ModalBody>

          <ModalFooter>
            <Flex w="full" gap={2}>
              <Button
                w="full"
                onClick={onServiceCreateModalOpen}
                isLoading={isLoading}
              >
                Add service
              </Button>

              <Button
                variant="secondary"
                onClick={onClose}
                isLoading={isLoading}
              >
                Close
              </Button>
            </Flex>
          </ModalFooter>
        </ModalContent>
      </Modal>

      <PurchaseServiceModal
        purchaseId={purchaseId}
        isOpen={isServiceCreateModalOpen}
        onClose={onServiceCreateModalClose}
      />
    </>
  )
}
