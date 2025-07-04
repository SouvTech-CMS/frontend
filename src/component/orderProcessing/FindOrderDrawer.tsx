import {
  Drawer,
  DrawerBody,
  DrawerCloseButton,
  DrawerContent,
  DrawerHeader,
  DrawerOverlay,
} from "@chakra-ui/react"
import { FindOrderColumn } from "component/orderProcessing/FindOrderColumn"
import { FC } from "react"
import { ModalProps } from "type/modalProps"

interface FindOrderDrawerProps extends ModalProps {}

export const FindOrderDrawer: FC<FindOrderDrawerProps> = (props) => {
  const { isOpen, onClose } = props

  return (
    <Drawer size="sm" placement="right" isOpen={isOpen} onClose={onClose}>
      <DrawerOverlay />
      <DrawerContent>
        <DrawerCloseButton />
        <DrawerHeader>Just View Orders</DrawerHeader>

        <DrawerBody>
          <FindOrderColumn isReadOnly />
        </DrawerBody>
      </DrawerContent>
    </Drawer>
  )
}
