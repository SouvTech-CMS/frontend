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
import { PurchaseDeliveryDeleteModal } from "component/purchaseDelivery/PurchaseDeliveryDeleteModal"
import { PurchaseDeliveryGoodsModal } from "component/purchaseDelivery/PurchaseDeliveryGoodsModal"
import { PurchaseDeliveryRowMenu } from "component/purchaseDelivery/PurchaseDeliveryRowMenu"
import { PurchaseDeliveryToStorageModal } from "component/purchaseDelivery/PurchaseDeliveryToStorageModal"
import { DeliveryGoodsStatusUpdateModal } from "component/purchaseGood/DeliveryGoodsStatusUpdateModal"
import { PurchaseDeliveryStatus } from "constant/purchaseStatus"
import { useCommentInput } from "hook/useCommentInput"
import { FC } from "react"
import { FiFileText } from "react-icons/fi"
import { FullPurchaseDelivery } from "type/purchaseDelivery"
import { timestampToDate } from "util/formatting"

interface DeliveryColumnCardProps {
  status: PurchaseDeliveryStatus
  deliveryData: FullPurchaseDelivery
}

export const DeliveryColumnCard: FC<DeliveryColumnCardProps> = (props) => {
  const { status, deliveryData } = props

  const delivery = deliveryData.purchase_delivery
  const files = deliveryData.files
  const goods = deliveryData.goods

  const purchaseDeadline = timestampToDate(delivery.deadline)

  const { comment } = useCommentInput({
    objectName: "purchase_delivery",
    objectId: delivery.id,
  })

  const isCommentExists = !!comment.trim()

  const isMoveGoodsToStorageBtnHidden =
    status !== PurchaseDeliveryStatus.Delivered

  const {
    isOpen: isDocumentsModalOpen,
    onOpen: onDocumentsModalOpen,
    onClose: onDocumentsModalClose,
  } = useDisclosure()

  const {
    isOpen: isPurchaseDeliveryGoodsStatusModalOpen,
    onOpen: onPurchaseDeliveryGoodsStatusModalOpen,
    onClose: onPurchaseDeliveryGoodsStatusModalClose,
  } = useDisclosure()

  const {
    isOpen: isDeliveryGoodsStatusModalOpen,
    onOpen: onDeliveryGoodsStatusModalOpen,
    onClose: onDeliveryGoodsStatusModalClose,
  } = useDisclosure()

  const {
    isOpen: isPurchaseDeliveryDeleteModalOpen,
    onOpen: onPurchaseDeliveryDeleteModalOpen,
    onClose: onPurchaseDeliveryDeleteModalClose,
  } = useDisclosure()

  const {
    isOpen: isPurchaseDeliveryToStorageModalOpen,
    onOpen: onPurchaseDeliveryToStorageModalOpen,
    onClose: onPurchaseDeliveryToStorageModalClose,
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
              Delivery #{delivery.id}
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

            <PurchaseDeliveryRowMenu
              onMoveGoodsToStorage={onPurchaseDeliveryToStorageModalOpen}
              onDocuments={onDocumentsModalOpen}
              onGoods={onPurchaseDeliveryGoodsStatusModalOpen}
              onStatusUpdate={onDeliveryGoodsStatusModalOpen}
              onDelete={onPurchaseDeliveryDeleteModalOpen}
              isMoveGoodsToStorageBtnHidden={isMoveGoodsToStorageBtnHidden}
            />
          </Flex>
        </Flex>

        {/* Card Content with Goods */}
        <AccordionPanel>
          <Flex direction="column" gap={5}>
            <DividerWithTitle title="Goods" />

            <PurchaseCardGoodsList goods={goods} />

            <Divider />
          </Flex>
        </AccordionPanel>

        <Flex alignItems="center" px={2} gap={5}>
          <PurchaseDeadlineBadge
            type="PurchaseDelivery"
            goods={goods}
            deadline={purchaseDeadline}
          />
        </Flex>
      </Flex>

      {/* Purchase Modals */}
      <>
        <PurchaseDeliveryDeleteModal
          purchaseDelivery={delivery}
          isOpen={isPurchaseDeliveryDeleteModalOpen}
          onClose={onPurchaseDeliveryDeleteModalClose}
        />

        <PurchaseDocumentsModal
          purchaseId={delivery.id}
          documents={files}
          isOpen={isDocumentsModalOpen}
          onClose={onDocumentsModalClose}
          isDelivery
        />

        <PurchaseDeliveryGoodsModal
          purchaseDeliveryId={delivery.id}
          goods={goods}
          isOpen={isPurchaseDeliveryGoodsStatusModalOpen}
          onClose={onPurchaseDeliveryGoodsStatusModalClose}
        />

        <DeliveryGoodsStatusUpdateModal
          delivery={delivery}
          goods={goods}
          prevStatus={status}
          isOpen={isDeliveryGoodsStatusModalOpen}
          onClose={onDeliveryGoodsStatusModalClose}
        />

        <PurchaseDeliveryToStorageModal
          purchaseDelivery={delivery}
          purchaseGoods={goods}
          isOpen={isPurchaseDeliveryToStorageModalOpen}
          onClose={onPurchaseDeliveryToStorageModalClose}
        />
      </>
    </>
  )
}
