import {
  Button,
  Flex,
  IconButton,
  Td,
  Text,
  Tr,
  useDisclosure,
} from "@chakra-ui/react"
import { CustomTooltip } from "component/CustomTooltip"
import { EngraverOrdersDrawer } from "component/engraver/analytics/productivity/EngraverOrdersDrawer"
import { EngraverStorageGoodsErrorsDrawer } from "component/engraver/analytics/productivity/EngraverStorageGoodsErrorsDrawer"
import { Dispatch, FC, SetStateAction } from "react"
import { FiMinus } from "react-icons/fi"
import { EngraverProductivityAnalyticsItem } from "type/analytics/engraver"
import { durationFromSeconds } from "util/formatting"

interface EngraverProductivityTableRowProps {
  engraverProductivity: EngraverProductivityAnalyticsItem
  setEngraversIds: Dispatch<SetStateAction<number[]>>
}

export const EngraverProductivityTableRow: FC<
  EngraverProductivityTableRowProps
> = (props) => {
  const { engraverProductivity, setEngraversIds } = props

  const {
    engraver,
    processed_orders,
    storage_goods_defects,
    average_processing_time,
  } = engraverProductivity

  const engraverId = engraver.id
  const engraverUser = engraver.user
  const engraverName = engraverUser.fio || engraverUser.username

  const processedOrderCount = processed_orders.length
  const ordersList = processed_orders.map(
    (processedOrder) => processedOrder.order,
  )

  const errorsCount = storage_goods_defects.reduce(
    (sum, defect) => sum + defect.quantity,
    0,
  )

  const averageProcessingTimeText = durationFromSeconds(
    average_processing_time,
    ["hours", "minutes", "seconds"],
  )

  const handleRemove = () => {
    setEngraversIds((prevEngraversIds) =>
      prevEngraversIds.filter(
        (prevEngraverId) => prevEngraverId !== engraverId,
      ),
    )
  }

  // Orders
  const {
    isOpen: isOrdersModalOpen,
    onOpen: onOrdersModalOpen,
    onClose: onOrdersModalClose,
  } = useDisclosure()

  // Errors
  const {
    isOpen: isErrorsModalOpen,
    onOpen: onErrorsModalOpen,
    onClose: onErrorsModalClose,
  } = useDisclosure()

  return (
    <>
      <Tr>
        <Td>{engraverId}</Td>
        <Td>{engraverName}</Td>
        <Td>
          <Flex w="full" direction="row" alignItems="center" gap={2}>
            <Text>{processedOrderCount} orders</Text>

            <Button
              w="fit-content"
              size="xs"
              variant="outline"
              colorScheme="blue"
              onClick={onOrdersModalOpen}
            >
              View Orders
            </Button>
          </Flex>
        </Td>
        <Td>
          <Flex w="full" direction="row" alignItems="center" gap={2}>
            <Text>{errorsCount} storage goods</Text>

            <Button
              w="fit-content"
              size="xs"
              variant="outline"
              colorScheme="blue"
              onClick={onErrorsModalOpen}
            >
              View Errors
            </Button>
          </Flex>
        </Td>
        <Td>{averageProcessingTimeText}</Td>
        <Td>
          <CustomTooltip
            label="Remove Engraver from list"
            placement="top"
            fontWeight="normal"
            fontStyle="normal"
          >
            <IconButton
              aria-label="remove-engraver-btn"
              icon={<FiMinus />}
              variant="ghost"
              colorScheme="red"
              onClick={handleRemove}
            />
          </CustomTooltip>
        </Td>
      </Tr>

      {/* Modals */}
      <>
        {/* Orders Modal */}
        <EngraverOrdersDrawer
          engraver={engraver}
          ordersList={ordersList}
          isOpen={isOrdersModalOpen}
          onClose={onOrdersModalClose}
        />

        {/* Storage Goods Defects Modal */}
        <EngraverStorageGoodsErrorsDrawer
          engraver={engraver}
          storageGoodsDefects={storage_goods_defects}
          isOpen={isErrorsModalOpen}
          onClose={onErrorsModalClose}
        />
      </>
    </>
  )
}
