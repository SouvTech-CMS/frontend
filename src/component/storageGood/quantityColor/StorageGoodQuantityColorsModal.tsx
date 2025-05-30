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
import { useStorageGoodQuantityColorsUpdateMutation } from "service/storage/quantityColor/storageGoodQuantityColor"
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
  prevStorageGoodQuantityColorsList: WithId<StorageGoodQuantityColor>[]
}

export const StorageGoodQuantityColorsModal: FC<
  StorageGoodQuantityColorsModalProps
> = (props) => {
  const { storageGood, prevStorageGoodQuantityColorsList, isOpen, onClose } =
    props

  const goodId = storageGood.id
  const sku = storageGood.uniquename
  const name = storageGood.name

  const prevQuantityColorsList = prevStorageGoodQuantityColorsList.map(
    (goodQuantityColor) => ({
      quantity_color_id: goodQuantityColor.quantity_color_id,
      quantity: goodQuantityColor.quantity,
    }),
  )
  const [storageGoodQuantityColorsList, setStorageGoodQuantityColorsList] =
    useState<QuantityColorItem[]>(prevQuantityColorsList)

  // * All Quantity Colors
  const { data: quantityColorsList, isLoading: isQuantityColorsLoading } =
    useQuery<WithId<QuantityColor>[]>(
      "quantityColorsList",
      getAllQuantityColors,
    )
  const isQuantityColorsListExists =
    !!quantityColorsList && quantityColorsList.length > 0

  const storageGoodQuantityColorsUpdateMutation =
    useStorageGoodQuantityColorsUpdateMutation()

  const isLoading = isQuantityColorsLoading

  const isSaveBtnDisabled =
    isLoading || storageGoodQuantityColorsUpdateMutation.isLoading

  const handleChange = (storageGoodQuantityColor: QuantityColorItem) => {
    setStorageGoodQuantityColorsList((prevStorageGoodQuantityColorsList) => {
      const index = prevStorageGoodQuantityColorsList.findIndex(
        (prevStorageGoodQuantityColor) =>
          prevStorageGoodQuantityColor.quantity_color_id ===
          storageGoodQuantityColor.quantity_color_id,
      )

      if (index === -1) {
        return [...prevStorageGoodQuantityColorsList, storageGoodQuantityColor]
      } else {
        const updatedList = [...prevStorageGoodQuantityColorsList]
        updatedList[index] = storageGoodQuantityColor

        // Find Quantity Color ("moreThan" Quantity Color)
        // with "is_use_more_than_condition" set to true
        // and update its quantity to max
        if (isQuantityColorsListExists) {
          // Find "moreThan" Quantity Color
          const moreThanQuantityColor = quantityColorsList.find(
            (quantityColor) => quantityColor.is_use_more_than_condition,
          )
          if (moreThanQuantityColor) {
            // Get "moreThan" Item in list
            const moreThanQuantityColorId = moreThanQuantityColor.id
            const moreThanItemIndex = updatedList.findIndex(
              (item) => item.quantity_color_id === moreThanQuantityColorId,
            )

            // Get max quantity in items list
            // excluding "moreThan" item
            const maxQuantity: number | undefined = Math.max(
              ...updatedList
                // Exclude "moreThan" item
                .filter(
                  (item) => item.quantity_color_id !== moreThanQuantityColorId,
                )
                // Get list of quantities
                .map((item) => item.quantity)
                // Filter NaN's, undefineds and others
                .filter((quantity) => !!quantity)
                .map(Number),
            )
            if (moreThanItemIndex !== -1) {
              // Set max quantity to "moreThan" item
              updatedList[moreThanItemIndex].quantity = maxQuantity
            } else {
              // Add "moreThan" item if not exists
              updatedList.push({
                quantity_color_id: moreThanQuantityColorId,
                quantity: maxQuantity,
              })
            }
          }
        }

        return updatedList
      }
    })
  }

  const handleUpdate = async () => {
    const body: StorageGoodQuantityColorUpdate = {
      storage_good_id: goodId,
      quantity_colors: storageGoodQuantityColorsList,
    }

    await storageGoodQuantityColorsUpdateMutation.mutateAsync(body)

    notify(
      `Quantity Colors for Storage Good #${goodId} was updated successfully`,
      "success",
    )

    onClose()
  }

  useEffect(
    () => {
      setStorageGoodQuantityColorsList(prevQuantityColorsList)
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
                  onChange={handleChange}
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
