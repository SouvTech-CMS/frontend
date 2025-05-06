import { Tab, TabList, TabPanel, TabPanels, Tabs } from "@chakra-ui/react"
import { TicketsList } from "component/ticket/TicketsList"
import { TICKET_ACTIVE_STATUSES } from "constant/ticketStatus"
import { useTicketsContext } from "context/tickets"
import { FC } from "react"
import { FullTicket } from "type/ticket/ticket"
import { WithId } from "type/withId"

interface TicketsTabsProps {
  ticketsList: WithId<FullTicket>[]
}

const TABS = ["Active", "Completed"]

export const TicketsTabs: FC<TicketsTabsProps> = (props) => {
  const { ticketsList } = props

  const { tabIndex, setTabIndex } = useTicketsContext()

  const activeTickets = ticketsList.filter((ticket) =>
    TICKET_ACTIVE_STATUSES.includes(ticket.status),
  )
  const completedTickets = ticketsList.filter(
    (ticket) => !TICKET_ACTIVE_STATUSES.includes(ticket.status),
  )

  return (
    <Tabs index={tabIndex} onChange={setTabIndex} w="full" variant="enclosed">
      <TabList>
        {TABS.map((name, index) => (
          <Tab w="full" key={index} fontWeight="bold">
            {name}
          </Tab>
        ))}
      </TabList>

      <TabPanels px={0}>
        <TabPanel p={0}>
          <TicketsList ticketsList={activeTickets} />
        </TabPanel>

        <TabPanel p={0}>
          <TicketsList ticketsList={completedTickets} />
        </TabPanel>
      </TabPanels>
    </Tabs>
  )
}
