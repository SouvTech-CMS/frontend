import { Table, Tbody, Th, Thead, Tr } from "@chakra-ui/react"
import { StorageGoodRow } from "component/storageGood/StorageGoodRow"
import { STORAGE_GOODS_TABLE_COLUMNS } from "constant/tables"
import { FC } from "react"
import { GoodWithStorages } from "type/storageGood"

interface StorageGoodsTableProps {
  storageGoodsList: GoodWithStorages[]
}

export const StorageGoodsTable: FC<StorageGoodsTableProps> = (props) => {
  const { storageGoodsList } = props

  return (
    <Table size="md" variant="striped">
      <Thead>
        <Tr>
          {STORAGE_GOODS_TABLE_COLUMNS.map((columnName, index) => (
            <Th key={index}>{columnName}</Th>
          ))}
        </Tr>
      </Thead>

      <Tbody>
        {storageGoodsList?.map((goodWithStorage, index) => (
          <StorageGoodRow
            key={index}
            storageGood={goodWithStorage.storage_good}
            storagesList={goodWithStorage.storage_list}
          />
        ))}
      </Tbody>
    </Table>
  )
}
