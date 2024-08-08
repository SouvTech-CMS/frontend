import {
  AccordionButton,
  AccordionIcon,
  AccordionPanel,
  Divider,
  Flex,
  IconButton,
  Text,
  useDisclosure,
} from "@chakra-ui/react"
import { DividerWithTitle } from "component/DividerWithTitle"
import { CommentTooltip } from "component/comment/CommentTooltip"
import { PurchaseDocumentsModal } from "component/document/PurchaseDocumentsModal"
import { PurchaseCardGoodsList } from "component/purchase/PurchaseCardGoodsList"
import { PurchaseDeadlineBadge } from "component/purchase/PurchaseDeadlineBadge"
import { PurchaseDeleteModal } from "component/purchase/PurchaseDeleteModal"
import { PurchaseRowMenu } from "component/purchase/PurchaseRowMenu"
import { PurchaseStatusUpdateModal } from "component/purchase/PurchaseStatusUpdateModal"
import { PurchaseSupplierModal } from "component/purchase/PurchaseSupplierModal"
import { useCommentInput } from "hook/useCommentInput"
import { FC } from "react"
import { FiFileText } from "react-icons/fi"
import { FullPurchase } from "type/purchase/purchase"
import {
  numberWithCurrency,
  roundNumber,
  timestampToDate,
} from "util/formatting"
interface PurchaseColumnCardProps {
  purchase: FullPurchase
  status: string
}

export const PurchaseColumnCard: FC<PurchaseColumnCardProps> = (props) => {
  const { purchase, status } = props

  const purchaseId = purchase.id
  const goods = purchase.goods.filter((good) => !good.in_delivery)
  const manager = purchase.manager
  const supplier = manager.supplier
  const files = purchase.files

  const purchaseDeadline = timestampToDate(purchase.deadline)

  const { comment } = useCommentInput({
    objectName: "purchase",
    objectId: purchaseId,
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
              Order #{purchaseId}
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
            <DividerWithTitle title="Goods" />

            <Flex direction="column" gap={2}>
              <PurchaseCardGoodsList goods={goods} />

              <Text fontWeight="semibold">
                Total amount: {numberWithCurrency(roundNumber(purchase.amount))}
              </Text>
            </Flex>

            <Divider />
          </Flex>
        </AccordionPanel>

        <Flex alignItems="center" px={2} gap={5}>
          <PurchaseDeadlineBadge deadline={purchaseDeadline} />
        </Flex>
      </Flex>

      {/* Purchase Modals */}
      <>
        <PurchaseDeleteModal
          purchaseId={purchaseId}
          isOpen={isPurchaseDeleteModalOpen}
          onClose={onPurchaseDeleteModalClose}
        />

        <PurchaseDocumentsModal
          purchaseId={purchaseId}
          documents={files}
          isOpen={isDocumentsModalOpen}
          onClose={onDocumentsModalClose}
        />

        <PurchaseStatusUpdateModal
          purchase={purchase}
          prevStatus={status}
          isOpen={isPurchaseGoodsStatusModalOpen}
          onClose={onPurchaseGoodsStatusModalClose}
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
