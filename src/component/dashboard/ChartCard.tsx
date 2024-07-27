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
      <CardBody>
        <Flex h="full" justifyContent="flex-start" px={2} gap={5}>
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

          <Flex direction="column" justifyContent="center">
            <Text fontSize="xs" color="gray" fontWeight="light">
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
