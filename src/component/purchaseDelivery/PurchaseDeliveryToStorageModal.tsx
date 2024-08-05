import {
  Button,
  Flex,
  Modal,
  ModalBody,
  ModalCloseButton,
  ModalContent,
  ModalFooter,
  ModalHeader,
} from "@chakra-ui/react"
import { getFullStorageGoodsList } from "api/storageGood"
import { ModalBackgroundBlur } from "component/ModalBackgroundBlur"
import { GoodToStorageCard } from "component/purchaseDelivery/GoodToStorageCard"
import { FC, useEffect, useState } from "react"
import { useQuery } from "react-query"
import { useMoveGoodsToStorageMutation } from "service/storage"
import { ModalProps } from "type/modalProps"
import { PurchaseDelivery } from "type/purchaseDelivery"
import { PurchaseGood } from "type/purchaseGood"
import { DeliveryToStorage, DeliveryToStorageGood } from "type/storage"
import { StorageGood } from "type/storageGood"
import { WithId } from "type/withId"
import { notify } from "util/toasts"

interface PurchaseDeliveryToStorageModalProps extends ModalProps {
  purchaseDelivery: WithId<PurchaseDelivery>
  purchaseGoods: WithId<PurchaseGood>[]
}

export const PurchaseDeliveryToStorageModal: FC<
  PurchaseDeliveryToStorageModalProps
> = (props) => {
  const { purchaseDelivery, purchaseGoods, isOpen, onClose } = props

  const initialGoodsPairList = purchaseGoods.map((good) => ({
    purchase_good_id: good.id,
  }))

  const [goodsPairs, setGoodsPairs] =
    useState<DeliveryToStorageGood[]>(initialGoodsPairList)

  const { data: storageGoodsList, isLoading: isLoadingStorageGoodsList } =
    useQuery<WithId<StorageGood>[]>(
      "storageGoodsFullList",
      getFullStorageGoodsList,
    )

  const moveGoodsToStorageMutation = useMoveGoodsToStorageMutation()

  const isGoodsPairsInvalid = !!goodsPairs.find((pair) => !pair.storage_good_id)
  const isLoading =
    isLoadingStorageGoodsList || moveGoodsToStorageMutation.isLoading
  const isSaveBtnDisabled = isLoading || isGoodsPairsInvalid

  const handleGoodsPairUpdate = (
    param: string,
    value: number | string,
    purchaseGoodId: number,
  ) => {
    const goodsPair = goodsPairs.find(
      (good) => good.purchase_good_id === purchaseGoodId,
    )

    setGoodsPairs((prevGoods) => [
      ...prevGoods.filter((good) => good !== goodsPair),
      {
        ...goodsPair!,
        [param]: value,
      },
    ])
  }

  const onMoveToStorage = async () => {
    const body: DeliveryToStorage = {
      purchase_delivery_id: purchaseDelivery.id,
      goods: goodsPairs,
    }
    await moveGoodsToStorageMutation.mutateAsync(body)

    notify(
      `Goods from delivery #${purchaseDelivery.id} was moved to Storage successfully`,
      "success",
    )
    onClose()
  }

  useEffect(
    () => {
      setGoodsPairs(initialGoodsPairList)
    },
    // eslint-disable-next-line react-hooks/exhaustive-deps
    [isOpen],
  )

  return (
    <Modal size="4xl" isOpen={isOpen} onClose={onClose}>
      <ModalBackgroundBlur />

      <ModalContent>
        <ModalHeader>Move Goods to Storage</ModalHeader>
        <ModalCloseButton />

        <ModalBody>
          {goodsPairs.map((good, index) => (
            <GoodToStorageCard
              key={index}
              goodsPair={good}
              purchaseGoods={purchaseGoods}
              storageGoods={storageGoodsList}
              handleGoodsPairUpdate={handleGoodsPairUpdate}
            />
          ))}
        </ModalBody>

        <ModalFooter>
          <Flex gap={5}>
            <Button
              onClick={onMoveToStorage}
              isLoading={isLoading}
              isDisabled={isSaveBtnDisabled}
            >
              Save
            </Button>

            <Button variant="secondary" onClick={onClose}>
              Cancel
            </Button>
          </Flex>
        </ModalFooter>
      </ModalContent>
    </Modal>
  )
}
