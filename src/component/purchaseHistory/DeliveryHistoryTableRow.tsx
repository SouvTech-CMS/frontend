import { Td, Text, Tr, useDisclosure } from "@chakra-ui/react"
import { PurchaseStatusBadge } from "component/PurchaseStatusBadge"
import { DeliveryDocumentsModal } from "component/document/DeliveryDocumentsModal"
import { PurchaseDeliveryGoodsModal } from "component/purchaseDelivery/PurchaseDeliveryGoodsModal"
import { DeliveryHistoryRowMenu } from "component/purchaseHistory/DeliveryHistoryRowMenu"
import { FC } from "react"
import { DeliveryHistory } from "type/purchaseDelivery/deliveryHistory"
import {
  numberWithCurrency,
  roundNumber,
  timestampToDate,
} from "util/formatting"

interface DeliveriesHistoryTableRowProps {
  delivery: DeliveryHistory
}

export const DeliveriesHistoryTableRow: FC<DeliveriesHistoryTableRowProps> = (
  props,
) => {
  const { delivery } = props

  const deliveryId = delivery.id
  const allDocumentsList = delivery.files
  const goods = delivery.goods

  const deliveryCreatedAtDate = timestampToDate(delivery.created_at)

  const {
    isOpen: isDocumentsModalOpen,
    onOpen: onDocumentsModalOpen,
    onClose: onDocumentsModalClose,
  } = useDisclosure()

  const {
    isOpen: isDeliveryGoodsModalOpen,
    onOpen: onDeliveryGoodsModalOpen,
    onClose: onDeliveryGoodsModalClose,
  } = useDisclosure()

  return (
    <>
      <Tr>
        {/* Name */}
        <Td>
          <Text>Delivery #{delivery.id}</Text>
        </Td>

        {/* Shipping */}
        <Td>
          <Text>{numberWithCurrency(roundNumber(delivery.shipping))}</Text>
        </Td>

        {/* Shipping After Custom */}
        <Td>
          <Text>
            {numberWithCurrency(roundNumber(delivery.after_custom_shipping))}
          </Text>
        </Td>

        {/* Track Number */}
        <Td>
          <Text>{delivery.track_number}</Text>
        </Td>

        {/* Track Number After Custom */}
        <Td>
          <Text>{delivery.after_custom_track_number}</Text>
        </Td>

        {/* Status */}
        <Td>
          <PurchaseStatusBadge status={delivery.status} />
        </Td>

        {/* Created At */}
        <Td>
          <Text>{deliveryCreatedAtDate.toDateString()}</Text>
        </Td>

        {/* Row Btns */}
        <Td>
          <DeliveryHistoryRowMenu
            onDocuments={onDocumentsModalOpen}
            onGoods={onDeliveryGoodsModalOpen}
          />
        </Td>
      </Tr>

      {/* Delivery Modals */}
      <>
        <DeliveryDocumentsModal
          deliveryId={deliveryId}
          documents={allDocumentsList}
          isOpen={isDocumentsModalOpen}
          onClose={onDocumentsModalClose}
        />

        <PurchaseDeliveryGoodsModal
          deliveryId={deliveryId}
          goods={goods}
          isOpen={isDeliveryGoodsModalOpen}
          onClose={onDeliveryGoodsModalClose}
        />
      </>
    </>
  )
}
