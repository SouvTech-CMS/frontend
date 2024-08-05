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
  Text,
} from "@chakra-ui/react"
import { ModalBackgroundBlur } from "component/ModalBackgroundBlur"
import { CommentInput } from "component/comment/Comment"
import { PurchaseDeliveryGoodsSelectList } from "component/purchaseDelivery/PurchaseDeliveryGoodsSelectList"
import { useCommentInput } from "hook/useCommentInput"
import { FC, useEffect, useState } from "react"
import { usePurchaseDeliveryCreateMutation } from "service/purchaseDelivery"
import { ModalProps } from "type/modalProps"
import { PurchaseDelivery, PurchaseDeliveryCreate } from "type/purchaseDelivery"
import { PurchaseGood } from "type/purchaseGood"
import { WithId } from "type/withId"
import { notify } from "util/toasts"

interface NewDeliveryModalProps extends ModalProps {}

const newDelivery: PurchaseDelivery = {
  deadline: Math.floor(Date.now() / 1000),
}

export const NewDeliveryModal: FC<NewDeliveryModalProps> = (props) => {
  const { isOpen, onClose } = props

  const [delivery, setDelivery] = useState<PurchaseDelivery>(newDelivery)
  const [goods, setGoods] = useState<WithId<PurchaseGood>[]>([])
  const [deadline, setDeadline] = useState<string>(
    new Date(newDelivery.deadline * 1000).toISOString().split("T")[0],
  )

  const { comment, handleCommentChange, onCommentSubmit, isCommentLoading } =
    useCommentInput({
      objectName: "purchase_delivery",
    })

  const purchaseDeliveryCreateMutation = usePurchaseDeliveryCreateMutation()

  const isLoading = purchaseDeliveryCreateMutation.isLoading

  const isSaveBtnDisabled = isLoading || goods.length === 0 || !deadline.trim()

  const handleDeliveryUpdate = (param: string, value: number | string) => {
    setDelivery((prevDelivery) => ({
      ...prevDelivery,
      [param]: value,
    }))
  }

  const onPurchaseDeliveryCreate = async () => {
    const formattedDeadline = new Date(deadline).getTime() / 1000

    const purchaseDeliveryGoodsIds = goods.map((good) => good.id)

    const body: PurchaseDeliveryCreate = {
      purchase_delivery: {
        ...delivery,
        deadline: formattedDeadline,
      },
      purchase_delivery_good: purchaseDeliveryGoodsIds,
    }

    const { purchase_delivery: newPurchaseDelivery } =
      await purchaseDeliveryCreateMutation.mutateAsync(body)

    await onCommentSubmit(newPurchaseDelivery.id)

    notify("Delivery was created successfully", "success")

    onClose()
  }

  useEffect(() => {
    setGoods([])
  }, [isOpen])

  return (
    <Modal size="2xl" isOpen={isOpen} onClose={onClose} isCentered>
      <ModalBackgroundBlur />

      <ModalContent>
        <ModalHeader>New Delivery</ModalHeader>
        <ModalCloseButton />

        <ModalBody>
          <Flex direction="column" gap={5}>
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
                  value={delivery.track_number}
                  type="text"
                  onChange={(e) => {
                    const value = e.target.value
                    handleDeliveryUpdate("track_number", value)
                  }}
                />
              </Flex>

              {/* Track Number after Custom */}
              <Flex w="full" direction="column" gap={1}>
                <Text fontWeight="bold">Track Number after Custom:</Text>

                <Input
                  placeholder="Track Number after Custom"
                  value={delivery.after_custom_track_number}
                  type="text"
                  onChange={(e) => {
                    const value = e.target.value
                    handleDeliveryUpdate("after_custom_track_number", value)
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
                  value={delivery.after_custom_shipping}
                  type="number"
                  onChange={(e) => {
                    const value = e.target.valueAsNumber
                    handleDeliveryUpdate("after_custom_shipping", value)
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

            {/* Comment */}
            <CommentInput
              comment={comment}
              handleCommentChange={handleCommentChange}
              isDisabled={isCommentLoading}
            />
          </Flex>
        </ModalBody>

        <ModalFooter>
          <Flex gap={5}>
            <Button
              onClick={onPurchaseDeliveryCreate}
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
