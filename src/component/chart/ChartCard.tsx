import { Card, CardBody, ChakraProps, Flex, Icon, Text } from "@chakra-ui/react"
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
    <Card>
      <CardBody px={4} py={3} pr={20}>
        <Flex
          h="full"
          direction="row"
          justifyContent="flex-start"
          alignItems="center"
          gap={5}
        >
          {/* Big Icon */}
          {!isIconHidden && (
            <Flex
              h="full"
              alignItems="center"
              bgColor={`${color}.100`}
              p={3}
              borderRadius="50%"
            >
              <Icon as={icon} boxSize="full" color={color} />
            </Flex>
          )}

          {/* Title & Value */}
          <Flex direction="column" justifyContent="center">
            <Text fontSize="sm" color="gray" fontWeight="light">
              {title}
            </Text>

            <Text fontSize="xl" fontWeight="bold">
              {value}
            </Text>
          </Flex>
        </Flex>
      </CardBody>
    </Card>
  )
}
