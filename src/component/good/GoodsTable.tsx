import {
  Button,
  Table,
  Tbody,
  Td,
  Th,
  Thead,
  Tr,
  useDisclosure,
} from "@chakra-ui/react"
import { GoodRow } from "component/good/GoodRow"
import { NewGoodModal } from "component/good/NewGoodModal"
import { Dispatch, FC, SetStateAction } from "react"
import { PurchaseGood } from "type/purchaseGood"

interface GoodsTableProps {
  goods: PurchaseGood[]
  setGoods: Dispatch<SetStateAction<PurchaseGood[]>>
}

const TABLE_COLUMNS = ["Name", "Unit Price", "Quantity", "Total"]

export const GoodsTable: FC<GoodsTableProps> = (props) => {
  const { goods, setGoods } = props

  const {
    isOpen: isNewGoodOpenModal,
    onOpen: onNewGoodOpenModal,
    onClose: onNewGoodCloseModal,
  } = useDisclosure()

  const handleAddGood = (good: PurchaseGood) => {
    good.amount = good.price_per_item * good.quantity
    setGoods((prevGoods) => [...prevGoods, good])
    onNewGoodCloseModal()
  }

  const handleRemoveGood = (good: PurchaseGood) => {
    setGoods((prevGoods) => prevGoods.filter((prevGood) => prevGood !== good))
  }

  return (
    <>
      <Table w="full" variant="simple">
        <Thead>
          <Tr>
            {TABLE_COLUMNS.map((columnName, index) => (
              <Th key={index}>{columnName}</Th>
            ))}
          </Tr>
        </Thead>

        <Tbody>
          {goods.map((good, index) => (
            <GoodRow
              key={index}
              good={good}
              handleRemoveGood={handleRemoveGood}
            />
          ))}

          <Tr>
            <Td colSpan={TABLE_COLUMNS.length} p={0}>
              <Button
                w="full"
                variant="ghost"
                colorScheme="blue"
                onClick={onNewGoodOpenModal}
              >
                Add good
              </Button>
            </Td>
          </Tr>
        </Tbody>
      </Table>

      <NewGoodModal
        handleAddGood={handleAddGood}
        isOpen={isNewGoodOpenModal}
        onClose={onNewGoodCloseModal}
      />
    </>
  )
}
