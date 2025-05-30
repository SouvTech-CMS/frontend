import { Table, Tbody, Th, Thead, Tr } from "@chakra-ui/react"
import { EngraverProductivityTableRow } from "component/engraver/analytics/productivity/EngraverProductivityTableRow"
import { EngraverSelectTableRow } from "component/engraver/analytics/productivity/EngraverSelectTableRow"
import { Dispatch, FC, SetStateAction } from "react"
import { EngraverProductivityAnalyticsResponse } from "type/analytics/engraver"

interface EngraversProductivityTableProps {
  productivityAnalytics: EngraverProductivityAnalyticsResponse
  selectedEngraversIds?: number[]
  setEngraversIds: Dispatch<SetStateAction<number[]>>
}

const COLUMNS_NAMES = [
  "ID",
  "Engraver",
  "Processed Orders",
  "Errors",
  "Average Processing Time",
]

export const EngraversProductivityTable: FC<EngraversProductivityTableProps> = (
  props,
) => {
  const { productivityAnalytics, selectedEngraversIds, setEngraversIds } = props

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
        {productivityAnalytics.map((engraverProductivity, index) => (
          <EngraverProductivityTableRow
            key={index}
            engraverProductivity={engraverProductivity}
            setEngraversIds={setEngraversIds}
          />
        ))}

        <EngraverSelectTableRow
          selectedEngraversIds={selectedEngraversIds}
          setEngraversIds={setEngraversIds}
        />
      </Tbody>
    </Table>
  )
}
