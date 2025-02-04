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
import { getIsIncreased, getPercent } from "util/analytics"
import { numberWithCurrency, roundNumber } from "util/formatting"

interface ChartCardProps {
  icon?: IconType
  color?: ChakraProps["color"]
  title: string
  value?: number
  prevValue?: number
  postfix?: string
  isIconHidden?: boolean
}

export const ChartCard: FC<ChartCardProps> = (props) => {
  const {
    icon,
    color = "blue",
    title,
    value,
    prevValue,
    postfix,
    isIconHidden,
  } = props

  const [diff, isIncreased] = getIsIncreased(value, prevValue)
  const isDiffExists = diff !== undefined
  const isIncreasedExists = isIncreased !== undefined

  const diffInPercent = getPercent(diff, prevValue)

  const isPostfixExists = !!postfix

  return (
    <Flex
      bgColor="white"
      direction="row"
      alignItems="center"
      py={3}
      px={5}
      pr={10}
      borderRadius={10}
      gap={4}
    >
      {/* Big Icon */}
      {!isIconHidden && (
        <Flex
          bgColor={`${color}.100`}
          justifyContent="center"
          alignItems="center"
          p={4}
          borderRadius="50%"
        >
          <Icon as={icon} fontSize="full" boxSize="full" color={color} />
        </Flex>
      )}

      {/* Chart Values */}
      <Stat>
        <StatLabel color="gray" fontWeight="light">
          {title}
        </StatLabel>

        <StatNumber fontSize="xl" fontWeight="medium" whiteSpace="nowrap">
          {isPostfixExists && !!value ? (
            <>
              {roundNumber(value)} {postfix}
            </>
          ) : (
            <>{numberWithCurrency(roundNumber(value)) || "No data"}</>
          )}
        </StatNumber>

        {isDiffExists && (
          <StatHelpText color={isIncreased ? "green.600" : "red.600"}>
            {isIncreasedExists && (
              <StatArrow type={isIncreased ? "increase" : "decrease"} />
            )}
            {/* {numberWithCurrency(roundNumber(diff))} */}
            {Math.abs(roundNumber(diffInPercent))}%
          </StatHelpText>
        )}
      </Stat>
    </Flex>
  )
}
