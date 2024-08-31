import { Flex } from "@chakra-ui/react"
import { axiosClient } from "api/axiosClient"
import { AxiosError } from "axios"
import { Sidebar } from "component/sidebar/Sidebar"
import { useAuthContext } from "context/auth"
import { FC, useEffect } from "react"
import { Navigate, Outlet, useLocation, useNavigate } from "react-router-dom"

export const AppLayout: FC = () => {
  const { isAuthenticated } = useAuthContext()
  const location = useLocation()
  const navigate = useNavigate()

  useEffect(() => {
    const checkServer = async () => {
      try {
        await axiosClient.get("/healthcheck")
      } catch (e) {
        if (e instanceof AxiosError) {
          if (e.code === "ERR_NETWORK") {
            navigate("/maintenance", {
              state: { from: location },
              replace: true,
            })
          }
        }
      }
    }

    checkServer()
  }, [location, navigate])

  if (isAuthenticated) {
    return (
      <Flex h="full" w="full" bgColor="appLayout" direction="row">
        <Sidebar />

        <Outlet />
      </Flex>
    )
  }

  return <Navigate to="/auth" state={{ from: location }} replace />
}
