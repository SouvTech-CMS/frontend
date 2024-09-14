import {
  Flex,
  GridItem,
  Input,
  InputGroup,
  InputProps,
  Text,
} from "@chakra-ui/react"
import { FC } from "react"

interface ProductionInfoModalInputProps extends InputProps {}

export const ProductionInfoModalInput: FC<ProductionInfoModalInputProps> = (
  props,
) => {
  const { placeholder, value, onChange, isDisabled } = props

  return (
    <GridItem>
      <Flex direction="column" gap={1}>
        <Text w="full" fontWeight="medium" textAlign="center">
          {placeholder}
        </Text>

        <InputGroup>
          <Input
            placeholder={placeholder}
            value={value}
            type="text"
            textAlign="center"
            onChange={onChange}
            isDisabled={isDisabled}
          />
        </InputGroup>
      </Flex>
    </GridItem>
  )
}
