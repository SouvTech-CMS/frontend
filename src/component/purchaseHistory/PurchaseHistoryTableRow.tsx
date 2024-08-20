import { Collapse, Flex, Td, Text, Tr } from "@chakra-ui/react"
import { PurchaseStatusBadge } from "component/PurchaseStatusBadge"
import { CollapseBtn } from "component/purchaseHistory/CollapseBtn"
import { DeliveriesHistoryTable } from "component/purchaseHistory/DeliveryHistoryTable"
import { PURCHASES_HISTORY_TABLE } from "constant/tables"
import { FC, useState } from "react"
import { PurchaseHistory } from "type/purchase/purchaseHistory"
import {
  numberWithCurrency,
  roundNumber,
  timestampToDate,
} from "util/formatting"

interface PurchasesHistoryTableRowProps {
  purchase: PurchaseHistory
}

export const PurchasesHistoryTableRow: FC<PurchasesHistoryTableRowProps> = (
  props,
) => {
  const { purchase } = props

  const [isExpanded, setIsExpanded] = useState<boolean>(false)

  const isDeliveriesExist = purchase.deliveries.length > 0
  const purchaseCreatedAtDate = timestampToDate(purchase.created_at)

  return (
    <>
      {/* Purchase Data */}
      <Tr>
        {/* Name */}
        <Td>
          <Flex alignItems="center" gap={2}>
            <CollapseBtn
              isExpanded={isExpanded}
              setIsExpanded={setIsExpanded}
              isDisabled={!isDeliveriesExist}
            />

            <Text>Order #{purchase.id}</Text>
          </Flex>
        </Td>

        {/* Amount */}
        <Td>
          <Text>{numberWithCurrency(roundNumber(purchase.amount))}</Text>
        </Td>

        {/* Status */}
        <Td>
          <PurchaseStatusBadge status={purchase.status} />
        </Td>

        {/* Created At */}
        <Td>
          <Text>{purchaseCreatedAtDate.toDateString()}</Text>
        </Td>

        {/* Row Btns */}
        <Td>
          <Flex></Flex>
        </Td>
      </Tr>

      {/* Deliveries Table */}
      {isDeliveriesExist && (
        <Tr>
          <Td colSpan={PURCHASES_HISTORY_TABLE.length} p={0}>
            <Collapse in={isExpanded} animateOpacity>
              <DeliveriesHistoryTable deliveryHistory={purchase.deliveries} />
            </Collapse>
          </Td>
        </Tr>
      )}
    </>
  )
}
