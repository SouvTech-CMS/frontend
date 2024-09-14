import { Table, TableContainer, Tbody, Th, Thead, Tr } from "@chakra-ui/react"
import { StorageGoodsWithProductionInfoTableRow } from "component/productionInfo/StorageGoodsWithProductionInfoTableRow"
import { GOODS_PRODUCTION_INFO_TABLE } from "constant/tables"
import { FC } from "react"
import { StorageGoodWithProductionInfo } from "type/storage/storageGood"

interface StorageGoodsWithProductionInfoTableProps {
  goodsWithProductionInfoList: StorageGoodWithProductionInfo[]
}

export const StorageGoodsWithProductionInfoTable: FC<
  StorageGoodsWithProductionInfoTableProps
> = (props) => {
  const { goodsWithProductionInfoList } = props

  return (
    <TableContainer>
      <Table variant="striped">
        <Thead>
          <Tr>
            {GOODS_PRODUCTION_INFO_TABLE.map((column, index) => (
              <Th key={index}>{column}</Th>
            ))}
          </Tr>
        </Thead>

        <Tbody>
          {goodsWithProductionInfoList?.map((goodWithProductionInfo, index) => (
            <StorageGoodsWithProductionInfoTableRow
              key={index}
              goodWithProductionInfo={goodWithProductionInfo}
            />
          ))}
        </Tbody>
      </Table>
    </TableContainer>
  )
}
