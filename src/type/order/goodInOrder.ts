import { Good } from "type/order/good"

export type GoodInOrder = Good & {
  quantity: number
  amount: number
}
