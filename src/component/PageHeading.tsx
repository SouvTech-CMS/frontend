import {
  Flex,
  Heading,
  Input,
  InputGroup,
  InputRightElement,
} from "@chakra-ui/react"
import { useSearchContext } from "context/search"
import { ChangeEvent, FC } from "react"
import { FiSearch } from "react-icons/fi"

interface PageHeadingProps {
  title: string
  isDisabled?: boolean
  isSearchHidden?: boolean
}

export const PageHeading: FC<PageHeadingProps> = (props) => {
  const { title, isDisabled, isSearchHidden } = props

  const { query, setQuery } = useSearchContext()

  const handleSearchQueryChange = (e: ChangeEvent<HTMLInputElement>) => {
    setQuery(e.target.value)
  }

  return (
    <Flex justifyContent="space-between" pb={10}>
      <Heading>{title}</Heading>

      {/* Search */}
      {!isSearchHidden && (
        <Flex justifyContent="flex-end" gap={2}>
          <InputGroup maxW={360}>
            {/* Search Query */}
            <Input
              placeholder="Search.."
              value={query}
              onChange={handleSearchQueryChange}
              isDisabled={isDisabled}
            />

            {/* Search Icon */}
            <InputRightElement>
              <FiSearch color="gray" />
            </InputRightElement>
          </InputGroup>
        </Flex>
      )}
    </Flex>
  )
}
