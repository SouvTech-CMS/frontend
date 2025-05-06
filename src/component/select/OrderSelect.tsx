import { Flex, Text } from "@chakra-ui/react"
import { getSimilarOrders } from "api/order/order"
import {
  ActionMeta,
  AsyncSelect,
  ChakraStylesConfig,
  GroupBase,
  OptionsOrGroups,
  SingleValue,
} from "chakra-react-select"
import { Dispatch, FC, SetStateAction, useEffect, useState } from "react"
import { Order, OrderSearchFilter } from "type/order/order"
import { WithId } from "type/withId"

type SelectOption = WithId<Order>

interface OrderSelectProps {
  selectedValue?: SelectOption
  onSelect: Dispatch<SetStateAction<SelectOption | undefined>>
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

export const OrderSelect: FC<OrderSelectProps> = (props) => {
  const { selectedValue, onSelect } = props

  const [isLoading, setIsLoading] = useState<boolean>(false)
  const [options, setOptions] = useState<
    OptionsOrGroups<SelectOption, GroupBase<SelectOption>>
  >([])

  const isSelectedValueInvalid = !selectedValue

  const handleOptionsLoad = async (
    inputValue: string,
    _: (
      options: OptionsOrGroups<SelectOption, GroupBase<SelectOption>>,
    ) => void,
  ) => {
    setIsLoading(true)

    const ordersList = await getSimilarOrders({
      limit: 10,
      searchFilter: {
        order_id: inputValue,
      } as OrderSearchFilter,
    })

    setOptions(options)
    setIsLoading(false)

    return ordersList
  }

  const handleSelect = (
    newValue: SingleValue<SelectOption>,
    _: ActionMeta<SelectOption>,
  ) => {
    const value = newValue || undefined
    onSelect(value)
  }

  useEffect(
    () => {
      handleOptionsLoad("", (loadedOptions) => setOptions(loadedOptions))
    },
    // eslint-disable-next-line react-hooks/exhaustive-deps
    [],
  )

  return (
    <AsyncSelect<SelectOption, false, GroupBase<SelectOption>>
      chakraStyles={selectStyles}
      placeholder="Select Order"
      defaultOptions={options}
      loadOptions={handleOptionsLoad}
      value={selectedValue || null}
      onChange={handleSelect}
      isSearchable
      isClearable
      noOptionsMessage={noOptionsMessage}
      isInvalid={isSelectedValueInvalid}
      isLoading={isLoading}
      getOptionLabel={(option) => `Order #${option.order_id}`}
      isOptionSelected={(option) =>
        selectedValue ? option.id === selectedValue.id : false
      }
    />
  )
}

const noOptionsMessage = () => {
  return (
    <Flex w="full" justifyContent="center" px={3}>
      <Text color="gray" textAlign="center">
        Enter Order ID from Marketplace
      </Text>
    </Flex>
  )
}
