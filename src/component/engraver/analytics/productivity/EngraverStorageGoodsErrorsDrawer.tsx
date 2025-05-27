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
import { DrawerStorageGoodDefectCard } from "component/storageGoodDefect/DrawerStorageGoodDefectCard"
import { FC } from "react"
import { EngraverWithUser } from "type/engraver/engraver"
import { ModalProps } from "type/modalProps"
import { StorageGoodDefectWithStorageGood } from "type/storage/storageGoodDefect"
import { WithId } from "type/withId"

interface EngraverStorageGoodsErrorsDrawerProps extends ModalProps {
  engraver: WithId<EngraverWithUser>
  storageGoodsDefects: WithId<StorageGoodDefectWithStorageGood>[]
}

export const EngraverStorageGoodsErrorsDrawer: FC<
  EngraverStorageGoodsErrorsDrawerProps
> = (props) => {
  const { engraver, storageGoodsDefects, isOpen, onClose } = props

  const engraverId = engraver.id

  return (
    <Drawer size="sm" placement="right" isOpen={isOpen} onClose={onClose}>
      <ModalBackgroundBlur />

      <DrawerContent>
        <DrawerCloseButton />

        <DrawerHeader>
          Storage Goods Errors by Engraver #{engraverId}
        </DrawerHeader>

        <DrawerBody>
          <Flex w="full" direction="column" gap={5}>
            {/* Cards List */}
            {storageGoodsDefects.map((storageGoodDefect, index) => (
              <DrawerStorageGoodDefectCard
                key={index}
                storageGoodDefect={storageGoodDefect}
              />
            ))}
          </Flex>
        </DrawerBody>

        <DrawerFooter></DrawerFooter>
      </DrawerContent>
    </Drawer>
  )
}
