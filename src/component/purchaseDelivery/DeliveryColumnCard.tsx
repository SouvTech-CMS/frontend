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
import { PurchaseDeadlineBadge } from "component/purchase/PurchaseDeadlineBadge"
import { DeliveryCardGoodsList } from "component/purchaseDelivery/DeliveryCardGoodsList"
import { DeliveryStatusUpdateModal } from "component/purchaseDelivery/DeliveryStatusUpdateModal"
import { PurchaseDeliveryDeleteModal } from "component/purchaseDelivery/PurchaseDeliveryDeleteModal"
import { PurchaseDeliveryGoodsModal } from "component/purchaseDelivery/PurchaseDeliveryGoodsModal"
import { PurchaseDeliveryRowMenu } from "component/purchaseDelivery/PurchaseDeliveryRowMenu"
import { PurchaseDeliveryToStorageModal } from "component/purchaseDelivery/PurchaseDeliveryToStorageModal"
import { PurchaseDeliveryStatus } from "constant/purchaseStatus"
import { useCommentInput } from "hook/useCommentInput"
import { FC } from "react"
import { FiFileText } from "react-icons/fi"
import { FullPurchaseDelivery } from "type/purchaseDelivery/purchaseDelivery"
import { timestampToDate } from "util/formatting"

interface DeliveryColumnCardProps {
  status: PurchaseDeliveryStatus
  delivery: FullPurchaseDelivery
}

export const DeliveryColumnCard: FC<DeliveryColumnCardProps> = (props) => {
  const { status, delivery } = props

  const deliveryId = delivery.id
  const files = delivery.files
  const goods = delivery.goods

  const purchaseDeadline = timestampToDate(delivery.deadline)

  const { comment } = useCommentInput({
    objectName: "purchase_delivery",
    objectId: deliveryId,
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
              Delivery #{deliveryId}
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

            <DeliveryCardGoodsList goods={goods} />

            <Divider />
          </Flex>
        </AccordionPanel>

        <Flex alignItems="center" px={2} gap={5}>
          <PurchaseDeadlineBadge deadline={purchaseDeadline} />
        </Flex>
      </Flex>

      {/* Purchase Modals */}
      <>
        <PurchaseDeliveryDeleteModal
          deliveryId={deliveryId}
          isOpen={isPurchaseDeliveryDeleteModalOpen}
          onClose={onPurchaseDeliveryDeleteModalClose}
        />

        <PurchaseDocumentsModal
          purchaseId={deliveryId}
          documents={files}
          isOpen={isDocumentsModalOpen}
          onClose={onDocumentsModalClose}
          isDelivery
        />

        <PurchaseDeliveryGoodsModal
          deliveryId={deliveryId}
          goods={goods}
          isOpen={isPurchaseDeliveryGoodsStatusModalOpen}
          onClose={onPurchaseDeliveryGoodsStatusModalClose}
        />

        <DeliveryStatusUpdateModal
          delivery={delivery}
          prevStatus={status}
          isOpen={isDeliveryGoodsStatusModalOpen}
          onClose={onDeliveryGoodsStatusModalClose}
        />

        <PurchaseDeliveryToStorageModal
          delivery={delivery}
          goods={goods}
          isOpen={isPurchaseDeliveryToStorageModalOpen}
          onClose={onPurchaseDeliveryToStorageModalClose}
        />
      </>
    </>
  )
}
