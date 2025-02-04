import {
  Collapse,
  Flex,
  Heading,
  SimpleGrid,
  SimpleGridProps,
} from "@chakra-ui/react"
import { CollapseBtn } from "component/CollapseBtn"
import { useState } from "react"
import { FCC } from "type/fcc"

interface CollapsibleCardsGridProps {
  heading?: string
  defaultExpanded?: boolean
  columns?: SimpleGridProps["columns"]
  isDisabled?: boolean
}

const DEFAULT_GRID_COLUMNS: SimpleGridProps["columns"] = {
  base: 1,
  sm: 2,
  md: 2,
  lg: 4,
  xl: 5,
}

export const CollapsibleCardsGrid: FCC<CollapsibleCardsGridProps> = (props) => {
  const {
    heading,
    defaultExpanded = false,
    columns = DEFAULT_GRID_COLUMNS,
    isDisabled,
    children,
  } = props

  const [isExpanded, setIsExpanded] = useState<boolean>(defaultExpanded)

  return (
    <Flex direction="column" gap={5}>
      <Flex w="full" direction="row" gap={2}>
        <CollapseBtn
          size="md"
          isExpanded={isExpanded}
          setIsExpanded={setIsExpanded}
          isDisabled={isDisabled}
        />

        <Heading size="lg">{heading}</Heading>
      </Flex>

      {/* Cards Grid */}
      <Collapse in={isExpanded}>
        <SimpleGrid
          columns={{
            ...DEFAULT_GRID_COLUMNS,
            ...(columns as object),
          }}
          spacing={5}
        >
          {children}
        </SimpleGrid>
      </Collapse>
    </Flex>
  )
}
