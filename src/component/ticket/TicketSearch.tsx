import { Flex, Input, InputGroup, InputRightElement } from "@chakra-ui/react"
import { ChangeEvent, Dispatch, FC, SetStateAction } from "react"
import { FiSearch } from "react-icons/fi"

interface TicketSearchProps {
  ticketOrderId?: string
  setTicketOrderId: Dispatch<SetStateAction<string | undefined>>
}

export const TicketSearch: FC<TicketSearchProps> = (props) => {
  const { ticketOrderId, setTicketOrderId } = props

  const handleChange = (e: ChangeEvent<HTMLInputElement>) => {
    const value = e.target.value.trim()
    setTicketOrderId(value)
  }

  return (
    <Flex w="full" justifyContent="center" alignItems="center" px={3} py={4}>
      <InputGroup>
        <Input
          placeholder="Enter Order ID"
          value={ticketOrderId}
          onChange={handleChange}
        />

        <InputRightElement>
          <FiSearch color="gray" />
        </InputRightElement>
      </InputGroup>
    </Flex>
  )
}
