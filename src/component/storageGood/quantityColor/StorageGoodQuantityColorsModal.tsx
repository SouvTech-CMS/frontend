import {
  Button,
  Divider,
  Flex,
  Modal,
  ModalBody,
  ModalCloseButton,
  ModalContent,
  ModalFooter,
  ModalHeader,
  Text,
} from "@chakra-ui/react"
import { getAllQuantityColors } from "api/storage/quantityColor"
import { SKUBadge } from "component/badge/SKUBadge"
import { ModalBackgroundBlur } from "component/ModalBackgroundBlur"
import { StorageGoodQuantityColorItem } from "component/storageGood/quantityColor/StorageGoodQuantityColorItem"
import { FC, useEffect, useState } from "react"
import { useQuery } from "react-query"
import { useStorageGoodQuantityColorsMutation } from "service/storage/quantityColor/storageGoodQuantityColor"
import { ModalProps } from "type/modalProps"
import { QuantityColor } from "type/storage/quantityColor/quantityColor"
import {
  QuantityColorItem,
  StorageGoodQuantityColor,
  StorageGoodQuantityColorUpdate,
} from "type/storage/quantityColor/storageGoodQuantityColor"
import { StorageGood } from "type/storage/storageGood"
import { WithId } from "type/withId"
import { notify } from "util/toasts"

interface StorageGoodQuantityColorsModalProps extends ModalProps {
  storageGood: WithId<StorageGood>
  quantityColorList: WithId<StorageGoodQuantityColor>[]
}

export const StorageGoodQuantityColorsModal: FC<
  StorageGoodQuantityColorsModalProps
> = (props) => {
  const { storageGood, quantityColorList, isOpen, onClose } = props

  const goodId = storageGood.id
  const sku = storageGood.uniquename
  const name = storageGood.name

  const prevQuantityColorList = quantityColorList.map((goodQuantityColor) => ({
    quantity_color_id: goodQuantityColor.quantity_color_id,
    quantity: goodQuantityColor.quantity,
  }))
  const [storageGoodQuantityColorsList, setStorageGoodQuantityColorsList] =
    useState<QuantityColorItem[]>(prevQuantityColorList)

  // * All Quantity Colors
  const { data: quantityColorsList, isLoading: isQuantityColorsLoading } =
    useQuery<WithId<QuantityColor>[]>(
      "quantityColorsList",
      getAllQuantityColors,
    )

  const storageGoodQuantityColorsMutation =
    useStorageGoodQuantityColorsMutation()

  const isLoading = isQuantityColorsLoading

  const isSaveBtnDisabled =
    isLoading || storageGoodQuantityColorsMutation.isLoading

  const handleUpdate = async () => {
    const body: StorageGoodQuantityColorUpdate = {
      storage_good_id: goodId,
      quantity_colors: storageGoodQuantityColorsList,
    }

    await storageGoodQuantityColorsMutation.mutateAsync(body)

    notify(
      `Quantity Colors for Storage Good #${goodId} was updated successfully`,
      "success",
    )

    onClose()
  }

  useEffect(
    () => {
      setStorageGoodQuantityColorsList(prevQuantityColorList)
    },
    // eslint-disable-next-line react-hooks/exhaustive-deps
    [isOpen],
  )

  return (
    <Modal size="xl" isOpen={isOpen} onClose={onClose} isCentered>
      <ModalBackgroundBlur />

      <ModalContent>
        <ModalHeader>Storage Good Quantity Colors</ModalHeader>
        <ModalCloseButton />

        <ModalBody>
          <Flex w="full" direction="column" gap={5}>
            {/* Storage Good */}
            <Divider />
            <Flex
              w="full"
              direction="row"
              justifyContent="center"
              alignItems="center"
              gap={2}
            >
              <SKUBadge sku={sku} />

              <Text>{name}</Text>
            </Flex>
            <Divider />

            <Flex w="full" direction="column" gap={2}>
              {quantityColorsList?.map((quantityColor, index) => (
                <StorageGoodQuantityColorItem
                  key={index}
                  storageGoodId={goodId}
                  storageGoodQuantityColorsList={storageGoodQuantityColorsList}
                  quantityColor={quantityColor}
                  setStorageGoodQuantityColorsList={
                    setStorageGoodQuantityColorsList
                  }
                  isDisabled={isLoading}
                />
              ))}
            </Flex>
          </Flex>
        </ModalBody>

        <ModalFooter>
          <Flex gap={5}>
            <Button
              onClick={handleUpdate}
              isLoading={isLoading}
              isDisabled={isSaveBtnDisabled}
            >
              Save
            </Button>

            <Button variant="secondary" onClick={onClose} isLoading={isLoading}>
              Cancel
            </Button>
          </Flex>
        </ModalFooter>
      </ModalContent>
    </Modal>
  )
}
