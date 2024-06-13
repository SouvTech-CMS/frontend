import { Auth } from "page/Auth"
import { FC, ReactNode, createContext, useContext, useState } from "react"

interface AuthContextType {
  signIn: () => void
  signOut: () => void
}

export const AuthContext = createContext<AuthContextType>({
  signIn: () => {},
  signOut: () => {},
})

interface AuthContextProviderProps {
  children: ReactNode
}

export const AuthProvider: FC<AuthContextProviderProps> = (props) => {
  const { children } = props

  const [isAuthenticated, setIsAuthenticated] = useState(false)

  const signIn = () => {
    setIsAuthenticated(true)
  }

  const signOut = () => {
    setIsAuthenticated(false)
  }

  return (
    <AuthContext.Provider value={{ signIn, signOut }}>
      {/* {isAuthenticated ? children : <Navigate to="/auth" />} */}
      {isAuthenticated ? children : <Auth />}
    </AuthContext.Provider>
  )
}

export const useAuthContext = () => {
  return useContext(AuthContext)
}
