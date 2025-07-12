import {
  Button,
  Card,
  CardFooter,
  CardHeader,
  Flex,
  Heading,
  Text,
} from "@chakra-ui/react"
import { FC } from "react"
import { Link } from "react-router-dom"
import { PurchaseDelivery } from "type/purchaseDelivery/purchaseDelivery"
import { WithId } from "type/withId"
import { formatDate, timestampToDate } from "util/formatting"

interface DeliveryCardProps {
  delivery: WithId<PurchaseDelivery>
}

export const DeliveryCard: FC<DeliveryCardProps> = (props) => {
  const { delivery } = props

  const deliveryId = delivery.id
  const createdAt = timestampToDate(delivery.created_at)

  return (
    <Card size="md" borderRadius={10}>
      <CardHeader>
        <Flex w="full" direction="column">
          {/* Order ID */}
          <Heading size="md">Delivery #{deliveryId}</Heading>

          {/* Created At */}
          <Text size="sm" color="hint">
            From {formatDate(createdAt)}
          </Text>
        </Flex>
      </CardHeader>

      <CardFooter pt={0}>
        <Link
          style={{ width: "100%" }}
          to={`/delivery/${deliveryId}`}
          target="_blank"
        >
          <Button w="full" variant="ghost" colorScheme="blue">
            View
          </Button>
        </Link>
      </CardFooter>
    </Card>
  )
}
