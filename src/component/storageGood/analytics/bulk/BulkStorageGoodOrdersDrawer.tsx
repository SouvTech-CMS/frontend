import {
  Drawer,
  DrawerBody,
  DrawerCloseButton,
  DrawerContent,
  DrawerFooter,
  DrawerHeader,
  Flex,
} from "@chakra-ui/react"
import { ModalBackgroundBlur } from "component/ModalBackgroundBlur"
import { BulkStorageGoodOrderCard } from "component/storageGood/analytics/bulk/BulkStorageGoodOrderCard"
import { FC } from "react"
import { ModalProps } from "type/modalProps"
import { Order } from "type/order/order"
import { StorageGood } from "type/storage/storageGood"
import { WithId } from "type/withId"

interface BulkStorageGoodOrdersDrawerProps extends ModalProps {
  storageGood: WithId<StorageGood>
  ordersList: WithId<Order>[]
}

export const BulkStorageGoodOrdersDrawer: FC<
  BulkStorageGoodOrdersDrawerProps
> = (props) => {
  const { storageGood, ordersList, isOpen, onClose } = props

  const goodId = storageGood.id

  return (
    <Drawer size="sm" placement="right" isOpen={isOpen} onClose={onClose}>
      <ModalBackgroundBlur />

      <DrawerContent>
        <DrawerCloseButton />

        <DrawerHeader>Orders with Storage Good #{goodId}</DrawerHeader>

        <DrawerBody>
          <Flex w="full" direction="column" gap={5}>
            {/* Cards List */}
            {ordersList.map((order, index) => (
              <BulkStorageGoodOrderCard key={index} order={order} />
            ))}
          </Flex>
        </DrawerBody>

        <DrawerFooter></DrawerFooter>
      </DrawerContent>
    </Drawer>
  )
}
