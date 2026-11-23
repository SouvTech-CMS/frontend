import { Button, Flex, SimpleGrid, Switch, Text } from "@chakra-ui/react"
import { GOODS_PRODUCTION_INFO_TABLE } from "constant/tables"
import { FC } from "react"
import { TableColumn } from "type/tableColumn"

export const PRODUCTION_INFO_TABLE_NAME = "production_info"

const OPTIONAL_COLUMNS = GOODS_PRODUCTION_INFO_TABLE.filter(
  (column): column is TableColumn => column !== null && !column.isMain,
)

export const PRODUCTION_INFO_OPTIONAL_PARAMS: string[] = OPTIONAL_COLUMNS.map(
  ({ param }) => param,
)

// NOTE: prime cost has its own permission
const ALWAYS_VISIBLE_NAMES = GOODS_PRODUCTION_INFO_TABLE.filter(
  (column): column is TableColumn =>
    column !== null && !!column.isMain && column.param !== "prime_cost",
).map(({ name }) => name)

interface TableColumnsSwitchesProps {
  visibleParams: string[]
  isDisabled?: boolean
  onChange: (visibleParams: string[]) => void
}

export const TableColumnsSwitches: FC<TableColumnsSwitchesProps> = (props) => {
  const { visibleParams, isDisabled, onChange } = props

  const isAllVisible = visibleParams.length === OPTIONAL_COLUMNS.length

  const toggle = (param: string) => {
    onChange(
      visibleParams.includes(param)
        ? visibleParams.filter((visibleParam) => visibleParam !== param)
        : [...visibleParams, param],
    )
  }

  return (
    <Flex
      direction="column"
      gap={3}
      p={4}
      maxW={600}
      borderWidth={1}
      borderColor={visibleParams.length ? "thinBorder" : "red.300"}
      borderRadius={12}
    >
      <Flex alignItems="center" justifyContent="space-between">
        <Flex direction="column">
          <Text fontWeight="semibold">Production Info</Text>
          <Text fontSize="sm" color="gray">
            {visibleParams.length} of {OPTIONAL_COLUMNS.length} columns visible
          </Text>
        </Flex>

        <Button
          size="sm"
          variant="ghost"
          colorScheme="blue"
          onClick={() =>
            onChange(isAllVisible ? [] : PRODUCTION_INFO_OPTIONAL_PARAMS)
          }
          isDisabled={isDisabled}
        >
          {isAllVisible ? "Hide all" : "Show all"}
        </Button>
      </Flex>

      <SimpleGrid columns={2} spacingX={6} spacingY={3}>
        {OPTIONAL_COLUMNS.map(({ name, param }) => (
          <Flex key={param} alignItems="center" gap={3}>
            <Switch
              size="sm"
              isChecked={visibleParams.includes(param)}
              onChange={() => toggle(param)}
              isDisabled={isDisabled}
            />
            <Text fontSize="sm">{name}</Text>
          </Flex>
        ))}
      </SimpleGrid>

      <Text fontSize="xs" color="hint">
        Always visible: {ALWAYS_VISIBLE_NAMES.join(", ")}
      </Text>

      {visibleParams.length === 0 && (
        <Text fontSize="xs" color="red.400">
          Turn on at least one column
        </Text>
      )}
    </Flex>
  )
}
