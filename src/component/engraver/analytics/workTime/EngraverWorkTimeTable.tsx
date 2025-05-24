import { Table, Tbody, Th, Thead, Tr } from "@chakra-ui/react"
import { EngraverWorkTimeTableRow } from "component/engraver/analytics/workTime/EngraverWorkTimeTableRow"
import { FC } from "react"
import { EngraverWorkTimeAnalyticsResponse } from "type/analytics/engraver"

interface EngraverWorkTimeTableProps {
  workTimeAnalytics: EngraverWorkTimeAnalyticsResponse
}

export const EngraverWorkTimeTable: FC<EngraverWorkTimeTableProps> = (
  props,
) => {
  const { workTimeAnalytics } = props

  const workShiftsList = workTimeAnalytics

  return (
    <Table variant="simple">
      <Thead>
        <Tr>
          <Th>Work Shift ID</Th>
          <Th>Work Shift Start</Th>
          <Th>Work Shift End</Th>
          <Th>Work Breaks</Th>
          <Th>Scheduled Breaks</Th>
          <Th>Total Work Time</Th>
        </Tr>
      </Thead>
      <Tbody>
        {workShiftsList.map((workShift, index) => (
          <EngraverWorkTimeTableRow key={index} workShift={workShift} />
        ))}
      </Tbody>
    </Table>
  )
}
