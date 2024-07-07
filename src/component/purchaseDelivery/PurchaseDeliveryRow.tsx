import { Badge, Flex, Td, Text, Tr, useDisclosure } from "@chakra-ui/react"
import { PurchaseDocumentsModal } from "component/document/PurchaseDocumentsModal"
import { PurchaseDeliveryDeleteModal } from "component/purchaseDelivery/PurchaseDeliveryDeleteModal"
import { PurchaseDeliveryGoodsModal } from "component/purchaseDelivery/PurchaseDeliveryGoodsModal"
import { PurchaseDeliveryModal } from "component/purchaseDelivery/PurchaseDeliveryModal"
import { PurchaseDeliveryRowMenu } from "component/purchaseDelivery/PurchaseDeliveryRowMenu"
import { PurchaseInStorageStatus } from "constant/purchaseStatus"
import { FC } from "react"
import { FiAlertCircle } from "react-icons/fi"
import { PurchaseDelivery } from "type/purchaseDelivery"
import { PurchaseFile } from "type/purchaseFile"
import { PurchaseGood } from "type/purchaseGood"
import { WithId } from "type/withId"
import { getBadgeColor } from "util/goodBadgeColor"

interface PurchaseDeliveryRowProps {
  purchaseDelivery: WithId<PurchaseDelivery>
  goods: WithId<PurchaseGood>[]
  files: WithId<PurchaseFile>[]
}

export const PurchaseDeliveryRow: FC<PurchaseDeliveryRowProps> = (props) => {
  const { purchaseDelivery, goods, files } = props

  const purchaseDeadline = new Date(purchaseDelivery.deadline * 1000)

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
    isOpen: isPurchaseDeliveryEditModalOpen,
    onOpen: onPurchaseDeliveryEditModalOpen,
    onClose: onPurchaseDeliveryEditModalClose,
  } = useDisclosure()

  const {
    isOpen: isPurchaseDeliveryDeleteModalOpen,
    onOpen: onPurchaseDeliveryDeleteModalOpen,
    onClose: onPurchaseDeliveryDeleteModalClose,
  } = useDisclosure()

  const getDeadlineDaysDiff = () => {
    const now = new Date()
    const timeDiff = purchaseDeadline.getTime() - now.getTime()
    // Calculate the difference in days between the current date and the purchase deadline
    const daysDiff = Math.floor(timeDiff / (1000 * 60 * 60 * 24))
    return daysDiff
  }

  const purchaseDeliveryStatus = goods[0].status

  const deadlineDaysDiff = getDeadlineDaysDiff()
  const isDeadlineGone = deadlineDaysDiff <= 0
  const isDeadlineComming = deadlineDaysDiff <= 3

  let deadlineBgColor = ""
  if (isDeadlineGone) {
    deadlineBgColor = "red.200"
  } else if (isDeadlineComming) {
    deadlineBgColor = "orange.200"
  }

  const allGoodsInStorage = goods.every(
    (good) => good.status === PurchaseInStorageStatus
  )

  const allGoodsInDelivery = !allGoodsInStorage

  return (
    <>
      <Tr position="relative">
        {/* ID */}
        <Td>
          <Text>{purchaseDelivery.id}</Text>
        </Td>

        {/* Shipping after Custom */}
        <Td>
          <Text>{purchaseDelivery.after_custom_shipping}</Text>
        </Td>

        {/* Track Number */}
        <Td>
          <Text>{purchaseDelivery.track_number}</Text>
        </Td>

        {/* Track Number after Custom */}
        <Td>
          <Text>{purchaseDelivery.after_custom_track_number}</Text>
        </Td>

        {/* Status */}
        <Td>
          <Badge
            w="fit-content"
            variant="subtle"
            colorScheme={getBadgeColor(purchaseDeliveryStatus)}
          >
            {purchaseDeliveryStatus}
          </Badge>
        </Td>

        {/* Deadline */}
        <Td>
          <Flex justifyContent="flex-start">
            {allGoodsInDelivery && (
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
            )}
          </Flex>
        </Td>

        {/* Menu Btn */}
        <Flex
          position="absolute"
          right={2}
          h="full"
          alignItems="center"
          gap={2}
        >
          <PurchaseDeliveryRowMenu
            onDocuments={onDocumentsModalOpen}
            onGoods={onPurchaseDeliveryGoodsStatusModalOpen}
            onEdit={onPurchaseDeliveryEditModalOpen}
            onDelete={onPurchaseDeliveryDeleteModalOpen}
          />
        </Flex>
      </Tr>

      <PurchaseDeliveryDeleteModal
        purchaseDelivery={purchaseDelivery}
        isOpen={isPurchaseDeliveryDeleteModalOpen}
        onClose={onPurchaseDeliveryDeleteModalClose}
      />

      <PurchaseDocumentsModal
        purchaseId={purchaseDelivery.id}
        documents={files}
        isOpen={isDocumentsModalOpen}
        onClose={onDocumentsModalClose}
        isDelivery
      />

      <PurchaseDeliveryGoodsModal
        purchaseDeliveryId={purchaseDelivery.id}
        goods={goods}
        isOpen={isPurchaseDeliveryGoodsStatusModalOpen}
        onClose={onPurchaseDeliveryGoodsStatusModalClose}
      />

      <PurchaseDeliveryModal
        prevPurchaseDelivery={purchaseDelivery}
        prevGoods={goods}
        isOpen={isPurchaseDeliveryEditModalOpen}
        onClose={onPurchaseDeliveryEditModalClose}
      />
    </>
  )
}
