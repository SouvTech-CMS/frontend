import { Table, TableContainer, Tbody, Thead, Tr } from "@chakra-ui/react"
import { CustomTh } from "component/customTable/CustomTh"
import { ProductionInfoTableRow } from "component/productionInfo/ProductionInfoTableRow"
import { GOODS_PRODUCTION_INFO_TABLE } from "constant/tables"
import { useUserContext } from "context/user"
import { useUserTableAccess } from "hook/useUserTableAccess"
import { FC } from "react"
import { StorageGoodWithProductionInfo } from "type/storage/storageGood"

interface ProductionInfoTableProps {
  goodsWithProductionInfoList: StorageGoodWithProductionInfo[]
  selectedShopId: number
}

const TABLE_NAME = "production_info"

export const ProductionInfoTable: FC<ProductionInfoTableProps> = (props) => {
  const { goodsWithProductionInfoList, selectedShopId } = props

  const { isUserManager } = useUserContext()
  const { getAccessibleTableColumns } = useUserTableAccess()

  const columnsWithoutShelfs = GOODS_PRODUCTION_INFO_TABLE.filter(
    (column) => column?.param !== "shelf",
  )

  const filteredTableColumns = getAccessibleTableColumns(
    TABLE_NAME,
    // GOODS_PRODUCTION_INFO_TABLE,
    isUserManager ? columnsWithoutShelfs : GOODS_PRODUCTION_INFO_TABLE,
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
              accessibleColumns={filteredTableColumns}
              goodWithProductionInfo={goodWithProductionInfo}
              selectedShopId={selectedShopId}
            />
          ))}
        </Tbody>
      </Table>
    </TableContainer>
  )
}
