import { Button } from "@chakra-ui/react"
import { useTableContext } from "context/table"

interface SearchFiltersClearBtnProps {
  isLoading?: boolean
}

export const SearchFiltersClearBtn = <SearchFilterType,>(
  props: SearchFiltersClearBtnProps,
) => {
  const { isLoading } = props

  const { setSearchFilter } = useTableContext<SearchFilterType>()

  const handleClearSearchFiltersClear = () => {
    setSearchFilter(undefined)
  }

  return (
    <Button
      variant="secondary"
      onClick={handleClearSearchFiltersClear}
      isLoading={isLoading}
    >
      Clear Search Filters
    </Button>
  )
}
