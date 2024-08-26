import { Divider, Flex, Text } from "@chakra-ui/react"
import { Logo } from "component/Logo"
import { LoadingPage } from "component/page/LoadingPage"
import { SidebarListItem } from "component/sidebar/SidebarListItem"
import { configuration } from "configuration"
import { useUserContext } from "context/user"
import { FC } from "react"

export const Sidebar: FC = () => {
  const { userPermissions, isUserAdmin, isLoadingCurrentUser } =
    useUserContext()

  const sideBarRoutes = configuration.sidebarItems.filter(
    ({ type, component, permissions }) =>
      type === "main" &&
      component &&
      (isUserAdmin ||
        permissions?.some((permission) =>
          userPermissions?.includes(permission),
        )),
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

      {/* Sidebar Routes */}
      {isLoadingCurrentUser ? (
        <LoadingPage />
      ) : (
        <Flex direction="column" w="full" gap={2}>
          {sideBarRoutes.map(({ icon, name, path, isDisabled }) => (
            <SidebarListItem
              key={name}
              icon={icon}
              label={name}
              to={path}
              isDisabled={isDisabled}
            />
          ))}
        </Flex>
      )}

      {/* Site Version */}
      <Flex w="full" justifyContent="center" mt="auto">
        <Text fontWeight="light" color="gray">
          {`Site Version: ${configuration.version}`}
        </Text>
      </Flex>
    </Flex>
  )
}
