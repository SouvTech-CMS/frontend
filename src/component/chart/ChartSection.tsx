import { Flex, Heading } from "@chakra-ui/react"
import {
  FiltersPopover,
  FiltersPopoverProps,
} from "component/chart/FiltersPopover"
import { Container, ContainerProps } from "component/Container"
import { FCC } from "type/fcc"

interface ChartSectionProps extends FiltersPopoverProps, ContainerProps {
  title: string
}

export const ChartSection: FCC<ChartSectionProps> = (props) => {
  const { title, children } = props

  return (
    <Container {...props}>
      {/* Header */}
      <Flex
        w="full"
        direction="row"
        justifyContent="space-between"
        alignItems="center"
        gap={3}
      >
        {/* Title */}
        <Flex>
          <Heading size="lg" fontWeight="medium">
            {title}
          </Heading>
        </Flex>

        {/* Filters */}
        <FiltersPopover {...props} />
      </Flex>

      {/* Chart */}
      <Flex w="full">{children}</Flex>
    </Container>
  )
}
