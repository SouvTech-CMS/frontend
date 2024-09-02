import { Flex, Td, Text, Tr, useDisclosure } from "@chakra-ui/react"
import { getShopById } from "api/shop"
import { SKUBadge } from "component/SKUBadge"
import { GoodModal } from "component/good/GoodModal"
import { GoodsTableRowMenu } from "component/good/GoodsTableRowMenu"
import { MarketplaceAvatar } from "component/marketplace/MarketplaceAvatar"
import { FC } from "react"
import { useQuery } from "react-query"
import { Good } from "type/order/good"
import { Shop } from "type/shop"
import { WithId } from "type/withId"
import { numberWithCurrency, roundNumber } from "util/formatting"

interface GoodsTableRowProps {
  good: WithId<Good>
  isShowShop?: boolean
}

export const GoodsTableRow: FC<GoodsTableRowProps> = (props) => {
  const { good, isShowShop } = props

  const {
    isOpen: isGoodModalOpen,
    onOpen: onGoodModalOpen,
    onClose: onGoodModalClose,
  } = useDisclosure()

  const shopId = good.shop_id
  const { data: shop, isLoading } = useQuery<WithId<Shop>>(
    ["shop", shopId],
    () => getShopById(shopId),
    {
      enabled: !!shopId && isShowShop,
    },
  )

  return (
    <>
      <Tr>
        {/* ID */}
        <Td>
          <Text>{good.id}</Text>
        </Td>

        {/* SKU segment */}
        <Td>
          <SKUBadge sku={good.uniquename} />
        </Td>

        {/* Name */}
        <Td>
          <Text whiteSpace="normal">{good.name}</Text>
        </Td>

        {/* Price */}
        <Td>
          <Text>{numberWithCurrency(roundNumber(good.price))}</Text>
        </Td>

        {/* Shop */}
        {isShowShop && (
          <Td>
            <Flex alignItems="center" gap={2}>
              <MarketplaceAvatar
                marketplace={shop?.marketplace}
                isLoading={isLoading}
              />
              <Text>{shop?.name}</Text>
            </Flex>
          </Td>
        )}

        {/* Good Menu Btn */}
        <Td p={0}>
          <Flex alignItems="center">
            <GoodsTableRowMenu onEdit={onGoodModalOpen} />
          </Flex>
        </Td>
      </Tr>

      <GoodModal
        prevGood={good}
        isOpen={isGoodModalOpen}
        onClose={onGoodModalClose}
      />
    </>
  )
}
