import {
  Badge,
  Card,
  CardBody,
  CardHeader,
  Flex,
  Heading,
  Text,
} from "@chakra-ui/react"
import { FC } from "react"
import { Storage } from "type/storage/storage"
import { WithId } from "type/withId"
import {
  numberWithCurrency,
  roundNumber,
  timestampToDate,
} from "util/formatting"

interface GoodStorageCardProps {
  storage: WithId<Storage>
}

export const GoodStorageCard: FC<GoodStorageCardProps> = (props) => {
  const { storage } = props

  const isCreatedAtExists = storage.created_at !== undefined
  const storageDate = timestampToDate(storage.created_at)

  const isPrimeCostExists = storage.prime_cost !== undefined
  const isItemPriceExists = storage.cost_per_item !== undefined

  return (
    <Card size="sm">
      <CardHeader>
        <Flex direction="column" gap={2}>
          {/* Created At */}
          {isCreatedAtExists && (
            <Heading size="md" fontWeight="medium">
              <Text>{storageDate.toDateString()}</Text>
            </Heading>
          )}
        </Flex>
      </CardHeader>

      <CardBody>
        <Flex direction="column" gap={2}>
          {/* Shelf */}
          <Flex alignItems="center" gap={2}>
            <Text fontWeight="light" color="gray">
              Shelf:
            </Text>

            <Badge fontSize="xs" colorScheme="blue">
              {storage.shelf}
            </Badge>
          </Flex>

          {/* Prime Price */}
          {isPrimeCostExists && (
            <Flex alignItems="center" gap={2}>
              <Text fontWeight="light" color="gray">
                Prime Price:
              </Text>

              <Text>
                {numberWithCurrency(roundNumber(storage.prime_cost!))}
              </Text>
            </Flex>
          )}

          {/* Item Price */}
          {isItemPriceExists && (
            <Flex alignItems="center" gap={2}>
              <Text fontWeight="light" color="gray">
                Item Price:
              </Text>

              <Text>
                {numberWithCurrency(roundNumber(storage.cost_per_item!))}
              </Text>
            </Flex>
          )}

          {/* Quantity */}
          <Flex alignItems="center" gap={2}>
            <Text fontWeight="light" color="gray">
              Quantity:
            </Text>

            <Text>{storage.quantity}</Text>
          </Flex>

          {/* In Box Quantity */}
          <Flex alignItems="center" gap={2}>
            <Text fontWeight="light" color="gray">
              Goods In Box Quantity:
            </Text>

            <Text>{storage.in_box_quantity}</Text>
          </Flex>

          {/* Box Quantity */}
          <Flex alignItems="center" gap={2}>
            <Text fontWeight="light" color="gray">
              Boxes Quantity:
            </Text>

            <Text>{storage.box_quantity}</Text>
          </Flex>

          {/* Shops */}
          <Flex alignItems="center" flexWrap="wrap" gap={2}>
            <Text fontWeight="light" color="gray">
              To Shops:
            </Text>

            {storage.shops?.map((shop, index) => (
              <Badge key={index}>{shop.name}</Badge>
            ))}
          </Flex>
        </Flex>
      </CardBody>
    </Card>
  )
}
