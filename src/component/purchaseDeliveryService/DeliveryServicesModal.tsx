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
import { getPurchaseServicesByPurchaseIds } from "api/purchase/purchaseService"
import { getDeliveryServices } from "api/purchaseDelivery/purchaseDeliveryService"
import { ModalBackgroundBlur } from "component/ModalBackgroundBlur"
import { DeliveryServicesModalCard } from "component/purchaseDeliveryService/DeliveryServicesModalCard"
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

  const {
    data: deliveryServicesList,
    // isLoading: isDeliveryServicesLoading
  } = useQuery<WithId<PurchaseService>[]>(
    ["deliveryServicesList", deliveryId],
    () => getDeliveryServices(deliveryId),
  )
  const isDeliveryServicesExist = deliveryServicesList !== undefined

  const {
    data: purchasesListServices,
    // isLoading: isPurchasesListServicesLoading,
  } = useQuery<WithId<PurchaseService>[]>(
    ["purchasesListServices", purchasesIds],
    () => getPurchaseServicesByPurchaseIds(purchasesIds),
  )
  const isPurchasesServicesExist = purchasesListServices !== undefined

  // const isLoading = isDeliveryServicesLoading || isPurchasesListServicesLoading

  // Combine services to one list
  const servicesList = [
    ...(isDeliveryServicesExist ? deliveryServicesList ?? [] : []),
    ...(isPurchasesServicesExist ? purchasesListServices ?? [] : []),
  ]

  return (
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
          <Button variant="secondary" onClick={onClose}>
            Close
          </Button>
        </ModalFooter>
      </ModalContent>
    </Modal>
  )
}
