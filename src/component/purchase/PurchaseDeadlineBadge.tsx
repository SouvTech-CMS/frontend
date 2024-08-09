import { Flex, Text, Tooltip } from "@chakra-ui/react"
import { FC } from "react"
import { FiAlertTriangle, FiClock } from "react-icons/fi"

interface PurchaseDeadlineBadgeProps {
  deadline: Date
}

export const PurchaseDeadlineBadge: FC<PurchaseDeadlineBadgeProps> = (
  props,
) => {
  const { deadline } = props

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
        {isDeadlineComming ? (
          <FiAlertTriangle color={deadlineColor} />
        ) : (
          <FiClock color="bodyText" />
        )}

        <Text fontSize="sm" color={deadlineColor}>
          {deadline.toDateString()}
        </Text>
      </Flex>
    </Tooltip>
  )
}
