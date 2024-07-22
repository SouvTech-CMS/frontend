import {
  Flex,
  Heading,
  Input,
  InputGroup,
  InputRightElement,
} from "@chakra-ui/react"
import { ProfileMenu } from "component/page/ProfileMenu"
import { useSearchContext } from "context/search"
import { ChangeEvent, FC } from "react"
import { FiSearch } from "react-icons/fi"

interface PageHeadingProps {
  title: string
  isDisabled?: boolean
}

export const PageHeading: FC<PageHeadingProps> = (props) => {
  const { title, isDisabled } = props

  const { query, setQuery } = useSearchContext()

  const handleSearchQueryChange = (e: ChangeEvent<HTMLInputElement>) => {
    setQuery(e.target.value)
  }

  return (
    <Flex justifyContent="space-between" pb={5}>
      {/* Page Title */}
      <Flex direction="column">
        <Heading>{title}</Heading>
      </Flex>

      <Flex alignItems="center" gap={5}>
        {/* Search */}
        <Flex justifyContent="flex-end" gap={2}>
          <InputGroup maxW={360}>
            {/* Search Query */}
            <Input
              bgColor="white"
              placeholder="Search.."
              border="none"
              outline="none"
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

        {/* Avatar with Menu */}
        <ProfileMenu />
      </Flex>
    </Flex>
  )
}
