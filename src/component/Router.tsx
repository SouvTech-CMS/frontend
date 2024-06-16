import { queryClient } from "api/queryClient"
import { AppLayout } from "component/AppLayout"
import { configuration } from "configuration"
import { AuthContextProvider } from "context/auth"
import { UserContextProvider } from "context/user"
import { QueryClientProvider } from "react-query"
import { BrowserRouter, Route, Routes } from "react-router-dom"

export const AppRouter = () => {
  const mainPages = configuration.sidebarItems.filter(
    ({ type, component }) => type === "main" && component
  )
  const sidePages = configuration.sidebarItems.filter(
    ({ type, component }) => type === "side" && component
  )

  return (
    <QueryClientProvider client={queryClient}>
      <AuthContextProvider>
        <UserContextProvider>
          <BrowserRouter>
            <Routes>
              {sidePages.map(({ name, path, component }) => (
                <Route key={name} path={path} element={component} />
              ))}
              {/* <Route path="/auth" element={<Auth />} /> */}

              <Route path="/" element={<AppLayout />}>
                {mainPages.map(({ name, index = false, path, component }) => (
                  <Route
                    key={name}
                    index={index}
                    path={path}
                    element={component}
                  />
                ))}
              </Route>

              {/* <Route path="/*" element={<NotFound />} /> */}
            </Routes>
          </BrowserRouter>
        </UserContextProvider>
      </AuthContextProvider>
    </QueryClientProvider>
  )
}
