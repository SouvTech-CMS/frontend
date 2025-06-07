import { Button, Card, CardFooter, CardHeader, Heading } from "@chakra-ui/react"
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
    <Card borderRadius={12}>
      <CardHeader>
        <Heading size="md">Delivery from {formatDate(createdAt)}</Heading>
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
