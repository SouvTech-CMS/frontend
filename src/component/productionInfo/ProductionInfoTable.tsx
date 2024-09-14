import { Table, TableContainer, Tbody, Thead, Tr } from "@chakra-ui/react"
import { CustomTh } from "component/customTable/CustomTh"
import { ProductionInfoTableRow } from "component/productionInfo/ProductionInfoTableRow"
import { GOODS_PRODUCTION_INFO_TABLE } from "constant/tables"
import { FC } from "react"
import { StorageGoodWithProductionInfo } from "type/storage/storageGood"

interface ProductionInfoTableProps {
  goodsWithProductionInfoList: StorageGoodWithProductionInfo[]
}

export const ProductionInfoTable: FC<ProductionInfoTableProps> = (props) => {
  const { goodsWithProductionInfoList } = props

  return (
    <TableContainer>
      <Table variant="striped">
        <Thead>
          <Tr>
            {GOODS_PRODUCTION_INFO_TABLE.map((column, index) => (
              <CustomTh key={index} column={column} />
            ))}
          </Tr>
        </Thead>

        <Tbody>
          {goodsWithProductionInfoList?.map((goodWithProductionInfo, index) => (
            <ProductionInfoTableRow
              key={index}
              goodWithProductionInfo={goodWithProductionInfo}
            />
          ))}
        </Tbody>
      </Table>
    </TableContainer>
  )
}
