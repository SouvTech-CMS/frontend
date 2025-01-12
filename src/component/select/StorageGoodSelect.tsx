import { getFullStorageGoodsList } from "api/storage/storageGood"
import {
  ActionMeta,
  ChakraStylesConfig,
  GroupBase,
  Select,
  SingleValue,
} from "chakra-react-select"
import { FC } from "react"
import { useQuery } from "react-query"
import { ApiResponse } from "type/api/apiResponse"
import { SelectOption } from "type/selectOption"
import { StorageGood } from "type/storage/storageGood"
import { WithId } from "type/withId"

interface StorageGoodSelectProps {
  selectedId?: number
  onSelect: (storageGoodId: number) => void
  hasProductionInfo?: boolean
  isDisabled?: boolean
}

const selectStyles: ChakraStylesConfig<
  SelectOption,
  false,
  GroupBase<SelectOption>
> = {
  container: (provided) => ({
    ...provided,
    width: "full",
  }),
}

export const StorageGoodSelect: FC<StorageGoodSelectProps> = (props) => {
  const { selectedId, onSelect, hasProductionInfo, isDisabled } = props

  const { data: storageGoodsResponse, isLoading: isStorageGoodsLoading } =
    useQuery<ApiResponse<WithId<StorageGood>[]>>("storageGoodsFullList", () =>
      getFullStorageGoodsList(hasProductionInfo),
    )
  const storageGoodsList = storageGoodsResponse?.result

  const handleSelect = (
    newValue: SingleValue<SelectOption>,
    _: ActionMeta<SelectOption>,
  ) => {
    const selectedOption = newValue as SelectOption
    const storageGoodId = Number(selectedOption.value)
    onSelect(storageGoodId)
  }

  const storageGood = storageGoodsList?.find(
    (storageGood) => storageGood.id === selectedId,
  )

  const isSelectedStorageGoodExists = !!storageGood

  const isSelectedStorageGoodInvalid = !selectedId

  const isLoading = isDisabled || isStorageGoodsLoading

  return (
    <Select<SelectOption, false, GroupBase<SelectOption>>
      chakraStyles={selectStyles}
      placeholder="Select storage good"
      options={storageGoodsList?.map((storageGood) => ({
        value: storageGood.id,
        // TODO: try to show SKU badge instead of just text
        // label: (
        //   <Flex direction="row" alignItems="center" gap={1}>
        //     <SKUBadge sku={storageGood.uniquename} />
        //     <Text>{storageGood.name}</Text>
        //   </Flex>
        // ),
        label: `${storageGood.uniquename} - ${storageGood.name}`,
      }))}
      value={
        isSelectedStorageGoodExists
          ? {
              value: storageGood.id,
              label: `${storageGood.uniquename} - ${storageGood.name}`,
            }
          : null
      }
      onChange={handleSelect}
      isSearchable
      isInvalid={isSelectedStorageGoodInvalid}
      isDisabled={isLoading}
    />
  )
}
