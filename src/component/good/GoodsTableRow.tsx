import { Flex, Td, Text, Tr, useDisclosure } from "@chakra-ui/react"
import { getShopById } from "api/shop"
import { SKUBadge } from "component/SKUBadge"
import { GoodModal } from "component/good/GoodModal"
import { GoodsTableRowMenu } from "component/good/GoodsTableRowMenu"
import { MarketplaceAvatar } from "component/marketplace/MarketplaceAvatar"
import { FC } from "react"
import { useQuery } from "react-query"
import { useGoodUpdateMutation } from "service/good"
import { Good } from "type/order/good"
import { Shop } from "type/shop"
import { WithId } from "type/withId"
import { numberWithCurrency, roundNumber } from "util/formatting"
import { notify } from "util/toasts"

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

  const goodId = good.id
  const shopId = good.shop_id

  const goodIsActual = good.is_actual

  const { data: shop, isLoading } = useQuery<WithId<Shop>>(
    ["shop", shopId],
    () => getShopById(shopId),
    {
      enabled: !!shopId && isShowShop,
    },
  )

  const goodUpdateMutation = useGoodUpdateMutation()

  const toggleGoodIsHidden = async () => {
    const updatedIsActual = !goodIsActual

    const { shop, ...updatedGood } = good
    const body: WithId<Good> = {
      ...updatedGood,
      is_actual: updatedIsActual,
    }

    await goodUpdateMutation.mutateAsync(body)

    notify(
      `Good #${goodId} was successfully ${
        updatedIsActual ? "shown" : "hidden"
      }`,
      "success",
    )
  }

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
          <Text whiteSpace="break-spaces">{good.name}</Text>
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
            <GoodsTableRowMenu
              isGoodHidden={!goodIsActual}
              onEdit={onGoodModalOpen}
              onToggleIsHidden={toggleGoodIsHidden}
            />
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
