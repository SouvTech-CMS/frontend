import { Td, Text, Tr, useDisclosure } from "@chakra-ui/react"
import { NewPurchaseServiceModal } from "component/purchaseService/NewPurchaseServiceModal"
import { NewPurchaseServiceRowMenu } from "component/purchaseService/NewPurchaseServiceRowMenu"
import { FC } from "react"
import { PurchaseService } from "type/purchase/purchaseService"
import { numberWithCurrency } from "util/formatting"

interface NewPurchaseServiceRowProps {
  service: PurchaseService
  onEdit: (service: PurchaseService) => void
  onRemove: (service: PurchaseService) => void
}

export const NewPurchaseServiceRow: FC<NewPurchaseServiceRowProps> = (
  props,
) => {
  const { service, onEdit, onRemove } = props

  const discountAsNumber = parseFloat(service.discount || "") || undefined
  const isDiscountExists = discountAsNumber !== undefined
  const isDiscountPercentage = service.discount?.includes("%")

  const {
    isOpen: isNewServiceEditModalOpen,
    onOpen: onNewServiceEditModalOpen,
    onClose: onNewServiceEditModalClose,
  } = useDisclosure()

  const handleUpdate = (service: PurchaseService) => {
    onEdit(service)
    onNewServiceEditModalClose()
  }

  const handleRemove = () => {
    onRemove(service)
  }

  return (
    <>
      <Tr position="relative" fontWeight="semibold">
        {/* Name */}
        <Td>
          <Text>{service.name}</Text>
        </Td>

        {/* Total Amount */}
        <Td>
          <Text>{numberWithCurrency(service.total_amount)}</Text>
        </Td>

        {/* Discount */}
        <Td>
          {isDiscountExists && (
            <Text>
              {isDiscountPercentage
                ? service.discount
                : numberWithCurrency(discountAsNumber)}
            </Text>
          )}
        </Td>

        {/* Remove Service Btn */}
        <Td>
          <NewPurchaseServiceRowMenu
            onEdit={onNewServiceEditModalOpen}
            onRemove={handleRemove}
          />
        </Td>
      </Tr>

      <NewPurchaseServiceModal
        prevService={service}
        onAddService={handleUpdate}
        isOpen={isNewServiceEditModalOpen}
        onClose={onNewServiceEditModalClose}
      />
    </>
  )
}
