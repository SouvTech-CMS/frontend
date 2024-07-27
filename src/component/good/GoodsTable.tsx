import { Table, Tbody, Text, Th, Thead, Tr } from "@chakra-ui/react"
import { GoodsTableRow } from "component/good/GoodsTableRow"
import { GOODS_TABLE_COLUMNS } from "constant/tables"
import { FC } from "react"
import { Good } from "type/good"
import { WithId } from "type/withId"

interface GoodsTableProps {
  goodsList: WithId<Good>[]
}

export const GoodsTable: FC<GoodsTableProps> = (props) => {
  const { goodsList } = props

  return (
    <Table variant="striped">
      <Thead>
        <Tr>
          {GOODS_TABLE_COLUMNS.map((columnName, index) => (
            <Th key={index}>
              <Text>{columnName}</Text>
            </Th>
          ))}
          <Th></Th>
        </Tr>
      </Thead>

      <Tbody>
        {goodsList.map((good, index) => (
          <GoodsTableRow key={index} good={good} />
        ))}
      </Tbody>
    </Table>
  )
}
