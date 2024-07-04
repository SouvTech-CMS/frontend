import {
  Button,
  Flex,
  FormControl,
  Input,
  Modal,
  ModalBody,
  ModalCloseButton,
  ModalContent,
  ModalFooter,
  ModalHeader,
  ModalOverlay,
  Select,
} from "@chakra-ui/react"
import { PurchaseStatus } from "constant/purchaseStatus"
import { ChangeEvent, FC, useState } from "react"
import { FiArrowRight } from "react-icons/fi"
import { usePurchaseUpdateMutation } from "service/purchase"
import { usePurchaseGoodUpdateMutation } from "service/purchaseGood"
import { titleCase } from "title-case"
import { ModalProps } from "type/modalProps"
import { Purchase } from "type/purchase"
import { PurchaseGood } from "type/purchaseGood"
import { WithId } from "type/withId"
import { notify } from "util/toasts"

interface PurchaseGoodsStatusUpdateModalProps extends ModalProps {
  purchase: WithId<Purchase>
  goods: WithId<PurchaseGood>[]
}

export const PurchaseGoodsStatusUpdateModal: FC<
  PurchaseGoodsStatusUpdateModalProps
> = (props) => {
  const { purchase, goods, isOpen, onClose } = props

  const [newStatus, setNewStatus] = useState<string>()
  const [newDeadline, setNewDeadline] = useState<string>(
    new Date(purchase.deadline * 1000).toISOString().split("T")[0]
  )

  const purchaseUpdateMutation = usePurchaseUpdateMutation()
  const purchaseGoodUpdateMutation = usePurchaseGoodUpdateMutation()

  const isLoading =
    purchaseUpdateMutation.isLoading || purchaseGoodUpdateMutation.isLoading

  const prevStatus = titleCase(goods[0].status)

  const isStatusesEqual =
    newStatus?.toLocaleLowerCase() === prevStatus.toLocaleLowerCase()

  const isStatusInvalid = !newStatus?.trim() || isStatusesEqual
  const isDeadlineInvalid = !newDeadline?.trim()

  const isSaveBtnDisabled =
    isStatusInvalid || isStatusesEqual || isDeadlineInvalid

  const handleNewStatusChange = (e: ChangeEvent<HTMLSelectElement>) => {
    const status = e.target.value
    setNewStatus(status)
  }

  const handleNewDeadlineChange = (e: ChangeEvent<HTMLInputElement>) => {
    const value = e.target.value
    setNewDeadline(value)
  }

  const onGoodsStatusUpdate = async () => {
    goods.forEach(async (good) => {
      const body: WithId<PurchaseGood> = {
        ...good,
        status: newStatus!,
      }

      await purchaseGoodUpdateMutation.mutateAsync(body)
    })

    const formattedDeadline = new Date(newDeadline).getTime() / 1000

    const body: WithId<Purchase> = {
      ...purchase,
      deadline: formattedDeadline,
    }

    await purchaseUpdateMutation.mutateAsync(body)

    notify(`Purchase #${purchase.id} was updated successfully`, "success")
    onClose()
  }

  return (
    <Modal size="xl" isOpen={isOpen} onClose={onClose} isCentered>
      <ModalOverlay backdropFilter="blur(10px)" />

      <ModalContent>
        <ModalHeader>Update Purchase Status</ModalHeader>
        <ModalCloseButton />

        <ModalBody>
          <Flex w="full" direction="column" gap={5}>
            {/* New Status */}
            <Flex alignItems="center" gap={5}>
              <Input value={prevStatus} type="text" isDisabled />

              {/* Arrow Icon */}
              <Flex>
                <FiArrowRight />
              </Flex>

              {/* New Status Select */}
              <FormControl isInvalid={isStatusInvalid}>
                <Select
                  placeholder="Select new status"
                  onChange={handleNewStatusChange}
                  isInvalid={isStatusInvalid}
                  isDisabled={isLoading}
                >
                  {Object.values(PurchaseStatus).map((status, index) => (
                    <option key={index} value={status}>
                      {titleCase(status)}
                    </option>
                  ))}
                </Select>
              </FormControl>
            </Flex>

            {/* Deadline Input */}
            <Input
              placeholder="New deadline"
              value={newDeadline}
              type="date"
              onChange={handleNewDeadlineChange}
              isInvalid={isDeadlineInvalid}
              isDisabled={isLoading}
            />
          </Flex>
        </ModalBody>

        <ModalFooter>
          <Flex gap={5}>
            <Button
              variant="solid"
              colorScheme="blue"
              onClick={onGoodsStatusUpdate}
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
