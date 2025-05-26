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
import { DrawerOrderCard } from "component/order/DrawerOrderCard"
import { FC } from "react"
import { EngraverWithUser } from "type/engraver/engraver"
import { ModalProps } from "type/modalProps"
import { Order } from "type/order/order"
import { WithId } from "type/withId"

interface EngraverOrdersDrawerProps extends ModalProps {
  engraver: WithId<EngraverWithUser>
  ordersList: WithId<Order>[]
}

export const EngraverOrdersDrawer: FC<EngraverOrdersDrawerProps> = (props) => {
  const { engraver, ordersList, isOpen, onClose } = props

  const engraverId = engraver.id

  return (
    <Drawer size="sm" placement="right" isOpen={isOpen} onClose={onClose}>
      <ModalBackgroundBlur />

      <DrawerContent>
        <DrawerCloseButton />

        <DrawerHeader>Orders processed by Engraver #{engraverId}</DrawerHeader>

        <DrawerBody>
          <Flex w="full" direction="column" gap={5}>
            {/* Cards List */}
            {ordersList.map((order, index) => (
              <DrawerOrderCard key={index} order={order} />
            ))}
          </Flex>
        </DrawerBody>

        <DrawerFooter></DrawerFooter>
      </DrawerContent>
    </Drawer>
  )
}
