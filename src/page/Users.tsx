import { SimpleGrid } from "@chakra-ui/react"
import { getAllUsers } from "api/user"
import { LoadingPage } from "component/page/LoadingPage"
import { Page } from "component/page/Page"
import { PageHeading } from "component/page/PageHeading"
import { NewUserCard } from "component/users/NewUserCard"
import { UserCard } from "component/users/UserCard"
import { useSearchContext } from "context/search"
import { useQuery } from "react-query"
import { PageProps } from "type/page/page"
import { UserWithRolesAndShops } from "type/user"

export const Users = (props: PageProps) => {
  const { guideNotionPageId } = props

  const { query, isQueryExists } = useSearchContext()

  const { data: usersList, isLoading } = useQuery<UserWithRolesAndShops[]>(
    "usersList",
    getAllUsers,
  )

  const filteredUsersList = usersList?.filter((user) =>
    isQueryExists
      ? user.username.toLowerCase().includes(query.toLowerCase()) ||
        user.fio?.toLowerCase().includes(query.toLowerCase()) ||
        user.phone?.toLowerCase().includes(query.toLowerCase()) ||
        user.email?.toLowerCase().includes(query.toLowerCase())
      : usersList,
  )

  return (
    <Page guideNotionPageId={guideNotionPageId}>
      <PageHeading title="Employees" isSearchDisabled={isLoading} />

      {!isLoading ? (
        <SimpleGrid columns={{ base: 1, md: 2, lg: 3, xl: 4 }} spacing={10}>
          <NewUserCard />

          {filteredUsersList?.map(
            ({ roles, shops, engraver, ...user }, index) => (
              <UserCard key={index} user={user} roles={roles} shops={shops} />
            ),
          )}
        </SimpleGrid>
      ) : (
        <LoadingPage />
      )}
    </Page>
  )
}
