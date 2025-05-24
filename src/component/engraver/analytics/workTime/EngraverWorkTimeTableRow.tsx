import { Flex, Td, Tr } from "@chakra-ui/react"
import { TableRowScheduledBreak } from "component/engraver/analytics/workTime/TableRowScheduledBreak"
import { TableRowWorkShiftBreak } from "component/engraver/analytics/workTime/TableRowWorkBreak"
import { FC } from "react"
import { EngraverWorkTimeAnalyticsItem } from "type/analytics/engraver"
import {
  dateAsStringToDate,
  durationFromSeconds,
  formatDateTime,
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

  const startedAt = dateAsStringToDate(workShift.started_at, true)
  const finishedAt = dateAsStringToDate(workShift.finished_at, true)

  return (
    <Tr>
      <Td>{workShiftId}</Td>
      <Td>{formatDateTime(startedAt, true)}</Td>
      <Td>{formatDateTime(finishedAt, true)}</Td>
      <Td>
        <Flex direction="column" gap={1}>
          {workShift.work_breaks.map((workBreak, index) => (
            <TableRowWorkShiftBreak key={index} workBreak={workBreak} />
          ))}
        </Flex>
      </Td>
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
