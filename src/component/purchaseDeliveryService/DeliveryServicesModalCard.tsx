import {
  Badge,
  Button,
  Card,
  CardHeader,
  Flex,
  Heading,
  IconButton,
  Text,
  useDisclosure,
} from "@chakra-ui/react"
import { PurchaseServiceDeleteModal } from "component/purchaseService/PurchaseServiceDeleteModal"
import { PurchaseServiceModal } from "component/purchaseService/PurchaseServiceModal"
import { FC } from "react"
import { FiTrash2 } from "react-icons/fi"
import { PurchaseService } from "type/purchase/purchaseService"
import { WithId } from "type/withId"
import { numberWithCurrency } from "util/formatting"

interface DeliveryServicesModalCardProps {
  service: WithId<PurchaseService>
}

export const DeliveryServicesModalCard: FC<DeliveryServicesModalCardProps> = (
  props,
) => {
  const { service } = props

  const isPurchaseService = service.purchase_id !== undefined
  const serviceId = service.id

  const discountAsNumber = parseFloat(service.discount || "") || undefined
  const isDiscountExists = discountAsNumber !== undefined
  const isDiscountPercentage = service.discount?.includes("%")

  const {
    isOpen: isServiceEditModalOpen,
    onOpen: onServiceEditModalOpen,
    onClose: onServiceEditModalClose,
  } = useDisclosure()

  const {
    isOpen: isServiceDeleteModalOpen,
    onOpen: onServiceDeleteModalOpen,
    onClose: onServiceDeleteModalClose,
  } = useDisclosure()

  return (
    <>
      <Card boxShadow="md" borderRadius={10}>
        <CardHeader>
          <Flex direction="column" gap={2}>
            {/* Purchase ID */}
            {isPurchaseService && (
              <Flex>
                <Badge colorScheme="blue">Order #{service.purchase_id}</Badge>
              </Flex>
            )}

            {/* Service Info */}
            <Flex justifyContent="space-between">
              <Flex direction="column" gap={2}>
                {/* ID & Name */}
                <Flex alignItems="center" gap={5}>
                  <Heading size="md">{service.name}</Heading>
                </Flex>
              </Flex>

              {/* Side Badges */}
              <Flex direction="column" gap={2}>
                {/* Total Amount */}
                <Badge fontSize="sm">
                  <Flex justifyContent="space-between" gap={2}>
                    <Text>Amount: </Text>
                    <Text>${service.total_amount}</Text>
                  </Flex>
                </Badge>

                {/* Discount */}
                {isDiscountExists && (
                  <Badge fontSize="sm">
                    <Flex justifyContent="space-between" gap={2}>
                      <Text>Discount: </Text>
                      <Text>
                        {isDiscountPercentage
                          ? service.discount
                          : numberWithCurrency(discountAsNumber)}
                      </Text>
                    </Flex>
                  </Badge>
                )}
              </Flex>
            </Flex>

            {/* Edit & Delete Btns */}
            {!isPurchaseService && (
              <Flex w="full" gap={2}>
                {/* Edit Btn */}
                <Button
                  w="full"
                  variant="ghost"
                  colorScheme="blue"
                  onClick={onServiceEditModalOpen}
                >
                  Edit
                </Button>

                {/* Delete */}
                <IconButton
                  aria-label="delete-service"
                  variant="ghost"
                  colorScheme="red"
                  icon={<FiTrash2 />}
                  onClick={onServiceDeleteModalOpen}
                />
              </Flex>
            )}
          </Flex>
        </CardHeader>
      </Card>

      {/* Modals */}
      <>
        <PurchaseServiceModal
          prevService={service}
          isOpen={isServiceEditModalOpen}
          onClose={onServiceEditModalClose}
          isDelivery
        />

        <PurchaseServiceDeleteModal
          serviceId={serviceId}
          isOpen={isServiceDeleteModalOpen}
          onClose={onServiceDeleteModalClose}
          isDelivery
        />
      </>
    </>
  )
}
