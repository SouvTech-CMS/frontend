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
import { getPurchaseServicesByPurchaseIds } from "api/purchase/purchaseService"
import { getDeliveryServices } from "api/purchaseDelivery/purchaseDeliveryService"
import { ModalBackgroundBlur } from "component/ModalBackgroundBlur"
import { DeliveryServicesModalCard } from "component/purchaseDeliveryService/DeliveryServicesModalCard"
import { PurchaseServiceModal } from "component/purchaseService/PurchaseServiceModal"
import { FC } from "react"
import { useQuery } from "react-query"
import { ModalProps } from "type/modalProps"
import { PurchaseService } from "type/purchase/purchaseService"
import { WithId } from "type/withId"

interface DeliveryServicesModalProps extends ModalProps {
  deliveryId: number
  purchasesIds: number[]
}

export const DeliveryServicesModal: FC<DeliveryServicesModalProps> = (
  props,
) => {
  const { deliveryId, purchasesIds, isOpen, onClose } = props

  const { data: deliveryServicesList, isLoading: isDeliveryServicesLoading } =
    useQuery<WithId<PurchaseService>[]>(
      ["deliveryServicesList", deliveryId],
      () => getDeliveryServices(deliveryId),
    )
  const isDeliveryServicesExist = deliveryServicesList !== undefined

  const {
    data: purchasesListServices,
    isLoading: isPurchasesListServicesLoading,
  } = useQuery<WithId<PurchaseService>[]>(
    ["purchasesListServices", purchasesIds],
    () => getPurchaseServicesByPurchaseIds(purchasesIds),
  )
  const isPurchasesServicesExist = purchasesListServices !== undefined

  const isLoading = isDeliveryServicesLoading || isPurchasesListServicesLoading

  // Combine services to one list
  const servicesList = [
    ...(isDeliveryServicesExist ? deliveryServicesList ?? [] : []),
    ...(isPurchasesServicesExist ? purchasesListServices ?? [] : []),
  ]

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
          <ModalHeader>Delivery #{deliveryId} Services</ModalHeader>
          <ModalCloseButton />

          <ModalBody>
            <Flex direction="column" gap={2}>
              {servicesList?.map((service, index) => (
                <DeliveryServicesModalCard key={index} service={service} />
              ))}
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
        deliveryId={deliveryId}
        isOpen={isServiceCreateModalOpen}
        onClose={onServiceCreateModalClose}
        isDelivery
      />
    </>
  )
}
