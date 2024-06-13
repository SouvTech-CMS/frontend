import { Flex } from "@chakra-ui/react"
import { Sidebar } from "component/sidebar/Sidebar"
import { FC } from "react"
import { Outlet } from "react-router-dom"

export const AppLayout: FC = () => {
  return (
    <Flex h="full" w="full">
      <Sidebar />

      <Outlet />
    </Flex>
  )
}
