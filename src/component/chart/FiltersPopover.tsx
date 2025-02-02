import {
  Flex,
  Heading,
  IconButton,
  Popover,
  PopoverArrow,
  PopoverBody,
  PopoverCloseButton,
  PopoverContent,
  PopoverHeader,
  PopoverTrigger,
} from "@chakra-ui/react"
import { ActionMeta, SingleValue } from "chakra-react-select"
import { DatesFilter } from "component/filter/DatesFilter"
import { ShopFilter } from "component/filter/ShopFilter"
import { CountrySelect } from "component/select/CountrySelect"
import { StateSelect } from "component/select/StateSelect"
import { useTableContext } from "context/table"
import { FC, useRef, useState } from "react"
import { FiFilter } from "react-icons/fi"
import { SalesAnalyticsSeachFilter } from "type/analytics/sales"
import { SelectOption } from "type/selectOption"

export interface FiltersPopoverProps {
  withShopFilter?: boolean
  withCountryFilter?: boolean
  withDatesFilter?: boolean
  withStateFilter?: boolean
}

export const FiltersPopover: FC<FiltersPopoverProps> = (props) => {
  const {
    withDatesFilter,
    withShopFilter,
    withCountryFilter,
    withStateFilter,
  } = props

  const initialRef = useRef<HTMLButtonElement>(null)

  const [isOpen, setIsOpen] = useState<boolean>(false)

  const { searchFilter, setSearchFilter } =
    useTableContext<SalesAnalyticsSeachFilter>()

  const handleFiltersBtnClick = () => {
    // With timeout autofocus is working..
    setTimeout(() => {
      initialRef.current?.focus()
    }, 100)

    setIsOpen(true)
  }

  const handleClose = () => {
    setIsOpen(false)
  }

  const handleShopSelect = (
    newValue: SingleValue<SelectOption>,
    _: ActionMeta<SelectOption>,
  ) => {
    const shopId = newValue?.value

    setSearchFilter(
      (prevFilters) =>
        ({
          ...prevFilters,
          shop_id: shopId,
        } as SalesAnalyticsSeachFilter),
    )
  }

  const handleCountrySelect = (selectedId: number) => {
    setSearchFilter(
      (prevFilters) =>
        ({
          ...prevFilters,
          country_id: selectedId,
        } as SalesAnalyticsSeachFilter),
    )
  }

  const handleStateSelect = (selectedId: number) => {
    setSearchFilter(
      (prevFilters) =>
        ({
          ...prevFilters,
          state_id: selectedId,
        } as SalesAnalyticsSeachFilter),
    )
  }

  return (
    <Popover isOpen={isOpen} onClose={handleClose}>
      <PopoverTrigger>
        <IconButton
          aria-label="filters"
          icon={<FiFilter />}
          variant="ghost"
          onClick={handleFiltersBtnClick}
        />
      </PopoverTrigger>

      <PopoverContent>
        <PopoverArrow />
        <PopoverCloseButton ref={initialRef} />

        <PopoverHeader>
          <Heading size="sm">Filters</Heading>
        </PopoverHeader>

        <PopoverBody>
          <Flex w="full" direction="column" gap={2}>
            {/* Shop Filter */}
            {withShopFilter && (
              <ShopFilter handleShopSelect={handleShopSelect} isFullWidth />
            )}

            {/* Country Filter */}
            {withCountryFilter && (
              <CountrySelect
                selectedId={searchFilter?.country_id}
                onSelect={handleCountrySelect}
                isFullWidth
              />
            )}

            {/* Country Filter */}
            {withStateFilter && (
              <StateSelect
                countryId={searchFilter?.country_id!}
                selectedId={searchFilter?.state_id}
                onSelect={handleStateSelect}
                isDisabled={!searchFilter?.country_id}
                isFullWidth
              />
            )}

            {/* Date Range Select */}
            {withDatesFilter && <DatesFilter isFullWidth />}
          </Flex>
        </PopoverBody>
      </PopoverContent>
    </Popover>
  )
}
