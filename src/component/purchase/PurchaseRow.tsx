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
import { CommentTooltip } from "component/CommentTooltip"
import { PurchaseDocumentsModal } from "component/document/PurchaseDocumentsModal"
import { PurchaseGoodRow } from "component/purchaseGood/PurchaseGoodRow"
import { PurchaseGoodsStatusUpdateModal } from "component/purchaseGood/PurchaseGoodsStatusUpdateModal"
import { PurchaseDeadlineBadge } from "component/purchase/PurchaseDeadlineBadge"
import { PurchaseDeleteModal } from "component/purchase/PurchaseDeleteModal"
import { PurchaseRowMenu } from "component/purchase/PurchaseRowMenu"
import { PurchaseSupplierModal } from "component/purchase/PurchaseSupplierModal"
import { GOODS_TABLE_COLUMNS, PURCHASES_TABLE_COLUMNS } from "constant/tables"
import { useCommentInput } from "hook/useCommentInput"
import { FC } from "react"
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

  const { comment } = useCommentInput({
    objectName: "purchase",
    objectId: purchase.id,
  })

  const isCommentExists = !!comment.trim()

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
              <PurchaseDeadlineBadge
                goods={goods}
                deadline={purchaseDeadline}
              />
            </Flex>

            {/* Menu Btns */}
            <Flex
              position="absolute"
              right={0}
              h="full"
              alignItems="center"
              gap={2}
            >
              {isCommentExists && <CommentTooltip comment={comment} />}

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
