import { Flex, Td, Tr } from "@chakra-ui/react"
import { TableRowScheduledBreak } from "component/engraver/analytics/workTime/TableRowScheduledBreak"
import { TableRowWorkShiftBreak } from "component/engraver/analytics/workTime/TableRowWorkBreak"
import { FC } from "react"
import { EngraverWorkTimeAnalyticsItem } from "type/analytics/engraver"
import {
  dateAsStringToDate,
  durationFromSeconds,
  formatDate,
  formatTimeFromDate,
} from "util/formatting"

interface EngraverWorkTimeTableRowProps {
  workShift: EngraverWorkTimeAnalyticsItem
}

export const EngraverWorkTimeTableRow: FC<EngraverWorkTimeTableRowProps> = (
  props,
) => {
  const { workShift } = props

  const workShiftId = workShift.id

  const scheduledBreaksList = workShift.scheduled_breaks
  const totalTimeInSeconds = workShift.total_time
  const totalTimeText = durationFromSeconds(totalTimeInSeconds)

  const startedAt = dateAsStringToDate(workShift.started_at)
  const finishedAt = dateAsStringToDate(workShift.finished_at)

  return (
    <Tr>
      {/* ID */}
      <Td>{workShiftId}</Td>

      {/* Date */}
      <Td>{formatDate(startedAt)}</Td>

      {/* Started At */}
      <Td>{formatTimeFromDate(startedAt)}</Td>

      {/* Finished At */}
      <Td>{formatTimeFromDate(finishedAt)}</Td>

      {/* Work Breaks */}
      <Td>
        <Flex direction="column" gap={1}>
          {workShift.work_breaks.map((workBreak, index) => (
            <TableRowWorkShiftBreak key={index} workBreak={workBreak} />
          ))}
        </Flex>
      </Td>

      {/* Scheduled Breaks */}
      <Td>
        <Flex direction="column" gap={1}>
          {scheduledBreaksList.map((scheduledBreak, index) => (
            <TableRowScheduledBreak
              key={index}
              scheduledBreak={scheduledBreak}
            />
          ))}
        </Flex>
      </Td>
      <Td>{totalTimeText}</Td>
    </Tr>
  )
}
