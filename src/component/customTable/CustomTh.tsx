import {
  Flex,
  IconButton,
  Popover,
  PopoverAnchor,
  PopoverTrigger,
  Text,
  Th,
} from "@chakra-ui/react"
import { SearchPopoverContent } from "component/customTable/SearchPopoverContent"
import { useTableContext } from "context/table"
import { FC, useRef, useState } from "react"
import { FiArrowDown, FiArrowUp, FiSearch } from "react-icons/fi"
import { LuArrowUpDown } from "react-icons/lu"
import { TableColumn } from "type/tableColumn"

interface CustomThProps {
  column: TableColumn | null
  resetCurrentPage?: () => void
}

export const CustomTh: FC<CustomThProps> = (props) => {
  const { column, resetCurrentPage = () => {} } = props

  const {
    isAscSort,
    isDescSort,
    isNoSort,
    setSortDirection,
    sortField,
    setSortField,
  } = useTableContext()

  const initialRef = useRef<HTMLInputElement>(null)

  const [isPopoverOpen, setIsPopoverOpen] = useState<boolean>(false)

  // If column just for btns
  if (column === null) {
    return <Th></Th>
  }

  const { name, param, isSortable = false, isSearchable = false } = column

  const handlePopoverClose = () => {
    setIsPopoverOpen(false)
    resetCurrentPage()
  }

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

    setIsPopoverOpen(true)
  }

  return (
    <Th>
      <Flex justifyContent="space-between" alignItems="center">
        {/* Column Name with Search */}
        <Popover
          placement="bottom-start"
          isOpen={isPopoverOpen}
          onClose={handlePopoverClose}
        >
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
                  fontSize={16}
                  variant="ghost"
                  icon={<FiSearch />}
                  onClick={handleSearchBtnClick}
                />
              </PopoverTrigger>
            )}
          </Flex>

          <SearchPopoverContent
            initialRef={initialRef}
            param={param}
            onClose={handlePopoverClose}
          />
        </Popover>

        {/* Sort Btn */}
        {isSortable && (
          <IconButton
            aria-label="sort-column-btn"
            size="sm"
            fontSize={16}
            variant="ghost"
            icon={getSortBtnIcon()}
            onClick={handleSortDirectionChange}
          />
        )}
      </Flex>
    </Th>
  )
}
