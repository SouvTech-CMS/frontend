import {
  Button,
  Flex,
  Input,
  PopoverArrow,
  PopoverBody,
  PopoverContent,
} from "@chakra-ui/react"
import { useTableContext } from "context/table"
import { ChangeEvent, FC, MutableRefObject } from "react"

interface SearchPopoverContentProps {
  initialRef: MutableRefObject<HTMLInputElement | null>
  param: string
}

export const SearchPopoverContent: FC<SearchPopoverContentProps> = (props) => {
  const { initialRef, param } = props

  const { setSearchFilter, getSearchFilterValue } = useTableContext()

  const searchInputValue = getSearchFilterValue(param)

  const handleSortFieldChange = (e: ChangeEvent<HTMLInputElement>) => {
    const value = e.target.value

    setSearchFilter((prevSearchFilter) => ({
      ...prevSearchFilter,
      [param]: value,
    }))
  }

  return (
    <PopoverContent>
      <PopoverArrow />

      <PopoverBody>
        <Flex w="full" direction="column" gap={2}>
          <Input
            ref={initialRef}
            placeholder="Enter value"
            type="text"
            value={searchInputValue}
            onChange={handleSortFieldChange}
          />

          <Button>Save</Button>
        </Flex>
      </PopoverBody>
    </PopoverContent>
  )
}
