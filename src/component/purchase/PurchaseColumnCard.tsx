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
import { PurchaseGoodsModal } from "component/purchase/PurchaseGoodsModal"
import { PurchaseRowMenu } from "component/purchase/PurchaseRowMenu"
import { PurchaseServicesModal } from "component/purchaseService/PurchaseServicesModal"
import { PurchaseStatusUpdateModal } from "component/purchase/PurchaseStatusUpdateModal"
import { PurchaseSupplierModal } from "component/purchase/PurchaseSupplierModal"
import { PurchaseUpdateModal } from "component/purchase/PurchaseUpdateModal"
import { useCommentInput } from "hook/useCommentInput"
import { FC } from "react"
import { FiFileText } from "react-icons/fi"
import { FullPurchase } from "type/purchase/purchase"
import {
  numberWithCurrency,
  roundNumber,
  timestampToDate,
} from "util/formatting"
import { isGoodFullInDelivery } from "util/purchaseGood"

interface PurchaseColumnCardProps {
  purchase: FullPurchase
  status: string
}

export const PurchaseColumnCard: FC<PurchaseColumnCardProps> = (props) => {
  const { purchase, status } = props

  const purchaseId = purchase.id
  const goods = purchase.goods.filter((good) => !isGoodFullInDelivery(good))
  const manager = purchase.manager
  const managerId = manager.id
  const supplier = manager.supplier
  const files = purchase.files

  const goodsAmount = purchase.goods.reduce(
    (total, good) => total + good.amount,
    0,
  )

  const totalAmount = goodsAmount

  const purchaseDeadline = timestampToDate(purchase.deadline)

  const isDepositExists = purchase.deposit !== undefined

  const { comment } = useCommentInput({
    objectName: "purchase",
    objectId: purchaseId,
  })

  const isCommentExists = !!comment.trim()

  // Documents
  const {
    isOpen: isDocumentsModalOpen,
    onOpen: onDocumentsModalOpen,
    onClose: onDocumentsModalClose,
  } = useDisclosure()

  // Goods
  const {
    isOpen: isGoodsModalOpen,
    onOpen: onGoodsModalOpen,
    onClose: onGoodsModalClose,
  } = useDisclosure()

  // Services
  const {
    isOpen: isServicesModalOpen,
    onOpen: onServicesModalOpen,
    onClose: onServicesModalClose,
  } = useDisclosure()

  // Status & Deadline
  const {
    isOpen: isPurchaseGoodsStatusModalOpen,
    onOpen: onPurchaseGoodsStatusModalOpen,
    onClose: onPurchaseGoodsStatusModalClose,
  } = useDisclosure()

  // Manager
  const {
    isOpen: isSupplierManagerModalOpen,
    onOpen: onSupplierManagerModalOpen,
    onClose: onSupplierManagerModalClose,
  } = useDisclosure()

  // Edit
  const {
    isOpen: isPurchaseUpdateModalOpen,
    onOpen: onPurchaseUpdateModalOpen,
    onClose: onPurchaseUpdateModalClose,
  } = useDisclosure()

  // Delete
  const {
    isOpen: isPurchaseDeleteModalOpen,
    onOpen: onPurchaseDeleteModalOpen,
    onClose: onPurchaseDeleteModalClose,
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

          {/* Menu Btns */}
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

            {/* Menu Btn */}
            <PurchaseRowMenu
              onDocuments={onDocumentsModalOpen}
              onGoods={onGoodsModalOpen}
              onServices={onServicesModalOpen}
              onSupplierManager={onSupplierManagerModalOpen}
              onStatusUpdate={onPurchaseGoodsStatusModalOpen}
              onEdit={onPurchaseUpdateModalOpen}
              onDelete={onPurchaseDeleteModalOpen}
            />
          </Flex>
        </Flex>

        {/* Card Content with Goods */}
        <AccordionPanel>
          <Flex direction="column" gap={5}>
            {/* Deposit */}
            {isDepositExists && (
              <Flex alignItems="center" gap={2} fontWeight="semibold">
                <Text>Deposit:</Text>
                <Text>{numberWithCurrency(roundNumber(purchase.deposit))}</Text>
              </Flex>
            )}

            <DividerWithTitle title="Goods" />

            <Flex direction="column" gap={2}>
              <PurchaseCardGoodsList goods={goods} />

              <Text fontWeight="semibold">
                Total amount: {numberWithCurrency(roundNumber(totalAmount))}
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

        <PurchaseGoodsModal
          purchaseId={purchaseId}
          goods={goods}
          isOpen={isGoodsModalOpen}
          onClose={onGoodsModalClose}
        />

        <PurchaseServicesModal
          purchaseId={purchaseId}
          isOpen={isServicesModalOpen}
          onClose={onServicesModalClose}
        />

        <PurchaseStatusUpdateModal
          purchase={purchase}
          managerId={managerId}
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

        <PurchaseUpdateModal
          prevPurchase={purchase}
          prevSupplierId={supplier.id}
          prevManagerId={managerId}
          isOpen={isPurchaseUpdateModalOpen}
          onClose={onPurchaseUpdateModalClose}
        />
      </>
    </>
  )
}
