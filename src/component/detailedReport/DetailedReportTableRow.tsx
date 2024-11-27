import { Td, Text, Tr } from "@chakra-ui/react"
import { SKUBadge } from "component/badge/SKUBadge"
import { FC } from "react"
import { GoodReport } from "type/detailedReport/detailedReport"
import { numberWithCurrency, roundNumber } from "util/formatting"

interface DetailedReportTableRowProps {
  goodReport: GoodReport
}

export const DetailedReportTableRow: FC<DetailedReportTableRowProps> = (
  props,
) => {
  const { goodReport } = props

  return (
    <Tr>
      {/* ID */}
      <Td>
        <Text>{goodReport.good_id}</Text>
      </Td>

      {/* Name */}
      <Td>
        <Text whiteSpace="break-spaces">{goodReport.good_name}</Text>
      </Td>

      {/* SKU */}
      <Td>
        <SKUBadge sku={goodReport.good_uniquename} />
      </Td>

      {/* QTU Sold */}
      <Td>
        <Text>{roundNumber(goodReport.quantity_sold)}</Text>
      </Td>

      {/* Total Sales */}
      <Td>
        <Text>{numberWithCurrency(roundNumber(goodReport.total_amount))}</Text>
      </Td>

      {/* Prime Cost */}
      <Td>
        <Text>{numberWithCurrency(roundNumber(goodReport.prime_cost))}</Text>
      </Td>

      {/* Item Price */}
      <Td>
        <Text>
          {numberWithCurrency(roundNumber(goodReport.price_per_piece))}
        </Text>
      </Td>

      {/* Profit / Lost */}
      <Td>
        <Text>{numberWithCurrency(roundNumber(goodReport.profit))}</Text>
      </Td>

      {/* Item Profit */}
      <Td>
        <Text>
          {numberWithCurrency(roundNumber(goodReport.profit_per_piece))}
        </Text>
      </Td>

      {/* Fees */}
      <Td>
        <Text>{numberWithCurrency(roundNumber(goodReport.fees))}</Text>
      </Td>

      {/* Shipping */}
      <Td>
        <Text>{numberWithCurrency(roundNumber(goodReport.shipping))}</Text>
      </Td>
    </Tr>
  )
}
