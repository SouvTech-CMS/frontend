import {
  Flex,
  IconButton,
  Popover,
  PopoverAnchor,
  PopoverTrigger,
  Text,
  Th,
} from "@chakra-ui/react"
import { SearchPopoverContent } from "component/sortableTable/SearchPopoverContent"
import { useTableContext } from "context/table"
import { FC, useRef } from "react"
import { FiArrowDown, FiArrowUp, FiSearch } from "react-icons/fi"
import { LuArrowUpDown } from "react-icons/lu"
import { TableColumn } from "type/tableColumn"

interface CustomThProps {
  column: TableColumn | null
}

export const CustomTh: FC<CustomThProps> = (props) => {
  const { column } = props

  const {
    isAscSort,
    isDescSort,
    isNoSort,
    setSortDirection,
    sortField,
    setSortField,

    // searchFilter,
    // getSearchFilterValue,
  } = useTableContext()

  const initialRef = useRef<HTMLInputElement>(null)

  // If column just for btns
  if (column === null) {
    return <Th></Th>
  }

  const { name, param, isSortable = false, isSearchable = false } = column

  const handleSortDirectionChange = () => {
    // no-sort -> asc
    if (isNoSort) {
      setSortDirection("asc")
      setSortField(param)
    }
    // asc -> desc
    else if (isAscSort) {
      setSortDirection("desc")
      setSortField(param)
    }
    // desc -> no-sort
    else if (isDescSort) {
      setSortDirection(undefined)
      setSortField(undefined)
    }
  }

  const getSortBtnIcon = () => {
    initialRef.current?.click()
    if (sortField !== param) {
      return <LuArrowUpDown />
    }

    if (isNoSort) {
      return <LuArrowUpDown />
    }
    if (isAscSort) {
      return <FiArrowUp />
    }
    if (isDescSort) {
      return <FiArrowDown />
    }
  }

  const handleSearchBtnClick = () => {
    // With timeout autofocus is working..
    setTimeout(() => {
      initialRef.current?.focus()
      initialRef.current?.click()
    }, 100)
  }

  // TODO: update search field only on click save btn
  // TODO: close popover on click save btn

  return (
    <Th>
      <Flex justifyContent="space-between" alignItems="center">
        {/* Column Name with Search */}
        <Popover placement="bottom-start">
          <Flex alignItems="center" gap={1}>
            <PopoverAnchor>
              <Text>{name}</Text>
            </PopoverAnchor>

            {/* Search Btn */}
            {isSearchable && (
              <PopoverTrigger>
                <IconButton
                  aria-label="search-column-btn"
                  size="sm"
                  variant="ghost"
                  icon={<FiSearch />}
                  onClick={handleSearchBtnClick}
                />
              </PopoverTrigger>
            )}
          </Flex>

          <SearchPopoverContent initialRef={initialRef} param={param} />
        </Popover>

        {/* Sort Btn */}
        {isSortable && (
          <IconButton
            aria-label="sort-column-btn"
            size="sm"
            variant="ghost"
            icon={getSortBtnIcon()}
            onClick={handleSortDirectionChange}
          />
        )}
      </Flex>

      {/* <Text color="gray" fontSize="xs" fontWeight="normal" fontStyle="italic">
        {getSearchFilterValue(param)}
      </Text> */}
    </Th>
  )
}
