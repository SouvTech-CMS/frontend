import { Td, Text, Tr } from "@chakra-ui/react"
import { FC } from "react"
import { GoodReport } from "type/detailedReport/detailedReport"
import { numberWithCurrency, roundNumber } from "util/formatting"
import { countTotalParamSum } from "util/storage"

interface DetailedReportTableTotalsRowProps {
  goodsReports: GoodReport[]
}

export const DetailedReportTableTotalsRow: FC<
  DetailedReportTableTotalsRowProps
> = (props) => {
  const { goodsReports } = props

  return (
    <Tr bgColor="white" fontSize="lg">
      {/* Total */}
      <Td colSpan={3} textAlign="right">
        <Text fontWeight="bold">Total:</Text>
      </Td>

      {/* QTU Sold */}
      <Td>
        <Text fontWeight="bold">
          {countTotalParamSum(goodsReports, "quantity_sold")}
        </Text>
      </Td>

      {/* Total Sales */}
      <Td>
        <Text fontWeight="bold">
          {numberWithCurrency(
            roundNumber(countTotalParamSum(goodsReports, "total_amount")),
          )}
        </Text>
      </Td>

      {/* Prime Cost */}
      <Td>
        <Text fontWeight="bold">
          {numberWithCurrency(
            roundNumber(countTotalParamSum(goodsReports, "prime_cost")),
          )}
        </Text>
      </Td>

      {/* Item Price */}
      <Td>
        <Text fontWeight="bold">
          {numberWithCurrency(
            roundNumber(countTotalParamSum(goodsReports, "price_per_piece")),
          )}
        </Text>
      </Td>

      {/* Profit / Lost */}
      <Td>
        <Text fontWeight="bold">
          {numberWithCurrency(
            roundNumber(countTotalParamSum(goodsReports, "profit")),
          )}
        </Text>
      </Td>

      {/* Item Profit */}
      <Td>
        <Text fontWeight="bold">
          {numberWithCurrency(
            roundNumber(countTotalParamSum(goodsReports, "profit_per_piece")),
          )}
        </Text>
      </Td>

      {/* Fees */}
      <Td>
        <Text fontWeight="bold">
          {numberWithCurrency(
            roundNumber(countTotalParamSum(goodsReports, "fees")),
          )}
        </Text>
      </Td>

      {/* Shipping */}
      <Td>
        <Text fontWeight="bold">
          {numberWithCurrency(
            roundNumber(countTotalParamSum(goodsReports, "shipping")),
          )}
        </Text>
      </Td>
    </Tr>
  )
}
