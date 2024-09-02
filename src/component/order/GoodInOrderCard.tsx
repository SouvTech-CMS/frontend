import {
  Card,
  CardBody,
  CardFooter,
  CardHeader,
  Flex,
  Heading,
  Text,
} from "@chakra-ui/react"
import { SKUBadge } from "component/SKUBadge"
import { FC } from "react"
import { GoodInOrder } from "type/order/good"
import { WithId } from "type/withId"
import { numberWithCurrency, roundNumber } from "util/formatting"

interface GoodInOrderCardProps {
  good: WithId<GoodInOrder>
}

export const GoodInOrderCard: FC<GoodInOrderCardProps> = (props) => {
  const { good } = props

  return (
    <Card borderRadius={20}>
      <CardHeader>
        <Flex direction="column" gap={2}>
          {/* Name */}
          <Heading size="md" fontWeight="medium">
            {good.name}
          </Heading>
        </Flex>
      </CardHeader>

      <CardBody>
        <Flex direction="column" gap={2}>
          {/* ID */}
          <Flex alignItems="center" gap={2}>
            <Text fontWeight="light" color="gray">
              ID:
            </Text>

            <Text>{good.id}</Text>
          </Flex>

          {/* SKU */}
          <Flex alignItems="center" gap={2}>
            <Text fontWeight="light" color="gray">
              SKU:
            </Text>

            <SKUBadge size="xs" sku={good.uniquename} />
          </Flex>

          {/* Item Price */}
          <Flex alignItems="center" gap={2}>
            <Text fontWeight="light" color="gray">
              Item Price:
            </Text>

            <Text>{numberWithCurrency(good.price)}</Text>
          </Flex>

          {/* Quantity */}
          <Flex alignItems="center" gap={2}>
            <Text fontWeight="light" color="gray">
              Quantity:
            </Text>

            <Text>{good.quantity}</Text>
          </Flex>
        </Flex>
      </CardBody>

      <CardFooter>
        {/* Total Amount */}
        <Flex alignItems="center" gap={2}>
          <Text fontWeight="bold">Total amount:</Text>
          <Text>{numberWithCurrency(roundNumber(good.amount))}</Text>
        </Flex>
      </CardFooter>
    </Card>
  )
}
