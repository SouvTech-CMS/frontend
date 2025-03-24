import { Flex, Input, InputGroup, InputRightElement } from "@chakra-ui/react"
import { ChangeEvent, Dispatch, FC, SetStateAction } from "react"
import { FiSearch } from "react-icons/fi"

interface OrderIdSearchInputProps {
  orderId: string
  setOrderId: Dispatch<SetStateAction<string>>
  isInvalid?: boolean
}

export const OrderIdSearchInput: FC<OrderIdSearchInputProps> = (props) => {
  const { orderId, setOrderId, isInvalid } = props

  const handleChange = (e: ChangeEvent<HTMLInputElement>) => {
    const value = e.target.value
    setOrderId(value)
  }

  return (
    <InputGroup>
      <Input
        bgColor="white"
        placeholder="Order ID"
        value={orderId}
        type="text"
        py={6}
        pl={6}
        pr={16}
        fontSize="lg"
        border="none"
        borderRadius={50}
        onChange={handleChange}
        isInvalid={isInvalid}
      />

      <InputRightElement h="full">
        <Flex
          h="full"
          direction="column"
          justifyContent="center"
          alignItems="center"
          mr={2}
        >
          <FiSearch color="gray" />
        </Flex>
      </InputRightElement>
    </InputGroup>
  )
}
