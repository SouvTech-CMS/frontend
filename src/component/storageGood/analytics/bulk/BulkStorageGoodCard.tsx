import { Button, Flex, Text, useDisclosure } from "@chakra-ui/react"
import { SKUBadge } from "component/badge/SKUBadge"
import { BulkStorageGoodOrdersDrawer } from "component/storageGood/analytics/bulk/BulkStorageGoodOrdersDrawer"
import { QuantityColorIcon } from "component/storageGood/quantityColor/QuantityColorIcon"
import { FC } from "react"
import { Order } from "type/order/order"
import { StorageGoodWithQuantityColor } from "type/storage/storageGood"
import { WithId } from "type/withId"

interface BulkStorageGoodCardProps {
  storageGood: WithId<StorageGoodWithQuantityColor>
  ordersList: WithId<Order>[]
}

export const BulkStorageGoodCard: FC<BulkStorageGoodCardProps> = (props) => {
  const { storageGood, ordersList } = props

  const name = storageGood.name
  const sku = storageGood.uniquename
  const quantity = storageGood.quantity

  const quantityColor = storageGood.quantity_color

  const ordersCount = ordersList.length

  const {
    isOpen: isOrdersDrawerOpen,
    onOpen: onOrdersDrawerOpen,
    onClose: onOrdersDrawerClose,
  } = useDisclosure()

  return (
    <>
      <Flex
        w="full"
        direction="column"
        p={3}
        borderWidth={1}
        borderColor="thinBorder"
        borderRadius={10}
      >
        <Flex
          w="full"
          direction="row"
          justifyContent="space-between"
          alignItems="flex-start"
          gap={3}
        >
          <Flex direction="row" alignItems="center" gap={1}>
            <SKUBadge sku={sku} />

            <Text fontWeight="medium">{name}</Text>
          </Flex>

          <Flex direction="column" alignItems="flex-end" gap={1}>
            <Flex direction="row" alignItems="center" gap={2}>
              <Text fontWeight="bold" whiteSpace="nowrap">
                Left: {quantity}
              </Text>

              <QuantityColorIcon quantityColor={quantityColor} />
            </Flex>

            <Text
              ml={1}
              color="hint"
              fontSize="sm"
              fontWeight="medium"
              whiteSpace="nowrap"
            >
              Was {ordersCount} orders
            </Text>
          </Flex>
        </Flex>

        <Button
          w="full"
          variant="ghost"
          colorScheme="blue"
          onClick={onOrdersDrawerOpen}
        >
          View Orders
        </Button>
      </Flex>

      <BulkStorageGoodOrdersDrawer
        storageGood={storageGood}
        ordersList={ordersList}
        isOpen={isOrdersDrawerOpen}
        onClose={onOrdersDrawerClose}
      />
    </>
  )
}
