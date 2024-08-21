import { Table, Tbody, Thead, Tr } from "@chakra-ui/react"
import { CustomTh } from "component/customTable/CustomTh"
import { StorageGoodRow } from "component/storageGood/StorageGoodRow"
import { STORAGE_GOODS_TABLE_COLUMNS } from "constant/tables"
import { FC } from "react"
import { StorageGood } from "type/storageGood"
import { WithId } from "type/withId"

interface StorageGoodsTableProps {
  storageGoodsList: WithId<StorageGood>[]
}

export const StorageGoodsTable: FC<StorageGoodsTableProps> = (props) => {
  const { storageGoodsList } = props

  return (
    <Table size="md" variant="striped">
      <Thead>
        <Tr>
          {STORAGE_GOODS_TABLE_COLUMNS.map((column, index) => (
            <CustomTh key={index} column={column} />
          ))}
        </Tr>
      </Thead>

      <Tbody>
        {storageGoodsList?.map((goodWithStorages, index) => (
          <StorageGoodRow key={index} storageGood={goodWithStorages} />
        ))}
      </Tbody>
    </Table>
  )
}
