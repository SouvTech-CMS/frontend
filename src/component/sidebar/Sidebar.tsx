import { Flex, Heading } from "@chakra-ui/react"
import { SidebarListItem } from "component/sidebar/SidebarListItem"
import { configuration } from "configuration"
import { FC } from "react"

export const Sidebar: FC = () => {
  return (
    <Flex
      bg="gray.200"
      w="250px"
      direction="column"
      justifyContent="flex-start"
      alignItems="flex-start"
      py={5}
      px={2}
      borderRight="1px"
      borderColor="gray.300"
      gap={10}
    >
      {/* TODO: add logo image here */}
      <Heading w="full" textAlign="center">
        Logo
      </Heading>

      <Flex direction="column" w="full" gap={2}>
        {configuration.sidebarItems.map(({ icon, name, path }) => (
          <SidebarListItem key={name} icon={icon!} text={name!} to={path} />
        ))}
      </Flex>
    </Flex>
  )
}
