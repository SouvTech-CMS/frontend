import { Td, Tr } from "@chakra-ui/react"
import { FC } from "react"
import { Purchase } from "type/purchase"
import { PurchaseFile } from "type/purchaseFile"
import { PurchaseGood } from "type/purchaseGood"
import { Supplier } from "type/supplier"
import { SupplierManager } from "type/supplierManager"
import { WithId } from "type/withId"

interface PurchaseRowProps {
  purchase: WithId<Purchase>
  goods: WithId<PurchaseGood>[]
  supplier: WithId<Supplier>
  supplier_manager: WithId<SupplierManager>
  files: WithId<PurchaseFile>[]
}

export const PurchaseRow: FC<PurchaseRowProps> = (props) => {
  const { purchase, goods } = props

  const rowBgColor =
    new Date(purchase.deadline) < new Date() ? "red" : "transparent"

  return (
    <Tr bgColor={rowBgColor}>
      <Td>{purchase.id}</Td>
      <Td>${purchase.amount}</Td>
    </Tr>
  )
}
