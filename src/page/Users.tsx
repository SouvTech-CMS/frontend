import {
  Flex,
  Heading,
  Input,
  InputGroup,
  InputRightElement,
  SimpleGrid,
  Spinner,
} from "@chakra-ui/react"
import { getAllUsers } from "api/user"
import { NewUserCard } from "component/users/NewUserCard"
import { UserCard } from "component/users/UserCard"
import { ChangeEvent, useState } from "react"
import { FiSearch } from "react-icons/fi"
import { useQuery } from "react-query"
import { UserWithRolesAndShops } from "type/user"

export const Users = () => {
  const [query, setQuery] = useState<string>("")

  const { data: usersList, isLoading } = useQuery<UserWithRolesAndShops[]>(
    "usersList",
    getAllUsers
  )

  const isQueryExists = !!query.trim()

  const filteredUsersList = usersList?.filter(({ user }) =>
    isQueryExists
      ? user.username.toLowerCase().includes(query.toLowerCase()) ||
        user.fio?.toLowerCase().includes(query.toLowerCase()) ||
        user.phone?.toLowerCase().includes(query.toLowerCase()) ||
        user.email?.toLowerCase().includes(query.toLowerCase())
      : usersList
  )

  const handleChangeSearchQuery = (e: ChangeEvent<HTMLInputElement>) => {
    setQuery(e.target.value)
  }

  return (
    <Flex w="full" direction="column" py={5} px={10}>
      <Flex pb={10}>
        <Heading>Сотрудники</Heading>
      </Flex>

      <Flex direction="column" gap={10}>
        {!isLoading ? (
          <>
            <Flex justifyContent="flex-end" gap={2}>
              <InputGroup maxW={360}>
                {/* Search Query */}
                <Input
                  placeholder="Search.."
                  value={query}
                  onChange={handleChangeSearchQuery}
                />

                {/* Search Icon */}
                <InputRightElement>
                  <FiSearch color="gray" />
                </InputRightElement>
              </InputGroup>
            </Flex>

            <SimpleGrid columns={{ base: 1, md: 2, lg: 3, xl: 4 }} spacing={10}>
              <NewUserCard />

              {filteredUsersList?.map(
                ({ user, roles_with_permissions, shops }, index) => (
                  <UserCard
                    key={index}
                    user={user}
                    roles={roles_with_permissions}
                    shops={shops}
                  />
                )
              )}
            </SimpleGrid>
          </>
        ) : (
          <Spinner />
        )}
      </Flex>
    </Flex>
  )
}
