import { Flex, Heading } from "@chakra-ui/react"
import { HeadingBtns } from "component/page/HeadingBtns"
import { FC } from "react"

interface PageHeadingProps {
  title: string
  isSearchDisabled?: boolean
}

export const PageHeading: FC<PageHeadingProps> = (props) => {
  const { title, isSearchDisabled } = props

  return (
    <Flex justifyContent="space-between" pb={5}>
      {/* Page Title */}
      <Flex direction="column">
        <Heading>{title}</Heading>
      </Flex>

      {/* Buttons List */}
      <HeadingBtns isSearchDisabled={isSearchDisabled} />
    </Flex>
  )
}
