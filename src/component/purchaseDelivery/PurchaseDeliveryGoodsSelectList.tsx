import { Flex } from "@chakra-ui/react"
import { getPurchaseGoodsByStatus } from "api/purchaseGood"
import { ActionMeta, GroupBase, Select, SingleValue } from "chakra-react-select"
import { SelectedPurchaseGoodCard } from "component/purchaseDelivery/SelectedPurchaseGoodCard"
import { PurchaseStatus } from "constant/purchaseStatus"
import { Dispatch, FC, SetStateAction } from "react"
import { useQuery } from "react-query"
import { PurchaseGood } from "type/purchaseGood"
import { SelectOption } from "type/selectOption"
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
    () => getPurchaseGoodsByStatus(GOODS_STATUS),
  )

  const filteredGoods =
    goods?.filter(
      (good) =>
        !selectedGoods.find((selectedGood) => selectedGood.id === good.id),
    ) || []

  const isGoodsSelectDisabled = isLoading || filteredGoods.length === 0

  const handleGoodSelect = (
    newValue: SingleValue<SelectOption>,
    _: ActionMeta<SelectOption>,
  ) => {
    const selectedGoodId = newValue?.value
    const good = goods?.find((good) => good.id === selectedGoodId)
    const isGoodSelected = selectedGoods.find(
      (good) => good.id === selectedGoodId,
    )

    if (good && !isGoodSelected) {
      setSelectedGoods((prevGoods) => [...prevGoods, good])
    }
  }

  return (
    <>
      {/* Selected Goods Cards */}
      <Flex direction="column" gap={2}>
        {selectedGoods.map((good, index) => (
          <SelectedPurchaseGoodCard
            key={index}
            good={good}
            setSelectedGoods={setSelectedGoods}
          />
        ))}
      </Flex>

      <Select<SelectOption, false, GroupBase<SelectOption>>
        placeholder="Select good"
        options={filteredGoods?.map((good) => ({
          value: good.id,
          label: `#${good.id} ${good.name} - Purchase #${good.purchase_id}`,
        }))}
        onChange={handleGoodSelect}
        isSearchable
        isClearable
        isDisabled={isGoodsSelectDisabled}
      />
    </>
  )
}
