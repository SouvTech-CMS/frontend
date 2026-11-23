import {
  Avatar,
  Button,
  Flex,
  Heading,
  Tab,
  TabList,
  TabPanel,
  TabPanels,
  Tabs,
  Tag,
  Text,
  useDisclosure,
} from "@chakra-ui/react"
import { getRoleTablesAccess } from "api/tableAccess/tableAccess"
import { Container } from "component/Container"
import { PermissionsGrid } from "component/role/PermissionsGrid"
import { RoleDeleteModal } from "component/role/RoleDeleteModal"
import { RoleModal } from "component/role/RoleModal"
import { TablesAccessModal } from "component/tableAccess/TablesAccessModal"
import { GOODS_PRODUCTION_INFO_TABLE } from "constant/tables"
import { useUserPermissions } from "hook/useUserPermissions"
import { FC, useState } from "react"
import { FiEdit2, FiTable, FiTrash2 } from "react-icons/fi"
import { useQuery } from "react-query"
import { useRoleUpdateMutation } from "service/role/role"
import { RoleWithPermissions } from "type/role/role"
import { RoleTableAccess } from "type/tableAccess/tableAccess"
import { TableColumn } from "type/tableColumn"
import { UserWithRolesAndShops } from "type/user"
import { notify } from "util/toasts"

const PRODUCTION_INFO_OPTIONAL_COLUMNS = GOODS_PRODUCTION_INFO_TABLE.filter(
  (column): column is TableColumn => column !== null && !column.isMain,
)

interface RoleDetailsProps {
  role: RoleWithPermissions
  employees: UserWithRolesAndShops[]
}

export const RoleDetails: FC<RoleDetailsProps> = (props) => {
  const { role, employees } = props

  const { canEditRoles, canDeleteRoles } = useUserPermissions()

  const initialPermissionsIds = role.permissions.map(({ id }) => id)
  const [permissionsIds, setPermissionsIds] = useState<number[]>(
    initialPermissionsIds,
  )
  const isPermissionsChanged =
    [...permissionsIds].sort().join(",") !==
    [...initialPermissionsIds].sort().join(",")

  const roleUpdateMutation = useRoleUpdateMutation()

  const { data: tableAccess } = useQuery<RoleTableAccess>(
    ["roleTableAccess", role.id],
    () => getRoleTablesAccess(role.id),
  )
  const savedColumns = tableAccess?.tables.find(
    ({ table_name }) => table_name === "production_info",
  )?.columns
  const visibleColumns = PRODUCTION_INFO_OPTIONAL_COLUMNS.filter(
    ({ param }) => !savedColumns?.length || savedColumns.includes(param),
  )

  const {
    isOpen: isRoleModalOpen,
    onOpen: onRoleModalOpen,
    onClose: onRoleModalClose,
  } = useDisclosure()
  const {
    isOpen: isTablesAccessModalOpen,
    onOpen: onTablesAccessModalOpen,
    onClose: onTablesAccessModalClose,
  } = useDisclosure()
  const {
    isOpen: isRoleDeleteModalOpen,
    onOpen: onRoleDeleteModalOpen,
    onClose: onRoleDeleteModalClose,
  } = useDisclosure()

  const handlePermissionToggle = (permissionId: number) => {
    if (!canEditRoles) {
      return
    }

    setPermissionsIds((prevIds) =>
      prevIds.includes(permissionId)
        ? prevIds.filter((id) => id !== permissionId)
        : [...prevIds, permissionId],
    )
  }

  const handlePermissionsSave = async () => {
    const { permissions, ...roleData } = role

    await roleUpdateMutation.mutateAsync({
      role: roleData,
      permissions_list: permissionsIds,
    })

    notify(`Role ${role.name} updated successfully`, "success")
  }

  return (
    <Container flex={1} minW={0} gap={4}>
      <Flex
        w="full"
        justifyContent="space-between"
        alignItems="flex-start"
        gap={4}
        flexWrap="wrap"
      >
        <Flex direction="column" gap={1}>
          <Heading size="lg">{role.name}</Heading>
          <Text color="gray">
            {role.description ? `${role.description} · ` : ""}
            {employees.length}{" "}
            {employees.length === 1 ? "employee" : "employees"} ·{" "}
            {permissionsIds.length} permissions
          </Text>
        </Flex>

        {canEditRoles && (
          <Flex gap={2} flexWrap="wrap">
            <Button size="sm" leftIcon={<FiEdit2 />} onClick={onRoleModalOpen}>
              Edit role
            </Button>
            <Button
              size="sm"
              variant="secondary"
              leftIcon={<FiTable />}
              onClick={onTablesAccessModalOpen}
            >
              Table columns
            </Button>
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
          </Flex>
        )}
      </Flex>

      <Tabs w="full" colorScheme="blue" isLazy>
        <TabList>
          <Tab>Permissions</Tab>
          <Tab>Table columns</Tab>
          <Tab>Employees ({employees.length})</Tab>
        </TabList>

        <TabPanels>
          {/* Permissions */}
          <TabPanel px={0}>
            <Flex direction="column" gap={4}>
              <PermissionsGrid
                checkedPermissionsIds={permissionsIds}
                isInvalid={permissionsIds.length === 0}
                handlePermissionsUpdate={handlePermissionToggle}
              />

              {isPermissionsChanged && (
                <Flex gap={3} alignItems="center">
                  <Button
                    onClick={handlePermissionsSave}
                    isLoading={roleUpdateMutation.isLoading}
                  >
                    Save changes
                  </Button>
                  <Button
                    variant="secondary"
                    onClick={() => setPermissionsIds(initialPermissionsIds)}
                    isDisabled={roleUpdateMutation.isLoading}
                  >
                    Reset
                  </Button>
                  <Text fontSize="sm" color="gray">
                    Unsaved changes
                  </Text>
                </Flex>
              )}
            </Flex>
          </TabPanel>

          {/* Table columns */}
          <TabPanel px={0}>
            <Flex direction="column" gap={3}>
              <Text fontWeight="medium">
                Production Info ·{" "}
                {savedColumns?.length
                  ? `${visibleColumns.length} of ${PRODUCTION_INFO_OPTIONAL_COLUMNS.length} columns visible`
                  : "all columns visible"}
              </Text>

              <Flex gap={2} flexWrap="wrap">
                {visibleColumns.map(({ name, param }) => (
                  <Tag key={param} colorScheme="blue">
                    {name}
                  </Tag>
                ))}
              </Flex>
            </Flex>
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

      {/* Modals */}
      <RoleModal
        prevRole={role}
        prevPermissions={role.permissions}
        isOpen={isRoleModalOpen}
        onClose={onRoleModalClose}
      />
      <TablesAccessModal
        role={role}
        isOpen={isTablesAccessModalOpen}
        onClose={onTablesAccessModalClose}
      />
      <RoleDeleteModal
        role={role}
        isOpen={isRoleDeleteModalOpen}
        onClose={onRoleDeleteModalClose}
      />
    </Container>
  )
}
