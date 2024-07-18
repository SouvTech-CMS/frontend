import { Divider, Flex } from "@chakra-ui/react"
import { Logo } from "component/Logo"
import { LoadingPage } from "component/page/LoadingPage"
import { SidebarListItem } from "component/sidebar/SidebarListItem"
import { configuration } from "configuration"
import { useUserContext } from "context/user"
import { FC } from "react"

export const Sidebar: FC = () => {
  const { userRoles, isUserAdmin, isLoadingCurrentUser } = useUserContext()

  const sideBarRoutes = configuration.sidebarItems.filter(
    ({ type, component, roles }) =>
      type === "main" &&
      component &&
      (isUserAdmin || roles?.some((role) => userRoles?.includes(role))),
  )

  return (
    <Flex
      bgColor="sidebar"
      direction="column"
      justifyContent="flex-start"
      alignItems="flex-start"
      px={2}
      py={5}
      borderRightColor="thinBorder"
      borderRightWidth={1}
      gap={5}
    >
      <Logo />

      <Divider borderColor="thinBorder" />

      {isLoadingCurrentUser ? (
        <LoadingPage />
      ) : (
        <Flex direction="column" w="full" gap={2}>
          {sideBarRoutes.map(({ icon, name, path }) => (
            <SidebarListItem key={name} icon={icon!} text={name!} to={path} />
          ))}
        </Flex>
      )}
    </Flex>
  )
}
