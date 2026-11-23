import {
  Button,
  Flex,
  Modal,
  ModalBody,
  ModalCloseButton,
  ModalContent,
  ModalFooter,
  ModalHeader,
  SimpleGrid,
  Switch,
  Text,
} from "@chakra-ui/react"
import { getRoleTablesAccess } from "api/tableAccess/tableAccess"
import { ModalBackgroundBlur } from "component/ModalBackgroundBlur"
import { GOODS_PRODUCTION_INFO_TABLE } from "constant/tables"
import { FC, useEffect, useState } from "react"
import { useQuery } from "react-query"
import { useRoleTableAccessUpdateMutation } from "service/tableAccess/tableAccess"
import { titleCase } from "title-case"
import { ModalProps } from "type/modalProps"
import { Role } from "type/role/role"
import { RoleTableAccess } from "type/tableAccess/tableAccess"
import { TableColumn } from "type/tableColumn"
import { WithId } from "type/withId"
import { notify } from "util/toasts"

// NOTE: a role without columns of a table sees all of them, so "all visible"
// is saved as an empty list
const TABLES = [
  {
    name: "production_info",
    title: "Production Info",
    columns: GOODS_PRODUCTION_INFO_TABLE.filter(
      (column): column is TableColumn => column !== null,
    ),
  },
]

type VisibleColumns = Record<string, string[]>

const getOptionalParams = (columns: TableColumn[]) =>
  columns.filter(({ isMain }) => !isMain).map(({ param }) => param)

interface TablesAccessModalProps extends ModalProps {
  role: WithId<Role>
}

export const TablesAccessModal: FC<TablesAccessModalProps> = (props) => {
  const { role, isOpen, onClose } = props

  const roleId = role.id
  const roleName = role.name

  const [visibleColumns, setVisibleColumns] = useState<VisibleColumns>({})

  const {
    data: roleTableAccess,
    isLoading: isRoleAccessLoading,
    refetch,
    isRefetching,
  } = useQuery<RoleTableAccess>(
    ["roleTableAccess", roleId],
    () => getRoleTablesAccess(roleId),
    { enabled: isOpen },
  )

  const roleTableAccessUpdateMutation = useRoleTableAccessUpdateMutation()

  const isLoading =
    isRoleAccessLoading ||
    isRefetching ||
    roleTableAccessUpdateMutation.isLoading

  const isSomeTableEmpty = TABLES.some(
    ({ name }) => (visibleColumns[name] ?? []).length === 0,
  )
  const isSaveBtnDisabled = isLoading || isSomeTableEmpty

  const toggleColumn = (tableName: string, param: string) => {
    setVisibleColumns((prev) => {
      const columns = prev[tableName] ?? []
      return {
        ...prev,
        [tableName]: columns.includes(param)
          ? columns.filter((column) => column !== param)
          : [...columns, param],
      }
    })
  }

  const setAllColumns = (tableName: string, columns: string[]) => {
    setVisibleColumns((prev) => ({ ...prev, [tableName]: columns }))
  }

  const handleRoleTablesAccessUpdate = async () => {
    const body: RoleTableAccess = {
      role_id: roleId,
      tables: TABLES.map(({ name, columns }) => {
        const optionalParams = getOptionalParams(columns)
        const visible = visibleColumns[name] ?? []
        const isAllVisible = optionalParams.every((param) =>
          visible.includes(param),
        )

        return { table_name: name, columns: isAllVisible ? [] : visible }
      }),
    }

    await roleTableAccessUpdateMutation.mutateAsync(body)

    notify(
      `${titleCase(roleName)}'s table access updated successfully`,
      "success",
    )
    onClose()
  }

  // Fill the switches from the saved access
  useEffect(() => {
    if (!roleTableAccess) {
      return
    }

    setVisibleColumns(
      Object.fromEntries(
        TABLES.map(({ name, columns }) => {
          const saved = roleTableAccess.tables.find(
            ({ table_name }) => table_name === name,
          )?.columns
          const optionalParams = getOptionalParams(columns)
          const visible = saved?.length
            ? optionalParams.filter((param) =>
                saved.some(
                  (column) => column.toLowerCase() === param.toLowerCase(),
                ),
              )
            : optionalParams

          return [name, visible]
        }),
      ),
    )
  }, [roleTableAccess])

  useEffect(() => {
    if (isOpen) {
      refetch()
    }
  }, [refetch, isOpen])

  return (
    <Modal size="xl" isOpen={isOpen} onClose={onClose} isCentered>
      <ModalBackgroundBlur />

      <ModalContent>
        <ModalHeader>Table columns for {role.name}</ModalHeader>
        <ModalCloseButton />

        <ModalBody>
          <Flex w="full" direction="column" gap={5}>
            {TABLES.map(({ name, title, columns }) => {
              const optionalColumns = columns.filter(({ isMain }) => !isMain)
              const mainColumnsNames = columns
                // NOTE: prime cost has its own permission
                .filter(({ isMain, param }) => isMain && param !== "prime_cost")
                .map(({ name }) => name)
              const visible = visibleColumns[name] ?? []
              const isAllVisible = visible.length === optionalColumns.length

              return (
                <Flex
                  key={name}
                  direction="column"
                  gap={3}
                  p={4}
                  borderWidth={1}
                  borderColor="thinBorder"
                  borderRadius={12}
                >
                  <Flex alignItems="center" justifyContent="space-between">
                    <Flex direction="column">
                      <Text fontWeight="semibold">{title}</Text>
                      <Text fontSize="sm" color="gray">
                        {visible.length} of {optionalColumns.length} columns
                        visible
                      </Text>
                    </Flex>

                    <Button
                      size="sm"
                      variant="ghost"
                      colorScheme="blue"
                      onClick={() =>
                        setAllColumns(
                          name,
                          isAllVisible ? [] : getOptionalParams(columns),
                        )
                      }
                    >
                      {isAllVisible ? "Hide all" : "Show all"}
                    </Button>
                  </Flex>

                  <SimpleGrid columns={2} spacingX={6} spacingY={3}>
                    {optionalColumns.map(({ name: columnName, param }) => (
                      <Flex key={param} alignItems="center" gap={3}>
                        <Switch
                          size="sm"
                          isChecked={visible.includes(param)}
                          onChange={() => toggleColumn(name, param)}
                          isDisabled={isLoading}
                        />
                        <Text fontSize="sm">{columnName}</Text>
                      </Flex>
                    ))}
                  </SimpleGrid>

                  <Text fontSize="xs" color="hint">
                    Always visible: {mainColumnsNames.join(", ")}
                  </Text>

                  {visible.length === 0 && (
                    <Text fontSize="xs" color="red.400">
                      Turn on at least one column
                    </Text>
                  )}
                </Flex>
              )
            })}
          </Flex>
        </ModalBody>

        <ModalFooter>
          <Flex gap={5}>
            <Button
              onClick={handleRoleTablesAccessUpdate}
              isLoading={isLoading}
              isDisabled={isSaveBtnDisabled}
            >
              Save
            </Button>

            <Button variant="secondary" onClick={onClose} isLoading={isLoading}>
              Cancel
            </Button>
          </Flex>
        </ModalFooter>
      </ModalContent>
    </Modal>
  )
}
