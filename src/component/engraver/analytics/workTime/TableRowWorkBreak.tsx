import { Text } from "@chakra-ui/react"
import { FC } from "react"
import { WorkBreak } from "type/engraver/workBreak"
import { WithId } from "type/withId"
import { dateAsStringToDate, formatDateTime } from "util/formatting"

interface TableRowWorkShiftBreakProps {
  workBreak: WithId<WorkBreak>
}

export const TableRowWorkShiftBreak: FC<TableRowWorkShiftBreakProps> = (
  props,
) => {
  const { workBreak } = props

  const startedAt = dateAsStringToDate(workBreak.started_at)
  const finishedAt = dateAsStringToDate(workBreak.finished_at)

  return (
    <Text fontSize="sm">
      {formatDateTime(startedAt, true)} - {formatDateTime(finishedAt, true)}
    </Text>
  )
}
