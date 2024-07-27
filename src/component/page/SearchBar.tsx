import { Flex, Input, InputGroup, InputRightElement } from "@chakra-ui/react"
import { useSearchContext } from "context/search"
import { ChangeEvent, FC } from "react"
import { FiSearch } from "react-icons/fi"

interface SearchBarProps {
  isDisabled?: boolean
}

export const SearchBar: FC<SearchBarProps> = (props) => {
  const { isDisabled } = props

  const { query, setQuery } = useSearchContext()

  const handleSearchQueryChange = (e: ChangeEvent<HTMLInputElement>) => {
    setQuery(e.target.value)
  }

  return (
    <Flex justifyContent="flex-end" gap={2}>
      <InputGroup maxW={360}>
        {/* Search Query */}
        <Input
          bgColor="white"
          placeholder="Search.."
          border="none"
          outline="none"
          value={query}
          type="search"
          onChange={handleSearchQueryChange}
          isDisabled={isDisabled}
        />

        {/* Search Icon */}
        <InputRightElement>
          <FiSearch color="gray" />
        </InputRightElement>
      </InputGroup>
    </Flex>
  )
}
