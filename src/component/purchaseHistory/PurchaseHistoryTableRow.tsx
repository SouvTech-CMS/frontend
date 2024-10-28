import { Collapse, Flex, Td, Text, Tr, useDisclosure } from "@chakra-ui/react"
import { PurchaseStatusBadge } from "component/PurchaseStatusBadge"
import { PurchaseDocumentsModal } from "component/document/PurchaseDocumentsModal"
import { PurchaseGoodsModal } from "component/purchase/PurchaseGoodsModal"
import { PurchaseSupplierModal } from "component/purchase/PurchaseSupplierModal"
import { CollapseBtn } from "component/purchaseHistory/CollapseBtn"
import { DeliveriesHistoryTable } from "component/purchaseHistory/DeliveryHistoryTable"
import { PurchaseHistoryRowMenu } from "component/purchaseHistory/PurchaseHistoryRowMenu"
import { PurchaseServicesModal } from "component/purchaseService/PurchaseServicesModal"
import { PURCHASES_HISTORY_TABLE } from "constant/tables"
import { useUserContext } from "context/user"
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

  const { isUserAdmin } = useUserContext()

  const purchaseId = purchase.id

  const files = purchase.files
  const goods = purchase.goods
  const manager = purchase.manager
  const supplier = manager.supplier

  const [isExpanded, setIsExpanded] = useState<boolean>(false)

  const isDeliveriesExist = purchase.deliveries.length > 0
  const purchaseCreatedAtDate = timestampToDate(purchase.created_at)

  // Documents
  const {
    isOpen: isDocumentsModalOpen,
    onOpen: onDocumentsModalOpen,
    onClose: onDocumentsModalClose,
  } = useDisclosure()

  // Goods
  const {
    isOpen: isPurchaseGoodsModalOpen,
    onOpen: onPurchaseGoodsModalOpen,
    onClose: onPurchaseGoodsModalClose,
  } = useDisclosure()

  // Services
  const {
    isOpen: isServicesModalOpen,
    onOpen: onServicesModalOpen,
    onClose: onServicesModalClose,
  } = useDisclosure()

  // Supplier & Manager
  const {
    isOpen: isSupplierManagerModalOpen,
    onOpen: onSupplierManagerModalOpen,
    onClose: onSupplierManagerModalClose,
  } = useDisclosure()

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
          <PurchaseHistoryRowMenu
            onDocuments={onDocumentsModalOpen}
            onGoods={onPurchaseGoodsModalOpen}
            onServices={onServicesModalOpen}
            onSupplierManager={onSupplierManagerModalOpen}
          />
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

      {/* Purchase Modals */}
      <>
        <PurchaseDocumentsModal
          purchaseId={purchaseId}
          documents={files}
          isOpen={isDocumentsModalOpen}
          onClose={onDocumentsModalClose}
          isReadOnly={!isUserAdmin}
        />

        <PurchaseGoodsModal
          purchaseId={purchaseId}
          goods={goods}
          isOpen={isPurchaseGoodsModalOpen}
          onClose={onPurchaseGoodsModalClose}
          isReadOnly={!isUserAdmin}
        />

        <PurchaseServicesModal
          purchaseId={purchaseId}
          isOpen={isServicesModalOpen}
          onClose={onServicesModalClose}
          isReadOnly={!isUserAdmin}
        />

        <PurchaseSupplierModal
          purchaseId={purchaseId}
          supplier={supplier}
          manager={manager}
          isOpen={isSupplierManagerModalOpen}
          onClose={onSupplierManagerModalClose}
        />
      </>
    </>
  )
}
