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
import { useCommentInput } from "hook/useCommentInput"
import { FC, useState } from "react"
import { usePurchaseDeliveryUpdateMutation } from "service/purchaseDelivery/purchaseDelivery"
import { ModalProps } from "type/modalProps"
import {
  FullPurchaseDelivery,
  PurchaseDeliveryUpdate,
} from "type/purchaseDelivery/purchaseDelivery"
import { notify } from "util/toasts"

interface DeliveryUpdateModalProps extends ModalProps {
  prevDelivery: FullPurchaseDelivery
}

export const DeliveryUpdateModal: FC<DeliveryUpdateModalProps> = (props) => {
  const { prevDelivery, isOpen, onClose } = props

  const deliveryId = prevDelivery.id

  const [delivery, setDelivery] = useState<PurchaseDeliveryUpdate>({
    id: deliveryId,
    shipping: prevDelivery.shipping,
    after_custom_shipping: prevDelivery.after_custom_shipping,
    track_number: prevDelivery.track_number,
    after_custom_track_number: prevDelivery.after_custom_track_number,
    status: prevDelivery.status,
    deadline: prevDelivery.deadline,
  })

  const { comment, handleCommentChange, onCommentSubmit, isCommentLoading } =
    useCommentInput({
      objectName: "purchase_delivery",
      objectId: deliveryId,
    })

  const purchaseDeliveryUpdateMutation = usePurchaseDeliveryUpdateMutation()

  const isLoading = purchaseDeliveryUpdateMutation.isLoading

  const isSaveBtnDisabled = isLoading

  const handleDeliveryUpdate = (param: string, value: number | string) => {
    setDelivery((prevDelivery) => ({
      ...prevDelivery,
      [param]: value,
    }))
  }

  const onPurchaseDeliveryUpdate = async () => {
    const body: PurchaseDeliveryUpdate = {
      ...delivery,
    }

    await purchaseDeliveryUpdateMutation.mutateAsync(body)

    await onCommentSubmit()

    notify(`Delivery #${deliveryId} updated successfully`, "success")
    onClose()
  }

  return (
    <Modal size="2xl" isOpen={isOpen} onClose={onClose} isCentered>
      <ModalBackgroundBlur />

      <ModalContent>
        <ModalHeader>Delivery #{deliveryId}</ModalHeader>
        <ModalCloseButton />

        <ModalBody>
          <Flex direction="column" gap={5}>
            {/* Shipping & Shipping after Custom */}
            <Flex w="full" gap={10}>
              {/* Shipping */}
              <Flex w="full" direction="column" gap={1}>
                <Text fontWeight="bold">Shipping:</Text>

                <Input
                  placeholder="Shipping"
                  value={delivery.shipping}
                  type="number"
                  onChange={(e) => {
                    const value = e.target.valueAsNumber
                    handleDeliveryUpdate("shipping", value)
                  }}
                />
              </Flex>

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
            </Flex>

            {/* Track Number & Track Number after Custom */}
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
              onClick={onPurchaseDeliveryUpdate}
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
