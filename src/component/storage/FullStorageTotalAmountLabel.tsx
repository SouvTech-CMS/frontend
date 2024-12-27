import { Code, Flex, Text } from "@chakra-ui/react"
import { getFullStorageTotalAmount } from "api/storage/storage"
import { TableTdSkeleton } from "component/customTable/TableTdSkeleton"
import { FC } from "react"
import { useQuery } from "react-query"
import { numberWithCurrency, roundNumber } from "util/formatting"

export const FullStorageTotalAmountLabel: FC = () => {
  const { data: fullStorageTotalAmount, isLoading } = useQuery<number>(
    "fullStorageTotalAmount",
    getFullStorageTotalAmount,
  )

  return (
    <Flex direction="row" gap={2}>
      <Text fontWeight="bold">Total Storage Amount:</Text>

      {/* Full Storage Total Amount */}
      <TableTdSkeleton isLoading={isLoading}>
        <Code fontWeight="medium">
          {numberWithCurrency(roundNumber(fullStorageTotalAmount))}
        </Code>
      </TableTdSkeleton>
    </Flex>
  )
}
