import { LoadingPage } from "component/LoadingPage"
import { Role } from "constant/roles"
import { useUserContext } from "context/user"
import { ComponentType, FC } from "react"
import { Navigate } from "react-router-dom"

export const withAuthAndRoles =
  (allowedRoles: Role[]) => (WrappedComponent: ComponentType) => {
    const AuthorizedComponent: FC = (props) => {
      const { userRoles, isUserAdmin, isLoadingCurrentUser } = useUserContext()

      if (isLoadingCurrentUser) {
        return <LoadingPage />
      }

      const isUserAuthorized =
        isUserAdmin || allowedRoles.some((role) => userRoles?.includes(role))

      if (!isUserAuthorized) {
        return <Navigate to="/noaccess" replace />
      }

      return <WrappedComponent {...props} />
    }

    return AuthorizedComponent
  }
