import { Divider, Flex, Text } from "@chakra-ui/react"
import { Logo } from "component/Logo"
import { LoadingPage } from "component/page/LoadingPage"
import { SidebarCollapseBtn } from "component/sidebar/SidebarCollapseBtn"
import { SidebarListItem } from "component/sidebar/SidebarListItem"
import { configuration } from "configuration"
import { useUserContext } from "context/user"
import { FC, useState } from "react"
import { isUserHasPermissions } from "util/permission"

export const Sidebar: FC = () => {
  const { userPermissions, isUserAdmin, isLoadingCurrentUser } =
    useUserContext()

  const [isCollapsed, setIsCollapsed] = useState<boolean>(false)

  const sideBarRoutes = configuration.sidebarItems.filter(
    ({ type, component, permissions }) =>
      type === "main" &&
      component &&
      isUserHasPermissions(permissions, userPermissions, isUserAdmin),
  )

  const handleCollapse = () => {
    setIsCollapsed((prevIsCollapsed) => !prevIsCollapsed)
  }

  return (
    <Flex
      bgColor="sidebar"
      h="full"
      direction="column"
      justifyContent="flex-start"
      alignItems="center"
      px={2}
      py={5}
      borderRightColor="thinBorder"
      borderRightWidth={1}
      gap={5}
      overflowY="auto"
      overflowX="hidden"
    >
      <Logo isCollapsed={isCollapsed} />

      <Divider borderColor="thinBorder" />

      {/* Sidebar Routes */}
      {isLoadingCurrentUser ? (
        <LoadingPage />
      ) : (
        <Flex w="full" direction="column" gap={2}>
          {sideBarRoutes.map(({ icon, name, path, isDisabled }) => (
            <SidebarListItem
              key={name}
              icon={icon}
              label={name}
              to={path}
              isCollapsed={isCollapsed}
              isDisabled={isDisabled}
            />
          ))}
        </Flex>
      )}

      {/* Site Version */}
      <Flex w="full" direction="column" alignItems="center" mt="auto" gap={3}>
        {!isCollapsed && (
          <Flex w="full" direction="column" alignItems="center" gap={1}>
            {/* Site Version */}
            <Text fontWeight="light" color="gray.400">
              {`Site Version: ${configuration.version}`}
            </Text>

            {/* Copyrights */}
            <Text fontWeight="light" color="gray.400">
              © RedBread
            </Text>
          </Flex>
        )}

        {/* Collapse Btn */}
        <SidebarCollapseBtn
          isCollapsed={isCollapsed}
          onClick={handleCollapse}
        />
      </Flex>
    </Flex>
  )
}
