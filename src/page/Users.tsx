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
import { User } from "type/user"

export const Users = () => {
  const [query, setQuery] = useState<string>("")

  const { data: usersList, isLoading } = useQuery<User[]>(
    "usersList",
    getAllUsers
  )

  const handleChangeSearchQuery = (e: ChangeEvent<HTMLInputElement>) => {
    setQuery(e.target.value)
  }

  return (
    <Flex direction="column" py={5} px={10}>
      <Flex pb={10}>
        <Heading>Сотрудники</Heading>
      </Flex>

      <Flex direction="column" gap={10}>
        {!isLoading ? (
          <>
            {/* TODO: add searching logic */}
            <Flex justifyContent="flex-end" gap={2}>
              <InputGroup maxW={360}>
                {/* Search Query */}
                <Input
                  placeholder="Поиск.."
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
              {usersList?.map((user, index) => (
                // <WrapItem key={index}>
                <UserCard key={index} user={user} />
                // </WrapItem>
              ))}
            </SimpleGrid>
          </>
        ) : (
          <Spinner />
        )}
      </Flex>
    </Flex>
  )
}
