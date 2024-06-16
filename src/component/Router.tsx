import { queryClient } from "api/queryClient"
import { AppLayout } from "component/AppLayout"
import { configuration } from "configuration"
import { AuthContextProvider } from "context/auth"
import { UserContextProvider } from "context/user"
import { Auth } from "page/Auth"
import { NotFound } from "page/NotFound"
import { QueryClientProvider } from "react-query"
import { BrowserRouter, Route, Routes } from "react-router-dom"

export const AppRouter = () => {
  const mainPages = configuration.sidebarItems.filter(
    ({ component }) => component
  )

  return (
    <QueryClientProvider client={queryClient}>
      <AuthContextProvider>
        <UserContextProvider>
          <BrowserRouter>
            <Routes>
              <Route path="/auth" element={<Auth />} />

              <Route path="/" element={<AppLayout />}>
                {mainPages.map(({ index = false, name, path, component }) => (
                  <Route
                    key={name}
                    index={index}
                    path={path}
                    element={component}
                  />
                ))}
              </Route>

              <Route path="/*" element={<NotFound />} />
            </Routes>
          </BrowserRouter>
        </UserContextProvider>
      </AuthContextProvider>
    </QueryClientProvider>
  )
}
