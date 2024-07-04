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
import { NewPurchaseGoodModal } from "component/good/NewPurchaseGoodModal"
import { NewPurchaseGoodRow } from "component/good/NewPurchaseGoodRow"
import { Dispatch, FC, SetStateAction } from "react"
import { PurchaseGood } from "type/purchaseGood"

interface PurchaseGoodsTableProps {
  goods: PurchaseGood[]
  setGoods: Dispatch<SetStateAction<PurchaseGood[]>>
}

const TABLE_COLUMNS = ["Name", "Unit Price", "Quantity", "Total"]

export const PurchaseGoodsTable: FC<PurchaseGoodsTableProps> = (props) => {
  const { goods, setGoods } = props

  const {
    isOpen: isNewGoodModalOpen,
    onOpen: onNewGoodModalOpen,
    onClose: onNewGoodModalClose,
  } = useDisclosure()

  const handleAddGood = (good: PurchaseGood) => {
    good.amount = good.price_per_item * good.quantity
    setGoods((prevGoods) => [...prevGoods, good])
    onNewGoodModalClose()
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
            <NewPurchaseGoodRow
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
                onClick={onNewGoodModalOpen}
              >
                Add good
              </Button>
            </Td>
          </Tr>
        </Tbody>
      </Table>

      <NewPurchaseGoodModal
        handleAddGood={handleAddGood}
        isOpen={isNewGoodModalOpen}
        onClose={onNewGoodModalClose}
      />
    </>
  )
}
