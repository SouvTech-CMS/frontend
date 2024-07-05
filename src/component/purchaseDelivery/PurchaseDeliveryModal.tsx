import {
  Button,
  Flex,
  Input,
  Modal,
  ModalBody,
  ModalCloseButton,
  ModalContent,
  ModalFooter,
  ModalHeader,
  ModalOverlay,
  Text,
} from "@chakra-ui/react"
import { PurchaseDeliveryGoodsSelectList } from "component/purchaseDelivery/PurchaseDeliveryGoodsSelectList"
import { FC, useEffect, useState } from "react"
import {
  usePurchaseDeliveryCreateMutation,
  usePurchaseDeliveryUpdateMutation,
} from "service/purchaseDelivery"
import { ModalProps } from "type/modalProps"
import { PurchaseDelivery, PurchaseDeliveryCreate } from "type/purchaseDelivery"
import { PurchaseGood } from "type/purchaseGood"
import { WithId } from "type/withId"
import { notify } from "util/toasts"

interface PurchaseDeliveryModalProps extends ModalProps {
  prevPurchaseDelivery?: WithId<PurchaseDelivery>
  prevGoods?: WithId<PurchaseGood>[]
}

const newPurchaseDelivery: PurchaseDelivery = {
  deadline: Math.floor(Date.now() / 1000),
  after_custom_shipping: 0,
  track_number: "",
  after_custom_track_number: "",
}

export const PurchaseDeliveryModal: FC<PurchaseDeliveryModalProps> = (
  props
) => {
  const { prevPurchaseDelivery, prevGoods, isOpen, onClose } = props

  const isNewPurchaseDelivery = !prevPurchaseDelivery || !prevGoods

  const [purchaseDelivery, setPurchaseDelivery] = useState<PurchaseDelivery>(
    prevPurchaseDelivery || newPurchaseDelivery
  )
  const [goods, setGoods] = useState<WithId<PurchaseGood>[]>(prevGoods || [])
  const [deadline, setDeadline] = useState<string>(
    new Date(newPurchaseDelivery.deadline * 1000).toISOString().split("T")[0]
  )

  const purchaseDeliveryCreateMutation = usePurchaseDeliveryCreateMutation()
  const purchaseDeliveryUpdateMutation = usePurchaseDeliveryUpdateMutation()

  const isLoading =
    purchaseDeliveryCreateMutation.isLoading ||
    purchaseDeliveryUpdateMutation.isLoading

  const isSaveBtnDisabled = isLoading || goods.length === 0 || !deadline.trim()

  const handlePurchaseDeliveryUpdate = (
    param: string,
    value: number | string
  ) => {
    setPurchaseDelivery((prevPurchaseDelivery) => ({
      ...prevPurchaseDelivery,
      [param]: value,
    }))
  }

  const onPurchaseDeliveryUpdate = async () => {
    const formattedDeadline = new Date(deadline).getTime() / 1000

    if (isNewPurchaseDelivery) {
      const purchaseDeliveryGoodsIds = goods.map((good) => good.id)

      const body: PurchaseDeliveryCreate = {
        purchase_delivery: {
          ...purchaseDelivery,
          deadline: formattedDeadline,
        },
        purchase_delivery_good: purchaseDeliveryGoodsIds,
      }

      await purchaseDeliveryCreateMutation.mutateAsync(body)

      notify("Delivery was created successfully", "success")
    } else {
      const purchaseDeliveryId = prevPurchaseDelivery.id
      const body: WithId<PurchaseDelivery> = {
        ...purchaseDelivery,
        id: purchaseDeliveryId,
        deadline: formattedDeadline,
      }

      await purchaseDeliveryUpdateMutation.mutateAsync(body)

      notify(
        `Delivery #${purchaseDeliveryId} was updated successfully`,
        "success"
      )
    }
    onClose()
  }

  useEffect(() => {
    if (isNewPurchaseDelivery) {
      setPurchaseDelivery(newPurchaseDelivery)
      setGoods([])
    } else {
      setPurchaseDelivery(prevPurchaseDelivery)
      setGoods(prevGoods)
    }
  }, [isOpen, isNewPurchaseDelivery, prevPurchaseDelivery, prevGoods])

  return (
    <Modal size="2xl" isOpen={isOpen} onClose={onClose} isCentered>
      <ModalOverlay backdropFilter="blur(10px)" />

      <ModalContent>
        <ModalHeader>New Delivery</ModalHeader>
        <ModalCloseButton />

        <ModalBody>
          <Flex direction="column" gap={10}>
            <PurchaseDeliveryGoodsSelectList
              selectedGoods={goods}
              setSelectedGoods={setGoods}
            />

            {/* Track Number and Track Number after Custom */}
            <Flex w="full" gap={10}>
              {/* Track Number */}
              <Flex w="full" direction="column" gap={1}>
                <Text fontWeight="bold">Track Number:</Text>

                <Input
                  placeholder="Track Number"
                  value={purchaseDelivery.track_number}
                  type="text"
                  onChange={(e) => {
                    const value = e.target.value
                    handlePurchaseDeliveryUpdate("track_number", value)
                  }}
                />
              </Flex>

              {/* Track Number after Custom */}
              <Flex w="full" direction="column" gap={1}>
                <Text fontWeight="bold">Track Number after Custom:</Text>

                <Input
                  placeholder="Track Number after Custom"
                  value={purchaseDelivery.after_custom_track_number}
                  type="text"
                  onChange={(e) => {
                    const value = e.target.value
                    handlePurchaseDeliveryUpdate(
                      "after_custom_track_number",
                      value
                    )
                  }}
                />
              </Flex>
            </Flex>

            {/* Shipping after Custom and Deadline */}
            <Flex w="full" gap={10}>
              {/* Shipping after Custom */}
              <Flex w="full" direction="column" gap={1}>
                <Text fontWeight="bold">Shipping after Custom:</Text>

                <Input
                  placeholder="Shipping after Custom"
                  value={purchaseDelivery.after_custom_shipping}
                  type="number"
                  onChange={(e) => {
                    const value = Number(e.target.value)
                    handlePurchaseDeliveryUpdate("after_custom_shipping", value)
                  }}
                />
              </Flex>

              {/* Deadline */}
              <Flex w="full" direction="column" gap={1}>
                <Text fontWeight="bold">Deadline:</Text>

                <Input
                  placeholder="Deadline"
                  value={deadline}
                  type="date"
                  onChange={(e) => {
                    const value = e.target.value
                    setDeadline(value)
                  }}
                />
              </Flex>
            </Flex>
          </Flex>
        </ModalBody>

        <ModalFooter>
          <Flex gap={5}>
            <Button
              variant="solid"
              colorScheme="blue"
              onClick={onPurchaseDeliveryUpdate}
              isLoading={isLoading}
              isDisabled={isSaveBtnDisabled}
            >
              Save
            </Button>

            <Button variant="solid" colorScheme="gray" onClick={onClose}>
              Cancel
            </Button>
          </Flex>
        </ModalFooter>
      </ModalContent>
    </Modal>
  )
}
