import { Text } from "@chakra-ui/react"
import { FC } from "react"
import { ScheduledBreak } from "type/engraver/scheduledBreak"
import { WithId } from "type/withId"
import { formatTime } from "util/formatting"

interface TableRowScheduledBreakProps {
  scheduledBreak: WithId<ScheduledBreak>
}

export const TableRowScheduledBreak: FC<TableRowScheduledBreakProps> = (
  props,
) => {
  const { scheduledBreak } = props

  const startedAt = scheduledBreak.started_at
  const finishedAt = scheduledBreak.finished_at

  return (
    <Text fontSize="sm">
      {formatTime(startedAt)} - {formatTime(finishedAt)}
    </Text>
  )
}
