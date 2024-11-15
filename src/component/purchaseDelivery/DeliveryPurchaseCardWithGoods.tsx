import { DeliveryPurchaseCard } from "component/purchaseDelivery/DeliveryPurchaseCard"
import { FC } from "react"
import { FullPurchase } from "type/purchase/purchase"

interface DeliveryPurchaseCardWithGoodsProps {
  purchase: FullPurchase
}

export const DeliveryPurchaseCardWithGoods: FC<
  DeliveryPurchaseCardWithGoodsProps
> = (props) => {
  const { purchase } = props

  return <DeliveryPurchaseCard purchase={purchase} />
}
