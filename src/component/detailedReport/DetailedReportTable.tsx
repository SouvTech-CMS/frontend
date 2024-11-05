import {
  Button,
  Table,
  TableContainer,
  Tbody,
  Td,
  Text,
  Th,
  Thead,
  Tr,
} from "@chakra-ui/react"
import { DetailedReportTableRow } from "component/detailedReport/DetailedReportTableRow"
import { DetailedReportTableTotalsRow } from "component/detailedReport/DetailedReportTableTotalsRow"
import {
  DETAILED_REPORT_TABLE_COLUMNS,
  INITIAL_ROWS_PER_PAGE,
} from "constant/tables"
import { FC, useState } from "react"
import { GoodReport } from "type/detailedReport/detailedReport"

interface DetailedReportTableProps {
  goodsReports: GoodReport[]
}

export const DetailedReportTable: FC<DetailedReportTableProps> = (props) => {
  const { goodsReports } = props

  const [isShowFullTable, setIsShowFullTable] = useState<boolean>(false)

  const showMoreRowsBtnText = isShowFullTable ? "Show less" : "Show more"
  const isNeedShowMoreBtn = goodsReports.length > INITIAL_ROWS_PER_PAGE

  const filteredGoodsReportsList = isShowFullTable
    ? goodsReports
    : goodsReports.slice(0, INITIAL_ROWS_PER_PAGE)

  const handleShowFullTableChange = () => {
    setIsShowFullTable((prevShow) => !prevShow)
  }

  return (
    <TableContainer w="full">
      <Table w="full" variant="striped">
        <Thead>
          <Tr>
            {DETAILED_REPORT_TABLE_COLUMNS.map((column, index) => (
              <Th key={index} whiteSpace="break-spaces">
                {column}
              </Th>
            ))}
          </Tr>
        </Thead>
        <Tbody>
          {filteredGoodsReportsList.map((goodReport, index) => (
            <DetailedReportTableRow key={index} goodReport={goodReport} />
          ))}

          {/* Show More Rows */}
          {isNeedShowMoreBtn && (
            <Tr>
              <Td p={0} colSpan={DETAILED_REPORT_TABLE_COLUMNS.length}>
                <Button
                  w="full"
                  variant="secondary"
                  onClick={handleShowFullTableChange}
                >
                  <Text>{showMoreRowsBtnText}</Text>
                </Button>
              </Td>
            </Tr>
          )}

          {/* Total Counts */}
          <DetailedReportTableTotalsRow goodsReports={goodsReports} />
        </Tbody>
      </Table>
    </TableContainer>
  )
}
