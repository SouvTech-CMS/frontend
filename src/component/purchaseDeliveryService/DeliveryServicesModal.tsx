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
}

export const DeliveryServicesModal: FC<DeliveryServicesModalProps> = (
  props,
) => {
  const { deliveryId, isOpen, onClose } = props

  const { data: servicesList } = useQuery<WithId<PurchaseService>[]>(
    ["deliveryServicesList", deliveryId],
    () => getDeliveryServices(deliveryId),
  )

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
