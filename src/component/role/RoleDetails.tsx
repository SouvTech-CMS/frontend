import {
  Avatar,
  Button,
  Editable,
  EditableInput,
  EditablePreview,
  Flex,
  Tab,
  TabList,
  TabPanel,
  TabPanels,
  Tabs,
  Text,
  useDisclosure,
} from "@chakra-ui/react"
import { getRoleTablesAccess } from "api/tableAccess/tableAccess"
import { Container } from "component/Container"
import { PermissionsGrid } from "component/role/PermissionsGrid"
import { RoleDeleteModal } from "component/role/RoleDeleteModal"
import {
  PRODUCTION_INFO_OPTIONAL_PARAMS,
  PRODUCTION_INFO_TABLE_NAME,
  TableColumnsSwitches,
} from "component/tableAccess/TableColumnsSwitches"
import { useUserPermissions } from "hook/useUserPermissions"
import { FC, useEffect, useState } from "react"
import { FiTrash2 } from "react-icons/fi"
import { useQuery } from "react-query"
import { useRoleUpdateMutation } from "service/role/role"
import { useRoleTableAccessUpdateMutation } from "service/tableAccess/tableAccess"
import { RoleWithPermissions } from "type/role/role"
import { RoleTableAccess } from "type/tableAccess/tableAccess"
import { UserWithRolesAndShops } from "type/user"
import { notify } from "util/toasts"

const isSameList = (a: (number | string)[], b: (number | string)[]) =>
  [...a].sort().join(",") === [...b].sort().join(",")

interface RoleDetailsProps {
  role: RoleWithPermissions
  employees: UserWithRolesAndShops[]
  tabIndex: number
  onTabChange: (tabIndex: number) => void
}

export const RoleDetails: FC<RoleDetailsProps> = (props) => {
  const { role, employees, tabIndex, onTabChange } = props

  const { canEditRoles, canDeleteRoles } = useUserPermissions()
  const isReadOnly = !canEditRoles

  // Role
  const initialPermissionsIds = role.permissions.map(({ id }) => id)
  const [name, setName] = useState<string>(role.name)
  const [description, setDescription] = useState<string>(role.description ?? "")
  const [permissionsIds, setPermissionsIds] = useState<number[]>(
    initialPermissionsIds,
  )
  const isRoleChanged =
    name !== role.name ||
    description !== (role.description ?? "") ||
    !isSameList(permissionsIds, initialPermissionsIds)

  // Table columns
  const { data: tableAccess } = useQuery<RoleTableAccess>(
    ["roleTableAccess", role.id],
    () => getRoleTablesAccess(role.id),
  )
  const savedColumns = tableAccess?.tables.find(
    ({ table_name }) => table_name === PRODUCTION_INFO_TABLE_NAME,
  )?.columns
  // NOTE: no saved columns means the role sees all of them
  const initialVisibleParams = savedColumns?.length
    ? PRODUCTION_INFO_OPTIONAL_PARAMS.filter((param) =>
        savedColumns.includes(param),
      )
    : PRODUCTION_INFO_OPTIONAL_PARAMS
  const [visibleParams, setVisibleParams] =
    useState<string[]>(initialVisibleParams)
  const isColumnsChanged = !isSameList(visibleParams, initialVisibleParams)

  useEffect(() => {
    if (tableAccess) {
      setVisibleParams(initialVisibleParams)
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [tableAccess])

  const roleUpdateMutation = useRoleUpdateMutation()
  const tableAccessUpdateMutation = useRoleTableAccessUpdateMutation()
  const isSaving =
    roleUpdateMutation.isLoading || tableAccessUpdateMutation.isLoading

  const isChanged = isRoleChanged || isColumnsChanged
  const isInvalid = !name.trim() || visibleParams.length === 0

  const {
    isOpen: isRoleDeleteModalOpen,
    onOpen: onRoleDeleteModalOpen,
    onClose: onRoleDeleteModalClose,
  } = useDisclosure()

  const handlePermissionToggle = (permissionId: number) => {
    if (isReadOnly) {
      return
    }

    setPermissionsIds((prevIds) =>
      prevIds.includes(permissionId)
        ? prevIds.filter((id) => id !== permissionId)
        : [...prevIds, permissionId],
    )
  }

  const handleReset = () => {
    setName(role.name)
    setDescription(role.description ?? "")
    setPermissionsIds(initialPermissionsIds)
    setVisibleParams(initialVisibleParams)
  }

  const handleSave = async () => {
    if (isColumnsChanged) {
      const isAllVisible =
        visibleParams.length === PRODUCTION_INFO_OPTIONAL_PARAMS.length

      await tableAccessUpdateMutation.mutateAsync({
        role_id: role.id,
        tables: [
          {
            table_name: PRODUCTION_INFO_TABLE_NAME,
            columns: isAllVisible ? [] : visibleParams,
          },
        ],
      })
    }

    if (isRoleChanged) {
      const { permissions, ...roleData } = role

      await roleUpdateMutation.mutateAsync({
        role: { ...roleData, name: name.trim(), description },
        permissions_list: permissionsIds,
      })
    }

    notify(`Role ${name.trim()} updated successfully`, "success")
  }

  return (
    <Container flex={1} minW={0} gap={4}>
      <Flex
        w="full"
        justifyContent="space-between"
        alignItems="flex-start"
        gap={4}
      >
        <Flex direction="column" gap={1} flex={1} minW={0}>
          <Editable
            value={name}
            onChange={setName}
            isDisabled={isReadOnly}
            fontSize="3xl"
            fontWeight="bold"
            placeholder="Role name"
          >
            <EditablePreview
              py={0}
              px={1}
              mx={-1}
              _hover={isReadOnly ? undefined : { bgColor: "appLayout" }}
            />
            <EditableInput py={0} px={1} mx={-1} />
          </Editable>

          <Editable
            value={description}
            onChange={setDescription}
            isDisabled={isReadOnly}
            color="gray"
            placeholder="Add description"
          >
            <EditablePreview
              py={0}
              px={1}
              mx={-1}
              _hover={isReadOnly ? undefined : { bgColor: "appLayout" }}
            />
            <EditableInput py={0} px={1} mx={-1} />
          </Editable>

          <Text fontSize="sm" color="gray">
            {employees.length}{" "}
            {employees.length === 1 ? "employee" : "employees"} ·{" "}
            {permissionsIds.length} permissions
          </Text>
        </Flex>

        {canEditRoles && (
          <Button
            size="sm"
            variant="ghost"
            colorScheme="red"
            leftIcon={<FiTrash2 />}
            onClick={onRoleDeleteModalOpen}
            isDisabled={!canDeleteRoles}
          >
            Delete
          </Button>
        )}
      </Flex>

      <Tabs
        w="full"
        colorScheme="blue"
        index={tabIndex}
        onChange={onTabChange}
        isLazy
      >
        <TabList>
          <Tab>Permissions</Tab>
          <Tab>Table columns</Tab>
          <Tab>Employees ({employees.length})</Tab>
        </TabList>

        <TabPanels>
          {/* Permissions */}
          <TabPanel px={0}>
            <PermissionsGrid
              checkedPermissionsIds={permissionsIds}
              isInvalid={false}
              handlePermissionsUpdate={handlePermissionToggle}
            />
          </TabPanel>

          {/* Table columns */}
          <TabPanel px={0}>
            <TableColumnsSwitches
              visibleParams={visibleParams}
              onChange={setVisibleParams}
              isDisabled={isReadOnly}
            />
          </TabPanel>

          {/* Employees */}
          <TabPanel px={0}>
            <Flex direction="column">
              {employees.map((employee) => (
                <Flex
                  key={employee.id}
                  py={2}
                  gap={3}
                  alignItems="center"
                  borderBottomWidth={1}
                  borderColor="thinBorder"
                >
                  <Avatar size="sm" name={employee.fio || employee.username} />
                  <Flex direction="column">
                    <Text fontWeight="medium">
                      {employee.fio || employee.username}
                    </Text>
                    <Text fontSize="sm" color="gray">
                      {employee.username}
                    </Text>
                  </Flex>
                </Flex>
              ))}

              {employees.length === 0 && (
                <Text color="gray">No employees with this role</Text>
              )}
            </Flex>
          </TabPanel>
        </TabPanels>
      </Tabs>

      {isChanged && (
        <Flex gap={3} alignItems="center">
          <Button
            onClick={handleSave}
            isLoading={isSaving}
            isDisabled={isInvalid}
          >
            Save changes
          </Button>
          <Button
            variant="secondary"
            onClick={handleReset}
            isDisabled={isSaving}
          >
            Reset
          </Button>
          <Text fontSize="sm" color="gray">
            Unsaved changes
          </Text>
        </Flex>
      )}

      <RoleDeleteModal
        role={role}
        isOpen={isRoleDeleteModalOpen}
        onClose={onRoleDeleteModalClose}
      />
    </Container>
  )
}
