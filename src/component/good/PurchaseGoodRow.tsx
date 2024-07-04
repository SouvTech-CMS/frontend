import { Badge, Td, Tr } from "@chakra-ui/react"
import { FC } from "react"
import { PurchaseGood } from "type/purchaseGood"
import { WithId } from "type/withId"

interface PurchaseGoodRowProps {
  good: WithId<PurchaseGood>
}

export const PurchaseGoodRow: FC<PurchaseGoodRowProps> = (props) => {
  const { good } = props

  const getBadgeColor = (status: string): string => {
    switch (status) {
      case "order":
        return "blue"
      case "invoice":
        return "cyan"
      case "processing":
        return "yellow"
      case "packing":
        return "purple"
      case "custom":
        return "teal"
      case "storage":
        return "green"
      default:
        return "gray"
    }
  }

  return (
    <Tr>
      <Td>{good.id}</Td>
      <Td>{good.name}</Td>
      <Td>{good.quantity}</Td>
      <Td>${good.amount}</Td>
      <Td>${good.price_per_item}</Td>
      {/* Status */}
      <Td>
        <Badge
          w="fit-content"
          variant="subtle"
          colorScheme={getBadgeColor(good.status)}
        >
          {good.status}
        </Badge>
      </Td>
    </Tr>
  )
}