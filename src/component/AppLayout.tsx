import { Flex } from "@chakra-ui/react"
import { Sidebar } from "component/sidebar/Sidebar"
import { useAuthContext } from "context/auth"
import { FC } from "react"
import { Navigate, Outlet, useLocation } from "react-router-dom"

export const AppLayout: FC = () => {
  const { isAuthenticated } = useAuthContext()
  const location = useLocation()

  if (isAuthenticated) {
    return (
      <Flex h="full" w="full">
        <Sidebar />

        <Outlet />
      </Flex>
    )
  }

  return <Navigate to="/auth" state={{ from: location }} replace />
}
