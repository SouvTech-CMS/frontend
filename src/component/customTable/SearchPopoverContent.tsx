import {
  Button,
  Flex,
  Input,
  PopoverArrow,
  PopoverBody,
  PopoverContent,
} from "@chakra-ui/react"
import { useTableContext } from "context/table"
import { ChangeEvent, MutableRefObject, useEffect, useState } from "react"

interface SearchPopoverContentProps<
  SearchFilterType extends Record<string, any>,
> {
  initialRef: MutableRefObject<HTMLInputElement | null>
  param: keyof SearchFilterType
  onClose: () => void
}

export const SearchPopoverContent = <
  SearchFilterType extends Record<string, any>,
>(
  props: SearchPopoverContentProps<SearchFilterType>,
) => {
  const { initialRef, param, onClose } = props

  const { searchFilter, setSearchFilter, getSearchFilterValue, setSortField } =
    useTableContext<SearchFilterType>()

  const [searchValue, setSearchValue] = useState<string>(
    getSearchFilterValue(param),
  )

  const isSearchValueEmpty = !searchValue.trim()

  const handleSearchValueChange = (e: ChangeEvent<HTMLInputElement>) => {
    const value = e.target.value
    setSearchValue(value)
  }

  const handleSearchFilterChange = () => {
    setSortField(param)

    setSearchFilter(
      (prevSearchFilter) =>
        ({
          ...prevSearchFilter,
          [param]: searchValue,
        }) as SearchFilterType,
    )
    onClose()
  }

  const handleSearchFilterClear = () => {
    setSearchValue("")

    setSearchFilter(
      (prevSearchFilter) =>
        ({
          ...prevSearchFilter,
          [param]: undefined,
        }) as SearchFilterType,
    )
    onClose()
  }

  useEffect(() => {
    const newSearchValue = getSearchFilterValue(param)
    setSearchValue(newSearchValue)
  }, [getSearchFilterValue, searchFilter, param])

  return (
    <PopoverContent>
      <PopoverArrow />

      <PopoverBody>
        <Flex w="full" direction="column" gap={2}>
          <Input
            ref={initialRef}
            placeholder="Enter value"
            type="text"
            value={searchValue}
            onChange={handleSearchValueChange}
          />

          <Flex w="full" gap={2}>
            <Button
              w="full"
              onClick={handleSearchFilterChange}
              isDisabled={isSearchValueEmpty}
            >
              Find
            </Button>

            <Button
              w="full"
              variant="secondary"
              onClick={handleSearchFilterClear}
              isDisabled={isSearchValueEmpty}
            >
              Clear
            </Button>
          </Flex>
        </Flex>
      </PopoverBody>
    </PopoverContent>
  )
}
