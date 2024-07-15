import { Badge, Flex, Text } from "@chakra-ui/react"
import {
  PurchaseDeliveryStatus,
  PurchaseInStorageStatus,
} from "constant/purchaseStatus"
import { FC } from "react"
import { FiAlertCircle } from "react-icons/fi"
import { PurchaseGood } from "type/purchaseGood"
import { WithId } from "type/withId"

interface PurchaseDeadlineBadgeProps {
  goods: WithId<PurchaseGood>[]
  deadline: Date
}

export const PurchaseDeadlineBadge: FC<PurchaseDeadlineBadgeProps> = (
  props,
) => {
  const { goods, deadline } = props

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

  let deadlineBgColor = ""
  if (isDeadlineGone) {
    deadlineBgColor = "red.200"
  } else if (isDeadlineComming) {
    deadlineBgColor = "orange.200"
  }

  // In Delivery Badge
  if (anyGoodsInDelivery) {
    return (
      <Badge fontSize="sm" colorScheme="purple" p={2}>
        In delivery
      </Badge>
    )
  }

  // In Storage Badge
  if (anyGoodsInStorage) {
    return (
      <Badge fontSize="sm" colorScheme="green" p={2}>
        In storage
      </Badge>
    )
  }

  // Deadline badge
  return (
    <Flex
      w="fit-content"
      bgColor={deadlineBgColor}
      alignItems="center"
      p={2}
      borderRadius={10}
      gap={2}
    >
      {isDeadlineComming && <FiAlertCircle color="red" />}
      <Text>{deadline.toDateString()}</Text>
    </Flex>
  )
}
