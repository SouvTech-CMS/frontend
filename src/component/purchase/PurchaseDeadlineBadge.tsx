import { Badge, Flex, Text, Tooltip } from "@chakra-ui/react"
import {
  PurchaseDeliveryStatus,
  PurchaseInStorageStatus,
} from "constant/purchaseStatus"
import { FC } from "react"
import { FiAlertTriangle } from "react-icons/fi"
import { PurchaseGood } from "type/purchaseGood"
import { WithId } from "type/withId"

interface PurchaseDeadlineBadgeProps {
  type: "Purchase" | "PurchaseDelivery"
  goods: WithId<PurchaseGood>[]
  deadline: Date
}

export const PurchaseDeadlineBadge: FC<PurchaseDeadlineBadgeProps> = (
  props,
) => {
  const { type, goods, deadline } = props

  const anyGoodsInDelivery = goods.some((good) =>
    Object.values(PurchaseDeliveryStatus).includes(
      good.status as PurchaseDeliveryStatus,
    ),
  )

  const anyGoodsInStorage = goods.some(
    (good) => good.status === PurchaseInStorageStatus,
  )

  const getDeadlineDaysDiff = () => {
    const now = new Date()
    const timeDiff = deadline.getTime() - now.getTime()
    // Calculate the difference in days between the current date and the purchase deadline
    const daysDiff = Math.floor(timeDiff / (1000 * 60 * 60 * 24))
    return daysDiff
  }

  const deadlineDaysDiff = getDeadlineDaysDiff()
  const isDeadlineGone = deadlineDaysDiff <= 0
  const isDeadlineComming = deadlineDaysDiff <= 3

  let deadlineColor = ""
  if (isDeadlineGone) {
    deadlineColor = "red"
  } else if (isDeadlineComming) {
    deadlineColor = "orange"
  }

  // In Delivery Badge
  if (anyGoodsInDelivery && type === "Purchase") {
    return (
      <Badge fontSize="xs" colorScheme="purple">
        In delivery
      </Badge>
    )
  }

  // In Storage Badge
  if (anyGoodsInStorage) {
    return (
      <Badge fontSize="xs" colorScheme="green">
        In storage
      </Badge>
    )
  }

  // Tooltip
  let tooltipText = ""
  if (isDeadlineGone) {
    tooltipText = "Deadline passed"
  } else if (isDeadlineComming) {
    tooltipText = "Deadline is comming"
  }

  return (
    <Tooltip label={tooltipText}>
      <Flex w="fit-content" alignItems="center" gap={2}>
        {isDeadlineComming && <FiAlertTriangle color={deadlineColor} />}

        <Text fontSize="sm" color={deadlineColor}>
          {deadline.toDateString()}
        </Text>
      </Flex>
    </Tooltip>
  )
}
