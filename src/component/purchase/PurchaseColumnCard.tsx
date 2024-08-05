import {
  AccordionButton,
  AccordionIcon,
  AccordionPanel,
  Flex,
  IconButton,
  ListItem,
  Text,
  UnorderedList,
  useDisclosure,
} from "@chakra-ui/react"
import { CommentTooltip } from "component/comment/CommentTooltip"
import { PurchaseDocumentsModal } from "component/document/PurchaseDocumentsModal"
import { PurchaseDeadlineBadge } from "component/purchase/PurchaseDeadlineBadge"
import { PurchaseDeleteModal } from "component/purchase/PurchaseDeleteModal"
import { PurchaseRowMenu } from "component/purchase/PurchaseRowMenu"
import { PurchaseSupplierModal } from "component/purchase/PurchaseSupplierModal"
import { PurchaseGoodCard } from "component/purchaseGood/PurchaseGoodCard"
import { PurchaseGoodsStatusUpdateModal } from "component/purchaseGood/PurchaseGoodsStatusUpdateModal"
import { useCommentInput } from "hook/useCommentInput"
import { FC } from "react"
import { FiFileText } from "react-icons/fi"
import { FullPurchase } from "type/purchase"
import {
  numberWithCurrency,
  roundNumber,
  timestampToDate,
} from "util/formatting"

interface PurchaseColumnCardProps {
  purchaseData: FullPurchase
  status: string
}

export const PurchaseColumnCard: FC<PurchaseColumnCardProps> = (props) => {
  const { purchaseData, status } = props

  const purchase = purchaseData.purchase
  const files = purchaseData.files
  const goods = purchaseData.goods.filter((good) => good.status === status)
  const supplier = purchaseData.supplier
  const supplierManager = purchaseData.supplier_manager

  const purchaseDeadline = timestampToDate(purchase.deadline)

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
      <Flex
        w="full"
        direction="column"
        bgColor="white"
        p={2}
        borderRadius={10}
        gap={2}
      >
        {/* Purchase Card Header */}
        <Flex w="full" justifyContent="space-between" alignItems="center">
          <Flex alignItems="center" gap={1}>
            <AccordionButton w="fit-content" p={2} borderRadius={5}>
              <AccordionIcon />
            </AccordionButton>

            {/* Purchase ID */}
            <Text fontSize="lg" fontWeight="semibold">
              Order #{purchase.id}
            </Text>
          </Flex>

          <Flex alignItems="center" gap={1}>
            {/* Comment */}
            {isCommentExists && <CommentTooltip comment={comment} />}

            {/* Documents */}
            <IconButton
              aria-label="documents-icon-btn"
              size="sm"
              variant="ghost"
              icon={<FiFileText />}
              onClick={onDocumentsModalOpen}
            />

            <PurchaseRowMenu
              onDocuments={onDocumentsModalOpen}
              onSupplierManager={onSupplierManagerModalOpen}
              onStatusUpdate={onPurchaseGoodsStatusModalOpen}
              onDelete={onPurchaseDeleteModalOpen}
            />
          </Flex>
        </Flex>

        {/* Card Content with Goods */}
        <AccordionPanel>
          <Flex direction="column" gap={5}>
            <UnorderedList>
              {goods.map((good, index) => (
                <ListItem key={index}>
                  <PurchaseGoodCard good={good} />
                </ListItem>
              ))}
            </UnorderedList>

            <Text fontWeight="semibold">
              Total amount: {numberWithCurrency(roundNumber(purchase.amount))}
            </Text>
          </Flex>
        </AccordionPanel>

        <Flex alignItems="center" px={2} gap={5}>
          <PurchaseDeadlineBadge
            type="Purchase"
            goods={goods}
            deadline={purchaseDeadline}
          />
        </Flex>
      </Flex>

      {/* Purchase Modals */}
      <>
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
          prevStatus={status}
          isOpen={isPurchaseGoodsStatusModalOpen}
          onClose={onPurchaseGoodsStatusModalClose}
        />

        <PurchaseSupplierModal
          purchaseId={purchase.id}
          supplier={supplier}
          manager={supplierManager}
          isOpen={isSupplierManagerModalOpen}
          onClose={onSupplierManagerModalClose}
        />
      </>
    </>
  )
}
