import { getAllShelfs } from "api/shelf/shelf"
import {
  ActionMeta,
  ChakraStylesConfig,
  GroupBase,
  MultiValue,
  Select,
} from "chakra-react-select"
import { FC } from "react"
import { useQuery } from "react-query"
import { SelectOption } from "type/selectOption"
import { Shelf } from "type/storage/shelf"
import { WithId } from "type/withId"

interface ShelfsSelectProps {
  selectedShelfsIds: number[]
  onSelect: (shelfsIds: number[]) => void
}

const selectStyles: ChakraStylesConfig<
  SelectOption,
  true,
  GroupBase<SelectOption>
> = {
  container: (provided) => ({
    ...provided,
    width: "full",
  }),
}

export const ShelfsSelect: FC<ShelfsSelectProps> = (props) => {
  const { selectedShelfsIds, onSelect } = props

  const { data: shelfsList, isLoading } = useQuery<WithId<Shelf>[]>(
    "shelfsList",
    getAllShelfs,
  )

  const selectedShelfs = shelfsList?.filter((shelf) =>
    selectedShelfsIds.includes(shelf.id),
  )

  const handleSelectChange = (
    newValue: MultiValue<SelectOption>,
    _: ActionMeta<SelectOption>,
  ) => {
    const shelfsIds = newValue.map((selectedShelf) => selectedShelf.value)
    onSelect(shelfsIds)
  }

  return (
    <Select<SelectOption, true, GroupBase<SelectOption>>
      chakraStyles={selectStyles}
      colorScheme="purple"
      placeholder="Select shelfs"
      options={shelfsList?.map((shelf) => ({
        value: shelf.id,
        label: shelf.name,
      }))}
      value={selectedShelfs?.map((shelf) => ({
        value: shelf.id,
        label: shelf.name,
      }))}
      isClearable
      useBasicStyles
      isMulti
      onChange={handleSelectChange}
      isLoading={isLoading}
      isDisabled={isLoading}
    />
  )
}
