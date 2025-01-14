import {
  ChakraProps,
  Flex,
  Icon,
  Stat,
  StatArrow,
  StatHelpText,
  StatLabel,
  StatNumber,
} from "@chakra-ui/react"
import { FC } from "react"
import { IconType } from "react-icons"

interface ChartCardProps {
  icon?: IconType
  color?: ChakraProps["color"]
  title: string
  value: string
  isIconHidden?: boolean
}

export const ChartCard: FC<ChartCardProps> = (props) => {
  const { icon, color = "blue", title, value, isIconHidden } = props

  return (
    <Flex
      bgColor="white"
      direction="row"
      alignItems="center"
      py={3}
      pb={1}
      px={5}
      pr={20}
      borderRadius={10}
      gap={5}
    >
      {/* Big Icon */}
      {!isIconHidden && (
        <Flex
          bgColor={`${color}.100`}
          justifyContent="center"
          alignItems="center"
          p={4}
          mb={2}
          borderRadius="50%"
        >
          <Icon as={icon} fontSize="xl" boxSize="full" color={color} />
        </Flex>
      )}

      {/* Chart Values */}
      <Stat>
        <StatLabel color="gray" fontWeight="light">
          {title}
        </StatLabel>

        <StatNumber fontSize="xl" fontWeight="bold">
          {value}
        </StatNumber>

        <StatHelpText>
          <StatArrow type="decrease" />
          9.05%
        </StatHelpText>
      </Stat>
    </Flex>
  )
}
