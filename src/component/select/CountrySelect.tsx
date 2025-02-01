import { getAllCountries } from "api/client/country"
import {
  ActionMeta,
  ChakraStylesConfig,
  GroupBase,
  Select,
  SingleValue,
} from "chakra-react-select"
import { FC } from "react"
import { useQuery } from "react-query"
import { Country } from "type/client/country"
import { WithId } from "type/withId"

type SelectOption = WithId<Country>

interface CountrySelectProps {
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

export const CountrySelect: FC<CountrySelectProps> = (props) => {
  const { selectedId, onSelect, isRequired, isDisabled, isFullWidth } = props

  const { data: countriesList, isLoading: isCountriesListLoading } = useQuery<
    WithId<Country>[]
  >("countriesList", getAllCountries)

  const handleSelect = (
    newValue: SingleValue<SelectOption>,
    _: ActionMeta<SelectOption>,
  ) => {
    if (!!newValue) {
      const countryId = Number(newValue.id)
      onSelect(countryId)
    }
  }

  const selectedCountry = countriesList?.find(
    (country) => country.id === selectedId,
  )

  const isSelectedCountryInvalid = isRequired && !selectedId

  const isLoading = isDisabled || isCountriesListLoading

  return (
    <Select<SelectOption, false, GroupBase<SelectOption>>
      chakraStyles={{
        ...selectStyles,
        container: (provided) => ({
          ...provided,
          width: isFullWidth ? "full" : "fit-content",
        }),
      }}
      placeholder="Select country"
      options={countriesList}
      value={selectedCountry || null}
      onChange={handleSelect}
      getOptionLabel={(option) => option.name}
      getOptionValue={(option) => String(option.id)}
      isSearchable
      isInvalid={isSelectedCountryInvalid}
      isDisabled={isLoading}
    />
  )
}
