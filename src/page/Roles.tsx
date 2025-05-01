import { SimpleGrid } from "@chakra-ui/react"
import { getAllRoles } from "api/role/role"
import { LoadingPage } from "component/page/LoadingPage"
import { Page } from "component/page/Page"
import { PageHeading } from "component/page/PageHeading"
import { NewRoleCard } from "component/role/NewRoleCard"
import { RoleCard } from "component/role/RoleCard"
import { useSearchContext } from "context/search"
import { useUserPermissions } from "hook/useUserPermissions"
import { useQuery } from "react-query"
import { PageProps } from "type/page/page"
import { RoleWithPermissions } from "type/role/role"

export const Roles = (props: PageProps) => {
  const { guideNotionPageId } = props

  const { query, isQueryExists } = useSearchContext()
  const { canEditRoles } = useUserPermissions()

  const { data: rolesWithPermissionsList, isLoading } = useQuery<
    RoleWithPermissions[]
  >("rolesWithPermissionsList", getAllRoles)

  const filteredRolesList = rolesWithPermissionsList?.filter((role) =>
    isQueryExists
      ? role.name.toLowerCase().includes(query.toLowerCase()) ||
        role.description?.toLowerCase().includes(query.toLowerCase())
      : rolesWithPermissionsList,
  )

  return (
    <Page guideNotionPageId={guideNotionPageId}>
      <PageHeading title="Roles" isSearchDisabled={isLoading} />

      {!isLoading ? (
        <SimpleGrid columns={{ base: 1, md: 2, lg: 3, xl: 4 }} spacing={10}>
          {canEditRoles && <NewRoleCard />}

          {filteredRolesList?.map((role, index) => (
            <RoleCard key={index} role={role} />
          ))}
        </SimpleGrid>
      ) : (
        <LoadingPage />
      )}
    </Page>
  )
}
