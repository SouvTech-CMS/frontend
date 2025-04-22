import { Button, Flex, Heading, Text, Textarea } from "@chakra-ui/react"
import { TicketStatusSelect } from "component/select/TicketStatusSelect"
import { TicketStatus } from "constant/ticketStatus"
import { useTicketsContext } from "context/tickets"
import { ChangeEvent, FC, useEffect, useState } from "react"
import { useTicketUpdateMutation } from "service/ticket/ticket"
import { Ticket } from "type/ticket/ticket"
import { WithId } from "type/withId"
import { notify } from "util/toasts"

interface TicketSummaryProps {}

export const TicketSummary: FC<TicketSummaryProps> = (props) => {
  const {} = props

  const { openedTicket } = useTicketsContext()

  const prevDecisionText = openedTicket?.decision?.text || ""
  const prevStatus = openedTicket?.status

  const [decisionText, setDecisionText] = useState<string>(prevDecisionText)
  const [status, setStatus] = useState<TicketStatus | undefined>(prevStatus)

  const isStatusExists = !!status?.trim()

  const ticketUpdateMutation = useTicketUpdateMutation()

  useEffect(() => {
    setDecisionText(prevDecisionText)
    setStatus(prevStatus)
  }, [openedTicket, prevDecisionText, prevStatus])

  if (!openedTicket) {
    return <></>
  }

  const { order, opened_by, ...ticket } = openedTicket

  const description = ticket.description

  const marketplaceOrderId = order.order_id

  const isLoading = ticketUpdateMutation.isLoading
  const isSaveBtnDisabled = isLoading || !isStatusExists

  const handleDecisionChange = (e: ChangeEvent<HTMLTextAreaElement>) => {
    const value = e.target.value
    setDecisionText(value)
  }

  const handleUpdate = async () => {
    if (!status) {
      notify("Select status for this ticket", "error")
      return
    }

    const body: WithId<Ticket> = {
      ...ticket,
      decision: {
        text: decisionText,
      },
      status: status,
    }

    await ticketUpdateMutation.mutateAsync(body)

    notify(`Ticket #${marketplaceOrderId} was updated successfully`, "success")
  }

  return (
    <Flex w="full" direction="column" gap={5}>
      <Heading size="lg">Order #{marketplaceOrderId}</Heading>

      {/* Problem */}
      <Flex w="full" direction="column" gap={1}>
        <Text fontWeight="semibold">Problem</Text>

        <Flex
          w="full"
          direction="column"
          px={3}
          py={2}
          border="1px solid"
          borderColor="gray.200"
          borderRadius="md"
          gap={1}
        >
          <Text>{description}</Text>
        </Flex>
      </Flex>

      {/* Decision */}
      <Flex w="full" direction="column" gap={1}>
        <Text fontWeight="semibold">Decision</Text>

        <Textarea
          w="full"
          placeholder="Enter decision about this ticket"
          value={decisionText}
          onChange={handleDecisionChange}
          px={3}
          py={2}
        >
          <Text>{description}</Text>
        </Textarea>

        <Flex
          w="full"
          direction="row"
          justifyContent="space-between"
          alignItems="center"
          gap={2}
        >
          <TicketStatusSelect
            selectedValue={status}
            onSelect={setStatus}
            isDisabled={isLoading}
          />

          <Button
            size="sm"
            onClick={handleUpdate}
            isLoading={isLoading}
            isDisabled={isSaveBtnDisabled}
          >
            Save
          </Button>
        </Flex>
      </Flex>
    </Flex>
  )
}
