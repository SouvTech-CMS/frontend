import { getAllEngravers } from "api/engraver/engraver"
import {
  ActionMeta,
  ChakraStylesConfig,
  GroupBase,
  Select,
  SingleValue,
} from "chakra-react-select"
import { FC } from "react"
import { useQuery } from "react-query"
import { Engraver } from "type/engraver/engraver"
import { SelectOption } from "type/selectOption"
import { WithId } from "type/withId"

interface EngraverSelectProps {
  selectedId?: number
  onSelect: (selectedId: number) => void
  excludedIds?: number[]
  isRequired?: boolean
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

export const EngraverSelect: FC<EngraverSelectProps> = (props) => {
  const { selectedId, onSelect, excludedIds, isRequired, isDisabled } = props

  const { data: engraversList, isLoading: isEngraversListLoading } = useQuery<
    WithId<Engraver>[]
  >("engraversList", getAllEngravers)

  const handleSelect = (
    newValue: SingleValue<SelectOption>,
    _: ActionMeta<SelectOption>,
  ) => {
    const selectedOption = newValue as SelectOption
    const engraverId = Number(selectedOption.value)
    onSelect(engraverId)
  }

  const filteredEngraversList = engraversList?.filter(
    (engraver) => !excludedIds?.includes(engraver.id),
  )

  const selectedEngraver = filteredEngraversList?.find(
    (engraver) => engraver.id === selectedId,
  )
  const isSelectedEngraverExists = !!selectedEngraver

  const isSelectedEngraverInvalid = isRequired && !selectedId

  const isLoading = isDisabled || isEngraversListLoading

  return (
    <Select<SelectOption, false, GroupBase<SelectOption>>
      chakraStyles={selectStyles}
      placeholder="Select engraver"
      options={filteredEngraversList?.map((engraver) => ({
        value: engraver.id,
        label: engraver.user.fio,
      }))}
      value={
        isSelectedEngraverExists
          ? {
              value: selectedEngraver.id,
              label: selectedEngraver.user.fio,
            }
          : null
      }
      onChange={handleSelect}
      isSearchable
      isInvalid={isSelectedEngraverInvalid}
      isDisabled={isLoading}
    />
  )
}
