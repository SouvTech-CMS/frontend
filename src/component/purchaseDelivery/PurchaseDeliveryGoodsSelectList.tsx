import { Flex, Select } from "@chakra-ui/react"
import { getPurchaseGoodsByStatus } from "api/purchaseGood"
import { SelectedPurchaseGoodCard } from "component/purchaseDelivery/SelectedPurchaseGoodCard"
import { PurchaseStatus } from "constant/purchaseStatus"
import { ChangeEvent, Dispatch, FC, SetStateAction } from "react"
import { useQuery } from "react-query"
import { PurchaseGood } from "type/purchaseGood"
import { WithId } from "type/withId"

interface PurchaseDeliveryGoodsSelectListProps {
  selectedGoods: WithId<PurchaseGood>[]
  setSelectedGoods: Dispatch<SetStateAction<WithId<PurchaseGood>[]>>
}

const GOODS_STATUS = PurchaseStatus.Processing

export const PurchaseDeliveryGoodsSelectList: FC<
  PurchaseDeliveryGoodsSelectListProps
> = (props) => {
  const { selectedGoods, setSelectedGoods } = props

  const { data: goods, isLoading } = useQuery<WithId<PurchaseGood>[]>(
    ["purchaseGoods", GOODS_STATUS],
    () => getPurchaseGoodsByStatus(GOODS_STATUS)
  )

  const filteredGoods =
    goods?.filter(
      (good) =>
        !selectedGoods.find((selectedGood) => selectedGood.id === good.id)
    ) || []

  const isGoodsSelectDisabled = isLoading || filteredGoods.length === 0

  const handleGoodSelect = (e: ChangeEvent<HTMLSelectElement>) => {
    const selectedGoodId = Number(e.target.value)
    const good = goods?.find((good) => good.id === selectedGoodId)
    const isGoodSelected = selectedGoods.find(
      (good) => good.id === selectedGoodId
    )

    if (good && !isGoodSelected) {
      setSelectedGoods((prevGoods) => [...prevGoods, good])
    }
  }

  return (
    <>
      <Flex direction="column" gap={2}>
        {selectedGoods.map((good, index) => (
          <SelectedPurchaseGoodCard
            key={index}
            good={good}
            setSelectedGoods={setSelectedGoods}
          />
        ))}
      </Flex>

      <Select
        placeholder="Select good"
        value={undefined}
        onChange={handleGoodSelect}
        isDisabled={isGoodsSelectDisabled}
      >
        {filteredGoods?.map((good) => (
          <option key={good.id} value={good.id} selected={false}>
            {good.name}
          </option>
        ))}
      </Select>
    </>
  )
}
