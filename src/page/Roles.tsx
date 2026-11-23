import { Flex } from "@chakra-ui/react"
import { getAllRoles } from "api/role/role"
import { getAllUsers } from "api/user"
import { LoadingPage } from "component/page/LoadingPage"
import { Page } from "component/page/Page"
import { PageHeading } from "component/page/PageHeading"
import { RoleDetails } from "component/role/RoleDetails"
import { RolesList } from "component/role/RolesList"
import { ADMIN_ROLE } from "constant/roles"
import { useSearchContext } from "context/search"
import { useUserPermissions } from "hook/useUserPermissions"
import { useState } from "react"
import { useQuery } from "react-query"
import { PageProps } from "type/page/page"
import { RoleWithPermissions } from "type/role/role"
import { UserWithRolesAndShops } from "type/user"

export const Roles = (props: PageProps) => {
  const { guideNotionPageId } = props

  const { query, isQueryExists } = useSearchContext()
  const { canReadUsers } = useUserPermissions()

  const [selectedRoleId, setSelectedRoleId] = useState<number>()

  const { data: rolesWithPermissionsList, isLoading } = useQuery<
    RoleWithPermissions[]
  >("rolesWithPermissionsList", getAllRoles)

  const { data: usersList } = useQuery<UserWithRolesAndShops[]>(
    "usersList",
    getAllUsers,
    { enabled: canReadUsers },
  )

  // NOTE: admin has every permission and can't be edited
  const filteredRolesList = rolesWithPermissionsList?.filter(
    (role) =>
      !role.name.toLowerCase().includes(ADMIN_ROLE) &&
      (!isQueryExists ||
        role.name.toLowerCase().includes(query.toLowerCase()) ||
        role.description?.toLowerCase().includes(query.toLowerCase())),
  )

  const selectedRole =
    filteredRolesList?.find(({ id }) => id === selectedRoleId) ??
    filteredRolesList?.[0]

  const getRoleEmployees = (roleId: number) =>
    usersList?.filter(({ roles }) => roles.some(({ id }) => id === roleId)) ??
    []

  return (
    <Page guideNotionPageId={guideNotionPageId}>
      <PageHeading title="Roles" isSearchDisabled={isLoading} />

      {!isLoading ? (
        <Flex w="full" gap={6} alignItems="flex-start">
          <RolesList
            roles={filteredRolesList ?? []}
            selectedRoleId={selectedRole?.id}
            onSelect={setSelectedRoleId}
            getEmployeesCount={(roleId) => getRoleEmployees(roleId).length}
          />

          {selectedRole && (
            <RoleDetails
              // NOTE: remount on role change to reset unsaved switches
              key={`${selectedRole.id}-${selectedRole.permissions
                .map(({ id }) => id)
                .join(",")}`}
              role={selectedRole}
              employees={getRoleEmployees(selectedRole.id)}
            />
          )}
        </Flex>
      ) : (
        <LoadingPage />
      )}
    </Page>
  )
}
