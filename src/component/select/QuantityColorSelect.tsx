import { getAllQuantityColors } from "api/storage/quantityColor"
import {
  ActionMeta,
  ChakraStylesConfig,
  GroupBase,
  Select,
  SingleValue,
} from "chakra-react-select"
import { QuantityColorIcon } from "component/storageGood/quantityColor/QuantityColorIcon"
import { FC } from "react"
import { useQuery } from "react-query"
import { QuantityColor } from "type/storage/quantityColor/quantityColor"
import { WithId } from "type/withId"

type SelectOption = WithId<QuantityColor>

interface QuantityColorSelectProps {
  selectedValue?: SelectOption
  onSelect: (selectedValue: SelectOption) => void
  isRequired?: boolean
  isDisabled?: boolean
  isFullWidth?: boolean
}

const selectStyles: ChakraStylesConfig<
  SelectOption,
  false,
  GroupBase<SelectOption>
> = {
  container: (provided) => ({
    ...provided,
    width: "fit-content",
  }),
  menu: (provided) => ({
    ...provided,
    width: "fit-content",
  }),
}

export const QuantityColorSelect: FC<QuantityColorSelectProps> = (props) => {
  const { selectedValue, onSelect, isRequired, isDisabled, isFullWidth } = props

  const { data: quantityColorsList, isLoading: isQuantityColorsListLoading } =
    useQuery<WithId<QuantityColor>[]>(
      "quantityColorsList",
      getAllQuantityColors,
    )

  const isSelectedValueInvalid = isRequired && !selectedValue

  const isLoading = isDisabled || isQuantityColorsListLoading

  const handleSelect = (
    newValue: SingleValue<SelectOption>,
    _: ActionMeta<SelectOption>,
  ) => {
    if (!!newValue) {
      onSelect(newValue)
    }
  }

  return (
    <Select<SelectOption, false, GroupBase<SelectOption>>
      chakraStyles={{
        ...selectStyles,
        container: (provided) => ({
          ...provided,
          width: isFullWidth ? "full" : "fit-content",
        }),
      }}
      placeholder="Select quantity color"
      options={quantityColorsList}
      value={selectedValue || null}
      onChange={handleSelect}
      formatOptionLabel={(option) => (
        <QuantityColorIcon quantityColor={option} />
      )}
      getOptionValue={(option) => String(option.id)}
      isSearchable
      isInvalid={isSelectedValueInvalid}
      isDisabled={isLoading}
    />
  )
}
