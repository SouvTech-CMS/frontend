import { Table, TableContainer, Tbody, Thead, Tr } from "@chakra-ui/react"
import { CustomTh } from "component/customTable/CustomTh"
import { ProductionInfoTableRow } from "component/productionInfo/ProductionInfoTableRow"
import { GOODS_PRODUCTION_INFO_TABLE } from "constant/tables"
import { useUserTableAccess } from "hook/useUserTableAccess"
import { FC } from "react"
import { StorageGoodWithProductionInfo } from "type/storage/storageGood"

interface ProductionInfoTableProps {
  goodsWithProductionInfoList: StorageGoodWithProductionInfo[]
}

const TABLE_NAME = "production_info"

export const ProductionInfoTable: FC<ProductionInfoTableProps> = (props) => {
  const { goodsWithProductionInfoList } = props

  const { getAccessibleTableColumns } = useUserTableAccess()

  const filteredTableColumns = getAccessibleTableColumns(
    TABLE_NAME,
    GOODS_PRODUCTION_INFO_TABLE,
  )

  return (
    <TableContainer w="full">
      <Table w="full" variant="striped">
        <Thead>
          <Tr>
            {filteredTableColumns.map((column, index) => (
              <CustomTh key={index} column={column} />
            ))}
          </Tr>
        </Thead>

        <Tbody>
          {goodsWithProductionInfoList.map((goodWithProductionInfo, index) => (
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
