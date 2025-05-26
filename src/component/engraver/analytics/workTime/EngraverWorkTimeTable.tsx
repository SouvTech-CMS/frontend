import { Table, Tbody, Th, Thead, Tr } from "@chakra-ui/react"
import { EngraverWorkTimeTableRow } from "component/engraver/analytics/workTime/EngraverWorkTimeTableRow"
import { FC } from "react"
import { EngraverWorkTimeAnalyticsResponse } from "type/analytics/engraver"

interface EngraverWorkTimeTableProps {
  workTimeAnalytics: EngraverWorkTimeAnalyticsResponse
}

const COLUMNS_NAMES = [
  "Work Shift ID",
  "Work Shift Start",
  "Work Shift End",
  "Work Breaks",
  "Scheduled Breaks",
  "Total Work Time",
]

export const EngraverWorkTimeTable: FC<EngraverWorkTimeTableProps> = (
  props,
) => {
  const { workTimeAnalytics } = props

  const workShiftsList = workTimeAnalytics

  return (
    <Table variant="simple">
      <Thead>
        <Tr>
          {COLUMNS_NAMES.map((column, index) => (
            <Th key={index}>{column}</Th>
          ))}
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
