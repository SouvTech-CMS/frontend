import {
  Button,
  Table,
  TableContainer,
  Tbody,
  Td,
  Th,
  Thead,
  Tr,
  useDisclosure,
} from "@chakra-ui/react"
import { NewPurchaseGoodModal } from "component/purchaseGood/NewPurchaseGoodModal"
import { NewPurchaseGoodRow } from "component/purchaseGood/NewPurchaseGoodRow"
import { Dispatch, FC, SetStateAction } from "react"
import { PurchaseGood } from "type/purchase/purchaseGood"

interface PurchaseGoodsTableProps {
  goods: PurchaseGood[]
  setGoods: Dispatch<SetStateAction<PurchaseGood[]>>
}

const TABLE_COLUMNS = [
  "Name",
  "Unit Price",
  "Quantity",
  "Total",
  "Discount",
  "",
]

export const PurchaseGoodsTable: FC<PurchaseGoodsTableProps> = (props) => {
  const { goods, setGoods } = props

  const {
    isOpen: isNewGoodModalOpen,
    onOpen: onNewGoodModalOpen,
    onClose: onNewGoodModalClose,
  } = useDisclosure()

  const handleAddGood = (good: PurchaseGood) => {
    setGoods((prevGoods) => [...prevGoods, good])
    onNewGoodModalClose()
  }

  const handleUpdateGood = (good: PurchaseGood) => {
    setGoods((prevGoods) => [
      ...prevGoods.filter(
        (prevGood) => prevGood.name.toLowerCase() !== good.name.toLowerCase(),
      ),
      good,
    ])
    onNewGoodModalClose()
  }

  const handleRemoveGood = (good: PurchaseGood) => {
    setGoods((prevGoods) => prevGoods.filter((prevGood) => prevGood !== good))
  }

  return (
    <>
      <TableContainer w="full">
        <Table w="full" variant="simple" bgColor="gray.200" borderRadius={10}>
          <Thead>
            <Tr>
              {TABLE_COLUMNS.map((columnName, index) => (
                <Th key={index} whiteSpace="break-spaces">
                  {columnName}
                </Th>
              ))}
            </Tr>
          </Thead>

          <Tbody>
            {goods.map((good, index) => (
              <NewPurchaseGoodRow
                key={index}
                good={good}
                onEdit={handleUpdateGood}
                onRemove={handleRemoveGood}
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
      </TableContainer>

      <NewPurchaseGoodModal
        onAddGood={handleAddGood}
        isOpen={isNewGoodModalOpen}
        onClose={onNewGoodModalClose}
      />
    </>
  )
}
