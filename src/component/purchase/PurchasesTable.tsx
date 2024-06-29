import { Flex, Table, Tbody, Td, Text, Th, Thead, Tr } from "@chakra-ui/react"
import { FC } from "react"
import { FullPurchase } from "type/purchase"

interface PurchasesTableProps {
  purchases?: FullPurchase[]
}

export const PurchasesTable: FC<PurchasesTableProps> = (props) => {
  const { purchases } = props

  if (!purchases) {
    return (
      <Flex>
        <Text>Something wrong</Text>
      </Flex>
    )
  }

  return (
    <Table variant="striped">
      <Thead>
        <Tr>
          <Th>
            <Text fontWeight="bold">ID</Text>
          </Th>
        </Tr>
      </Thead>
      <Tbody>
        {/* {purchases.map(({  }) => (
          <Tr key={id}>
            <Td>{id}</Td>
            <Td>{amount}</Td>
          </Tr>
        ))} */}
      </Tbody>
    </Table>
  )
}
