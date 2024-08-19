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
import { PurchaseDeliveryGood } from "type/purchaseDelivery/purchaseDeliveryGood"
import { PurchaseDelivery } from "type/purchaseDelivery/purchaseDelivery"
import { DeliveryToStorage } from "type/storage"
import { StorageGood } from "type/storageGood"
import { WithId } from "type/withId"
import { notify } from "util/toasts"

interface PurchaseDeliveryToStorageModalProps extends ModalProps {
  delivery: WithId<PurchaseDelivery>
  goods: WithId<PurchaseDeliveryGood>[]
}

export const PurchaseDeliveryToStorageModal: FC<
  PurchaseDeliveryToStorageModalProps
> = (props) => {
  const { delivery, goods, isOpen, onClose } = props

  const deliveryId = delivery.id

  const initialGoodsPairList: DeliveryToStorage[] = goods.map((good) => ({
    delivery_good_id: good.id,
    storage_good_id: NaN,
    shops: [],
  }))

  const [goodsPairs, setGoodsPairs] =
    useState<DeliveryToStorage[]>(initialGoodsPairList)

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

  const handleGoodsPairUpdate = (newGoodsPair: DeliveryToStorage) => {
    const prevGoodsPairs = goodsPairs.filter(
      (goodsPair) =>
        goodsPair.delivery_good_id !== newGoodsPair.delivery_good_id,
    )

    setGoodsPairs([...prevGoodsPairs, newGoodsPair])
  }

  const onMoveToStorage = async () => {
    const body: DeliveryToStorage[] = goodsPairs
    await moveGoodsToStorageMutation.mutateAsync(body)

    notify(
      `Goods from delivery #${deliveryId} was moved to Storage successfully`,
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
          {goodsPairs.map((goodsPair, index) => (
            <GoodToStorageCard
              key={index}
              prevGoodsPair={goodsPair}
              deliveryGoods={goods}
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
