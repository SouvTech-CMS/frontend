import { Table, Tbody, Thead, Tr } from "@chakra-ui/react"
import { GoodsTableRow } from "component/good/GoodsTableRow"
import { CustomTh } from "component/sortableTable/CustomTh"
import { GOODS_TABLE_COLUMNS } from "constant/tables"
import { TableContextProvider } from "context/table"
import { FC } from "react"
import { Good } from "type/good"
import { WithId } from "type/withId"

interface GoodsTableProps {
  goodsList: WithId<Good>[]
}

export const GoodsTable: FC<GoodsTableProps> = (props) => {
  const { goodsList } = props

  return (
    <TableContextProvider>
      <Table variant="striped">
        <Thead>
          <Tr>
            {GOODS_TABLE_COLUMNS.map((column, index) => (
              <CustomTh key={index} column={column} />
            ))}
          </Tr>
        </Thead>

        <Tbody>
          {goodsList.map((good, index) => (
            <GoodsTableRow key={index} good={good} />
          ))}
        </Tbody>
      </Table>
    </TableContextProvider>
  )
}
