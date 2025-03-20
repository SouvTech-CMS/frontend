import { Flex, Heading } from "@chakra-ui/react"
import { HeadingBtns } from "component/page/HeadingBtns"
import { FC } from "react"

interface PageHeadingProps {
  title?: string
  isSearchHidden?: boolean
  isSearchDisabled?: boolean
}

export const PageHeading: FC<PageHeadingProps> = (props) => {
  const { title, isSearchHidden, isSearchDisabled } = props

  return (
    <Flex justifyContent="space-between" pb={5}>
      {/* Page Title */}
      <Flex direction="column">
        <Heading>{title}</Heading>
      </Flex>

      {/* Buttons List */}
      <HeadingBtns
        isSearchHidden={isSearchHidden}
        isSearchDisabled={isSearchDisabled}
      />
    </Flex>
  )
}
