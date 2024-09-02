import { Table, Tbody, Thead, Tr } from "@chakra-ui/react"
import { CustomTh } from "component/customTable/CustomTh"
import { GoodsTableRow } from "component/good/GoodsTableRow"
import { GOODS_TABLE_COLUMNS } from "constant/tables"
import { FC } from "react"
import { Good } from "type/order/good"
import { WithId } from "type/withId"

interface GoodsTableProps {
  goodsList: WithId<Good>[]
  isShowShop?: boolean
  resetCurrentPage?: () => void
}

export const GoodsTable: FC<GoodsTableProps> = (props) => {
  const { goodsList, isShowShop, resetCurrentPage } = props

  return (
    <Table variant="striped">
      <Thead>
        <Tr>
          {GOODS_TABLE_COLUMNS.map((column, index) => (
            <CustomTh
              key={index}
              column={column}
              resetCurrentPage={resetCurrentPage}
            />
          ))}
        </Tr>
      </Thead>

      <Tbody>
        {goodsList.map((good, index) => (
          <GoodsTableRow key={index} good={good} isShowShop={isShowShop} />
        ))}
      </Tbody>
    </Table>
  )
}
