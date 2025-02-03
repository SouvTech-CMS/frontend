import { getAllStatesByCountryId } from "api/client/state"
import {
  ActionMeta,
  ChakraStylesConfig,
  GroupBase,
  Select,
  SingleValue,
} from "chakra-react-select"
import { FC, useEffect } from "react"
import { useQuery } from "react-query"
import { State } from "type/client/state"
import { WithId } from "type/withId"

type SelectOption = WithId<State>

interface StateSelectProps {
  countryId: number
  selectedId?: number
  onSelect: (selectedId: number) => void
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
}

export const StateSelect: FC<StateSelectProps> = (props) => {
  const {
    countryId,
    selectedId,
    onSelect,
    isRequired,
    isDisabled,
    isFullWidth,
  } = props

  const {
    data: statesList,
    isLoading: isStatesListLoading,
    refetch,
  } = useQuery<WithId<State>[]>("statesList", () =>
    getAllStatesByCountryId(countryId),
  )

  const handleSelect = (
    newValue: SingleValue<SelectOption>,
    _: ActionMeta<SelectOption>,
  ) => {
    if (!!newValue) {
      const stateId = Number(newValue.id)
      onSelect(stateId)
    }
  }

  const selectedState = statesList?.find((state) => state.id === selectedId)

  const isSelectedStateInvalid = isRequired && !selectedId

  const isLoading = isDisabled || isStatesListLoading

  useEffect(() => {
    refetch()
  }, [refetch, countryId])

  return (
    <Select<SelectOption, false, GroupBase<SelectOption>>
      chakraStyles={{
        ...selectStyles,
        container: (provided) => ({
          ...provided,
          width: isFullWidth ? "full" : "fit-content",
        }),
      }}
      placeholder="Select state"
      options={statesList}
      value={selectedState || null}
      onChange={handleSelect}
      getOptionLabel={(option) => option.name}
      getOptionValue={(option) => String(option.id)}
      isSearchable
      isInvalid={isSelectedStateInvalid}
      isDisabled={isLoading}
    />
  )
}
