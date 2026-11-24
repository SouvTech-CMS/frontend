import { signIn as signInReq } from "api/auth"
import { queryClient } from "api/queryClient"
import { createContext, useContext, useEffect, useState } from "react"
import { FCC } from "type/fcc"
import {
  clearUserToken,
  getUserToken,
  setUserToken,
  USER_TOKEN_EXPIRED_EVENT,
} from "util/userToken"

interface AuthContextProps {
  isAuthenticated: boolean
  signIn: (username: string, password: string) => Promise<void>
  signOut: () => void
}

export const AuthContext = createContext<AuthContextProps>({
  isAuthenticated: false,
  signIn: async () => {},
  signOut: () => {},
})

export const AuthContextProvider: FCC = (props) => {
  const { children } = props

  const [isAuthenticated, setIsAuthenticated] = useState<boolean>(() => {
    return !!getUserToken()
  })

  const signIn = async (username: string, password: string) => {
    const token = await signInReq(username, password)
    setUserToken(token.access_token)
    setIsAuthenticated(true)
    queryClient.invalidateQueries("currentUser")
  }

  const signOut = () => {
    clearUserToken()
    setIsAuthenticated(false)
    queryClient.invalidateQueries("currentUser")
  }

  // NOTE: API returned 401 (expired token), the token is already cleared
  useEffect(() => {
    const handleTokenExpired = () => setIsAuthenticated(false)

    window.addEventListener(USER_TOKEN_EXPIRED_EVENT, handleTokenExpired)
    return () =>
      window.removeEventListener(USER_TOKEN_EXPIRED_EVENT, handleTokenExpired)
  }, [])

  return (
    <AuthContext.Provider
      value={{
        isAuthenticated,
        signIn,
        signOut,
      }}
    >
      {children}
    </AuthContext.Provider>
  )
}

export const useAuthContext = () => {
  const context = useContext(AuthContext)

  if (!context) {
    throw new Error("useAuthContext must be used in AuthContextProvider")
  }

  return context
}
