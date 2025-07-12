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
import { Purchase } from "type/purchase/purchase"
import { WithId } from "type/withId"
import { formatDate, timestampToDate } from "util/formatting"

interface PurchaseCardProps {
  purchase: WithId<Purchase>
}

export const PurchaseCard: FC<PurchaseCardProps> = (props) => {
  const { purchase } = props

  const purchaseId = purchase.id
  const createdAt = timestampToDate(purchase.created_at)

  return (
    <Card size="md" borderRadius={10}>
      <CardHeader>
        <Flex w="full" direction="column">
          {/* Order ID */}
          <Heading size="md">Order #{purchaseId}</Heading>

          {/* Created At */}
          <Text size="sm" color="hint">
            From {formatDate(createdAt)}
          </Text>
        </Flex>
      </CardHeader>

      <CardFooter pt={0}>
        <Link
          style={{ width: "100%" }}
          to={`/purchase/${purchaseId}`}
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
