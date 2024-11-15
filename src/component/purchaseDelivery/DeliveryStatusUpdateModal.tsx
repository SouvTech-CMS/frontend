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
  Select,
} from "@chakra-ui/react"
import { ModalBackgroundBlur } from "component/ModalBackgroundBlur"
import { PurchaseDeliveryStatus } from "constant/purchaseStatus"
import { ChangeEvent, FC, useEffect, useState } from "react"
import { FiArrowRight } from "react-icons/fi"
import { usePurchaseDeliveryUpdateMutation } from "service/purchaseDelivery/purchaseDelivery"
import { titleCase } from "title-case"
import { ModalProps } from "type/modalProps"
import { PurchaseDelivery } from "type/purchaseDelivery/purchaseDelivery"
import { WithId } from "type/withId"
import {
  dateAsStringToTimestamp,
  timestampToDateAsString,
} from "util/formatting"
import { getPurchaseDeadlineByStatus } from "util/purchaseDeadline"
import { notify } from "util/toasts"

interface DeliveryStatusUpdateModalProps extends ModalProps {
  delivery: WithId<PurchaseDelivery>
  prevStatus: string
}

export const DeliveryStatusUpdateModal: FC<DeliveryStatusUpdateModalProps> = (
  props,
) => {
  const { delivery, prevStatus, isOpen, onClose } = props

  const [newStatus, setNewStatus] = useState<string>(prevStatus)
  const [newDeadline, setNewDeadline] = useState<string>(
    timestampToDateAsString(delivery.deadline),
  )

  const deliveryUpdateMutation = usePurchaseDeliveryUpdateMutation()

  const isLoading = deliveryUpdateMutation.isLoading

  const isSaveBtnDisabled = isLoading || !newDeadline.trim()

  const handlePurchaseDeliveryStatusUpdate = (
    e: ChangeEvent<HTMLSelectElement>,
  ) => {
    const status = e.target.value
    setNewStatus(status)

    const statusDeadlineTimestamp = getPurchaseDeadlineByStatus(status)
    const statusDeadline = timestampToDateAsString(statusDeadlineTimestamp)
    setNewDeadline(statusDeadline)
  }

  const onPurchaseDeliveryUpdate = async () => {
    const purchaseDeliveryId = delivery.id
    const formattedDeadline = dateAsStringToTimestamp(newDeadline)

    const body: WithId<PurchaseDelivery> = {
      id: purchaseDeliveryId,
      shipping: delivery.shipping,
      after_custom_shipping: delivery.after_custom_shipping,
      track_number: delivery.track_number,
      after_custom_track_number: delivery.after_custom_track_number,
      deadline: formattedDeadline,
      status: newStatus,
    }

    await deliveryUpdateMutation.mutateAsync(body)

    notify(
      `Delivery #${purchaseDeliveryId} was updated successfully`,
      "success",
    )
    onClose()
  }

  useEffect(() => {
    setNewStatus(prevStatus)
    setNewDeadline(timestampToDateAsString(delivery.deadline))
  }, [isOpen, prevStatus, delivery.deadline])

  return (
    <Modal size="xl" isOpen={isOpen} onClose={onClose} isCentered>
      <ModalBackgroundBlur />

      <ModalContent>
        <ModalHeader>Update Delivery Status & Deadline</ModalHeader>
        <ModalCloseButton />

        <ModalBody>
          <Flex w="full" direction="column" gap={5}>
            {/* New Status */}
            <Flex alignItems="center" gap={5}>
              {/* Prev Status */}
              <Input value={titleCase(prevStatus)} type="text" isReadOnly />

              {/* Arrow Icon */}
              <Flex>
                <FiArrowRight />
              </Flex>

              {/* New Status Select */}
              <Select
                placeholder="Select new status"
                value={newStatus}
                onChange={handlePurchaseDeliveryStatusUpdate}
                isDisabled={isLoading}
              >
                {Object.values(PurchaseDeliveryStatus).map((status, index) => (
                  <option key={index} value={status}>
                    {titleCase(status)}
                  </option>
                ))}
              </Select>
            </Flex>

            {/* Deadline */}
            <Input
              placeholder="Deadline"
              value={newDeadline}
              type="date"
              onChange={(e) => {
                const value = e.target.value
                setNewDeadline(value)
              }}
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
