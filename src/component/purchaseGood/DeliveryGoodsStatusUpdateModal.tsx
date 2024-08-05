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
import { ChangeEvent, FC, useState } from "react"
import { FiArrowRight } from "react-icons/fi"
import { usePurchaseDeliveryUpdateMutation } from "service/purchaseDelivery"
import { usePurchaseGoodUpdateMutation } from "service/purchaseGood"
import { titleCase } from "title-case"
import { ModalProps } from "type/modalProps"
import { PurchaseDelivery } from "type/purchaseDelivery"
import { PurchaseGood } from "type/purchaseGood"
import { WithId } from "type/withId"
import { notify } from "util/toasts"

interface DeliveryGoodsStatusUpdateModalProps extends ModalProps {
  delivery: WithId<PurchaseDelivery>
  goods: WithId<PurchaseGood>[]
  prevStatus: string
}

export const DeliveryGoodsStatusUpdateModal: FC<
  DeliveryGoodsStatusUpdateModalProps
> = (props) => {
  const { delivery, goods, prevStatus, isOpen, onClose } = props

  const [newStatus, setNewStatus] = useState<string>(prevStatus)
  const [deadline, setDeadline] = useState<string>(
    new Date(delivery.deadline * 1000).toISOString().split("T")[0],
  )

  const deliveryUpdateMutation = usePurchaseDeliveryUpdateMutation()
  const purchaseGoodUpdateMutation = usePurchaseGoodUpdateMutation()

  const isLoading = deliveryUpdateMutation.isLoading

  const isSaveBtnDisabled = isLoading || goods.length === 0 || !deadline.trim()

  const handlePurchaseDeliveryStatusUpdate = (
    e: ChangeEvent<HTMLSelectElement>,
  ) => {
    const newStatus = e.target.value
    setNewStatus(newStatus)
  }

  const onPurchaseDeliveryUpdate = async () => {
    const formattedDeadline = new Date(deadline).getTime() / 1000

    const purchaseDeliveryId = delivery.id
    const body: WithId<PurchaseDelivery> = {
      ...delivery,
      id: purchaseDeliveryId,
      deadline: formattedDeadline,
    }

    await deliveryUpdateMutation.mutateAsync(body)

    const isStatusEqual = prevStatus === newStatus
    const isNewStatusExists = !!newStatus.trim()
    const isStatusChanged = !isStatusEqual && isNewStatusExists
    if (isStatusChanged) {
      goods.forEach(async (good) => {
        const body: WithId<PurchaseGood> = {
          ...good,
          status: newStatus,
        }

        await purchaseGoodUpdateMutation.mutateAsync(body)
      })
    }

    notify(
      `Delivery #${purchaseDeliveryId} was updated successfully`,
      "success",
    )

    onClose()
  }

  return (
    <Modal size="xl" isOpen={isOpen} onClose={onClose} isCentered>
      <ModalBackgroundBlur />

      <ModalContent>
        <ModalHeader>Update Purchase Status & Deadline</ModalHeader>
        <ModalCloseButton />

        <ModalBody>
          <Flex w="full" direction="column" gap={5}>
            {/* New Status */}
            <Flex alignItems="center" gap={5}>
              {/* Prev Status */}
              <Input value={titleCase(prevStatus)} type="text" isDisabled />

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
              value={deadline}
              type="date"
              onChange={(e) => {
                const value = e.target.value
                setDeadline(value)
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
