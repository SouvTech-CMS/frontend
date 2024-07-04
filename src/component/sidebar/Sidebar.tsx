import { Button, Flex, Heading } from "@chakra-ui/react"
import { LoadingPage } from "component/LoadingPage"
import { SidebarListItem } from "component/sidebar/SidebarListItem"
import { configuration } from "configuration"
import { useAuthContext } from "context/auth"
import { useUserContext } from "context/user"
import { FC } from "react"

export const Sidebar: FC = () => {
  const { signOut } = useAuthContext()

  const { userRoles, isUserAdmin, isLoadingCurrentUser } = useUserContext()

  const sideBarRoutes = configuration.sidebarItems.filter(
    ({ type, component, roles }) =>
      type === "main" &&
      component &&
      (isUserAdmin || roles?.some((role) => userRoles?.includes(role)))
  )

  return (
    <Flex
      bg="gray.200"
      w="16%"
      direction="column"
      justifyContent="flex-start"
      alignItems="flex-start"
      py={5}
      px={2}
      gap={10}
    >
      {/* TODO: replace this with logo image */}
      <Heading w="full" textAlign="center">
        Logo
      </Heading>

      {isLoadingCurrentUser ? (
        <LoadingPage />
      ) : (
        <Flex direction="column" w="full" gap={2}>
          {sideBarRoutes.map(({ icon, name, path }) => (
            <SidebarListItem key={name} icon={icon!} text={name!} to={path} />
          ))}
        </Flex>
      )}

      <Button
        w="full"
        variant="solid"
        colorScheme="blue"
        mt="auto"
        onClick={signOut}
        isDisabled={isLoadingCurrentUser}
      >
        Sign out
      </Button>
    </Flex>
  )
}
