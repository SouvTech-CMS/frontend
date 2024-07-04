import {
  AccordionButton,
  AccordionIcon,
  AccordionItem,
  AccordionPanel,
  Flex,
  Grid,
  Table,
  Tbody,
  Text,
  Th,
  Thead,
  Tr,
  useDisclosure,
} from "@chakra-ui/react"
import { PurchaseDocumentsModal } from "component/document/PurchaseDocumentsModal"
import { PurchaseGoodRow } from "component/good/PurchaseGoodRow"
import { PurchaseGoodsStatusUpdateModal } from "component/good/PurchaseGoodsStatusUpdateModal"
import { PurchaseDeleteModal } from "component/purchase/PurchaseDeleteModal"
import { PurchaseRowMenu } from "component/purchase/PurchaseRowMenu"
import { PurchaseSupplierModal } from "component/purchase/PurchaseSupplierModal"
import {
  GOODS_TABLE_COLUMNS,
  PURCHASES_TABLE_COLUMNS,
} from "constant/tableColumns"
import { FC } from "react"
import { FiAlertCircle } from "react-icons/fi"
import { Purchase } from "type/purchase"
import { PurchaseFile } from "type/purchaseFile"
import { PurchaseGood } from "type/purchaseGood"
import { Supplier } from "type/supplier"
import { SupplierManager } from "type/supplierManager"
import { WithId } from "type/withId"

interface PurchaseRowProps {
  purchase: WithId<Purchase>
  goods: WithId<PurchaseGood>[]
  supplier: WithId<Supplier>
  supplier_manager: WithId<SupplierManager>
  files: WithId<PurchaseFile>[]
}

export const PurchaseRow: FC<PurchaseRowProps> = (props) => {
  const { purchase, goods, supplier, supplier_manager, files } = props

  const purchaseDeadline = new Date(purchase.deadline * 1000)

  const {
    isOpen: isDocumentsModalOpen,
    onOpen: onDocumentsModalOpen,
    onClose: onDocumentsModalClose,
  } = useDisclosure()

  const {
    isOpen: isPurchaseDeleteModalOpen,
    onOpen: onPurchaseDeleteModalOpen,
    onClose: onPurchaseDeleteModalClose,
  } = useDisclosure()

  const {
    isOpen: isPurchaseGoodsStatusModalOpen,
    onOpen: onPurchaseGoodsStatusModalOpen,
    onClose: onPurchaseGoodsStatusModalClose,
  } = useDisclosure()

  const {
    isOpen: isSupplierManagerModalOpen,
    onOpen: onSupplierManagerModalOpen,
    onClose: onSupplierManagerModalClose,
  } = useDisclosure()

  const getDeadlineDaysDiff = () => {
    const now = new Date()
    const timeDiff = purchaseDeadline.getTime() - now.getTime()
    // Calculate the difference in days between the current date and the purchase deadline
    const daysDiff = Math.floor(timeDiff / (1000 * 60 * 60 * 24))
    return daysDiff
  }

  const deadlineDaysDiff = getDeadlineDaysDiff()
  const isDeadlineGone = deadlineDaysDiff <= 0
  const isDeadlineComming = deadlineDaysDiff <= 3

  let deadlineBgColor = ""
  if (isDeadlineGone) {
    deadlineBgColor = "red.200"
  } else if (isDeadlineComming) {
    deadlineBgColor = "orange.200"
  }

  return (
    <>
      <AccordionItem>
        {/* Purchase */}
        <AccordionButton>
          <Grid
            position="relative"
            w="full"
            textAlign="left"
            alignItems="center"
            templateColumns={`repeat(${PURCHASES_TABLE_COLUMNS.length}, 1fr)`}
          >
            {/* ID */}
            <Text>{purchase.id}</Text>

            {/* Amount */}
            <Text>${purchase.amount}</Text>

            {/* Shipping */}
            <Text>${purchase.shipping}</Text>

            {/* Deadline */}
            <Flex justifyContent="flex-start">
              <Flex
                w="fit-content"
                bgColor={deadlineBgColor}
                alignItems="center"
                p={2}
                borderRadius={10}
                gap={2}
              >
                {isDeadlineComming && <FiAlertCircle color="red" />}
                <Text>{purchaseDeadline.toDateString()}</Text>
              </Flex>
            </Flex>

            <Flex position="absolute" right={0} alignItems="center" gap={2}>
              <AccordionIcon />

              <PurchaseRowMenu
                onDocuments={onDocumentsModalOpen}
                onSupplierManager={onSupplierManagerModalOpen}
                onStatusUpdate={onPurchaseGoodsStatusModalOpen}
                onDelete={onPurchaseDeleteModalOpen}
              />
            </Flex>
          </Grid>
        </AccordionButton>

        {/* Goods table */}
        <AccordionPanel bgColor="gray.200">
          <Table variant="simple" w="full">
            <Thead>
              <Tr>
                {GOODS_TABLE_COLUMNS.map((columnName) => (
                  <Th key={columnName}>{columnName}</Th>
                ))}
              </Tr>
            </Thead>

            <Tbody>
              {goods.map((good, index) => (
                <PurchaseGoodRow key={index} good={good} />
              ))}
            </Tbody>
          </Table>
        </AccordionPanel>
      </AccordionItem>

      <PurchaseDeleteModal
        purchase={purchase}
        isOpen={isPurchaseDeleteModalOpen}
        onClose={onPurchaseDeleteModalClose}
      />

      <PurchaseDocumentsModal
        purchaseId={purchase.id}
        documents={files}
        isOpen={isDocumentsModalOpen}
        onClose={onDocumentsModalClose}
      />

      <PurchaseGoodsStatusUpdateModal
        purchase={purchase}
        goods={goods}
        isOpen={isPurchaseGoodsStatusModalOpen}
        onClose={onPurchaseGoodsStatusModalClose}
      />

      <PurchaseSupplierModal
        purchaseId={purchase.id}
        supplier={supplier}
        manager={supplier_manager}
        isOpen={isSupplierManagerModalOpen}
        onClose={onSupplierManagerModalClose}
      />
    </>
  )
}
