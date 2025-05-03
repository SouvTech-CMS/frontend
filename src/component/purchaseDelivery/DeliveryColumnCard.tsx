import {
  Accordion,
  AccordionButton,
  AccordionIcon,
  AccordionItem,
  AccordionPanel,
  Flex,
  IconButton,
  Text,
  useDisclosure,
} from "@chakra-ui/react"
import { CommentTooltip } from "component/comment/CommentTooltip"
import { DeliveryDocumentsModal } from "component/document/DeliveryDocumentsModal"
import { PurchaseDeadlineBadge } from "component/purchase/PurchaseDeadlineBadge"
import { DeliveryPurchaseCardWithGoods } from "component/purchaseDelivery/DeliveryPurchaseCardWithGoods"
import { DeliveryStatusUpdateModal } from "component/purchaseDelivery/DeliveryStatusUpdateModal"
import { DeliveryUpdateModal } from "component/purchaseDelivery/DeliveryUpdateModal"
import { PurchaseDeliveryCardMenu } from "component/purchaseDelivery/PurchaseDeliveryCardMenu"
import { PurchaseDeliveryDeleteModal } from "component/purchaseDelivery/PurchaseDeliveryDeleteModal"
import { PurchaseDeliveryGoodsModal } from "component/purchaseDelivery/PurchaseDeliveryGoodsModal"
import { PurchaseDeliveryToStorageModal } from "component/purchaseDelivery/PurchaseDeliveryToStorageModal"
import { DeliveryServicesModal } from "component/purchaseDeliveryService/DeliveryServicesModal"
import { PurchaseDeliveryStatus } from "constant/purchaseStatus"
import { useCommentInput } from "hook/useCommentInput"
import { useUserPermissions } from "hook/useUserPermissions"
import { FC } from "react"
import { FiFileText } from "react-icons/fi"
import { FullPurchase } from "type/purchase/purchase"
import { FullPurchaseDelivery } from "type/purchaseDelivery/purchaseDelivery"
import { timestampToDate } from "util/formatting"

interface DeliveryColumnCardProps {
  delivery: FullPurchaseDelivery
  status: PurchaseDeliveryStatus
}

export const DeliveryColumnCard: FC<DeliveryColumnCardProps> = (props) => {
  const { status, delivery } = props

  const { canReadPurchasesDocuments } = useUserPermissions()

  const deliveryId = delivery.id

  const goods = delivery.goods
  const purchaseGoods = goods.map((good) => ({
    ...good,
    ...good.purchase_good,
    total_amount: good.amount,
  }))
  const deliveryDocuments = delivery.files
  const purchases = delivery.purchases
  const purchasesWithGoods: FullPurchase[] = delivery.purchases.map(
    (purchase) => ({
      ...purchase,
      goods: purchaseGoods.filter((good) => good.purchase_id === purchase.id),
    }),
  )
  const purchasesDocuments = purchases.flatMap((purchase) =>
    purchase.files.map((file) => ({ ...file, purchase_id: purchase.id })),
  )
  const allDocumentsList = [...deliveryDocuments, ...purchasesDocuments]

  const purchasesIds = [...new Set(purchases.map((purchase) => purchase.id))]

  const purchaseDeadline = timestampToDate(delivery.deadline)

  const { comment } = useCommentInput({
    objectName: "purchase_delivery",
    objectId: deliveryId,
  })

  const isCommentExists = !!comment.trim()

  const isMoveGoodsToStorageBtnHidden =
    status !== PurchaseDeliveryStatus.Delivered

  // Move to Storage
  const {
    isOpen: isPurchaseDeliveryToStorageModalOpen,
    onOpen: onPurchaseDeliveryToStorageModalOpen,
    onClose: onPurchaseDeliveryToStorageModalClose,
  } = useDisclosure()

  // Documents
  const {
    isOpen: isDocumentsModalOpen,
    onOpen: onDocumentsModalOpen,
    onClose: onDocumentsModalClose,
  } = useDisclosure()

  // Goods
  const {
    isOpen: isDeliveryGoodsModalOpen,
    onOpen: onDeliveryGoodsModalOpen,
    onClose: onDeliveryGoodsModalClose,
  } = useDisclosure()

  // Services
  const {
    isOpen: isDeliveryServicesModalOpen,
    onOpen: onDeliveryServicesModalOpen,
    onClose: onDeliveryServicesModalClose,
  } = useDisclosure()

  // Status & Deadline
  const {
    isOpen: isDeliveryGoodsStatusModalOpen,
    onOpen: onDeliveryGoodsStatusModalOpen,
    onClose: onDeliveryGoodsStatusModalClose,
  } = useDisclosure()

  // Edit
  const {
    isOpen: isDeliveryUpdateModalOpen,
    onOpen: onDeliveryUpdateModalOpen,
    onClose: onDeliveryUpdateModalClose,
  } = useDisclosure()

  // Delete
  const {
    isOpen: isPurchaseDeliveryDeleteModalOpen,
    onOpen: onPurchaseDeliveryDeleteModalOpen,
    onClose: onPurchaseDeliveryDeleteModalClose,
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
        {/* Delivery Card Header */}
        <Flex w="full" justifyContent="space-between" alignItems="center">
          <Flex alignItems="center" gap={1}>
            <AccordionButton w="fit-content" p={2} borderRadius={5}>
              <AccordionIcon />
            </AccordionButton>

            {/* Delivery ID */}
            <Text fontSize="lg" fontWeight="semibold">
              Delivery #{deliveryId}
            </Text>
          </Flex>

          <Flex alignItems="center" gap={1}>
            {/* Comment */}
            {isCommentExists && <CommentTooltip comment={comment} />}

            {/* Documents */}
            {canReadPurchasesDocuments && (
              <IconButton
                aria-label="documents-icon-btn"
                size="sm"
                variant="ghost"
                icon={<FiFileText />}
                onClick={onDocumentsModalOpen}
              />
            )}

            <PurchaseDeliveryCardMenu
              onMoveGoodsToStorage={onPurchaseDeliveryToStorageModalOpen}
              onDocuments={onDocumentsModalOpen}
              onGoods={onDeliveryGoodsModalOpen}
              onServices={onDeliveryServicesModalOpen}
              onStatusUpdate={onDeliveryGoodsStatusModalOpen}
              onEdit={onDeliveryUpdateModalOpen}
              onDelete={onPurchaseDeliveryDeleteModalOpen}
              isMoveGoodsToStorageBtnHidden={isMoveGoodsToStorageBtnHidden}
            />
          </Flex>
        </Flex>

        {/* Card Content with Purchases */}
        <AccordionPanel p={2}>
          {/* Purchases Cards with Goods */}
          <Accordion w="full" allowMultiple>
            <Flex w="full" direction="column" gap={2}>
              {purchasesWithGoods.map((purchase, index) => (
                <AccordionItem key={index} w="full" border="none">
                  <DeliveryPurchaseCardWithGoods purchase={purchase} />
                </AccordionItem>
              ))}
            </Flex>
          </Accordion>
        </AccordionPanel>

        {/* Deadline Badge */}
        <Flex alignItems="center" px={2} gap={5}>
          <PurchaseDeadlineBadge deadline={purchaseDeadline} />
        </Flex>
      </Flex>

      {/* Delivery Modals */}
      <>
        <PurchaseDeliveryToStorageModal
          delivery={delivery}
          goods={goods}
          isOpen={isPurchaseDeliveryToStorageModalOpen}
          onClose={onPurchaseDeliveryToStorageModalClose}
        />

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

        <DeliveryServicesModal
          deliveryId={deliveryId}
          purchasesIds={purchasesIds}
          isOpen={isDeliveryServicesModalOpen}
          onClose={onDeliveryServicesModalClose}
        />

        <DeliveryStatusUpdateModal
          delivery={delivery}
          prevStatus={status}
          isOpen={isDeliveryGoodsStatusModalOpen}
          onClose={onDeliveryGoodsStatusModalClose}
        />

        <DeliveryUpdateModal
          prevDelivery={delivery}
          isOpen={isDeliveryUpdateModalOpen}
          onClose={onDeliveryUpdateModalClose}
        />

        <PurchaseDeliveryDeleteModal
          deliveryId={deliveryId}
          isOpen={isPurchaseDeliveryDeleteModalOpen}
          onClose={onPurchaseDeliveryDeleteModalClose}
        />
      </>
    </>
  )
}
