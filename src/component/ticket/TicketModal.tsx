import {
  Button,
  Flex,
  Modal,
  ModalBody,
  ModalCloseButton,
  ModalContent,
  ModalFooter,
  ModalHeader,
  Textarea,
} from "@chakra-ui/react"
import { ModalBackgroundBlur } from "component/ModalBackgroundBlur"
import { OrderSelect } from "component/select/OrderSelect"
import { useTicketsContext } from "context/tickets"
import { ChangeEvent, FC, useEffect, useState } from "react"
import { useTicketCreateMutation } from "service/ticket/ticket"
import { ModalProps } from "type/modalProps"
import { Order } from "type/order/order"
import { TicketCreate } from "type/ticket/ticket"
import { WithId } from "type/withId"
import { notify } from "util/toasts"

interface TicketModalProps extends ModalProps {}

export const TicketModal: FC<TicketModalProps> = (props) => {
  const { isOpen, onClose } = props

  const { setOpenedTicket } = useTicketsContext()

  const [order, setOrder] = useState<WithId<Order>>()
  const [description, setDescription] = useState<string>()
  const orderId = order?.id
  const marketplaceOrderId = order?.order_id

  const isDescriptionInvalid = !description?.trim()

  const ticketCreateMutation = useTicketCreateMutation()

  const isLoading = ticketCreateMutation.isLoading

  const isSaveBtnDisabled = isLoading || !orderId || isDescriptionInvalid

  const handleDescriptionChange = (e: ChangeEvent<HTMLTextAreaElement>) => {
    const value = e.target.value
    setDescription(value)
  }

  const handleCreate = async () => {
    if (!orderId) {
      notify("Order is not selected", "error")
      return
    }

    if (!description?.trim()) {
      notify("Provide some info about the Order or problem with it", "error")
      return
    }

    const body: TicketCreate = {
      orderId: orderId,
      description: description,
    }

    const ticket = await ticketCreateMutation.mutateAsync(body)

    setOpenedTicket(ticket)

    notify(
      `Ticket for Order #${marketplaceOrderId} was created successfully`,
      "success",
    )
    onClose()
  }

  useEffect(() => {
    setOrder(undefined)
  }, [isOpen])

  return (
    <Modal size="lg" isOpen={isOpen} onClose={onClose} isCentered>
      <ModalBackgroundBlur />

      <ModalContent>
        <ModalHeader>New Ticket</ModalHeader>
        <ModalCloseButton />

        <ModalBody>
          <Flex w="full" direction="column" gap={5}>
            {/* Order Select */}
            <OrderSelect selectedValue={order} onSelect={setOrder} />

            {/* Order Problem */}
            <Textarea
              placeholder="Provide some info about the Order or problem with it"
              value={description}
              onChange={handleDescriptionChange}
              isInvalid={isDescriptionInvalid}
            />
          </Flex>
        </ModalBody>

        <ModalFooter>
          <Flex
            w="full"
            direction="row"
            justifyContent="flex-end"
            alignItems="center"
            gap={2}
          >
            <Button
              onClick={handleCreate}
              isDisabled={isSaveBtnDisabled}
              isLoading={isLoading}
            >
              Save
            </Button>

            <Button variant="secondary" onClick={onClose}>
              Close
            </Button>
          </Flex>
        </ModalFooter>
      </ModalContent>
    </Modal>
  )
}
