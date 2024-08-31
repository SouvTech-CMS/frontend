import { queryClient } from "api/queryClient"
import { AppLayout } from "component/AppLayout"
import { configuration } from "configuration"
import { AuthContextProvider } from "context/auth"
import { PaginationContextProvider } from "context/pagination"
import { PurchaseTabsContextProvider } from "context/purchaseTabs"
import { SearchContextProvider } from "context/search"
import { UserContextProvider } from "context/user"
import { WebSocketContextProvider } from "context/websocket"
import { withAuthAndPermission } from "hook/withAuthAndPermission"
import { QueryClientProvider } from "react-query"
import { BrowserRouter, Route, Routes } from "react-router-dom"
import { ToastContainer } from "react-toastify"

import "react-toastify/dist/ReactToastify.css"

export const AppRouter = () => {
  const mainPages = configuration.sidebarItems.filter(
    ({ type, component }) => (type === "main" || type === "child") && component,
  )
  const sidePages = configuration.sidebarItems.filter(
    ({ type, component }) => type === "side" && component,
  )

  return (
    <BrowserRouter>
      <QueryClientProvider client={queryClient}>
        <WebSocketContextProvider>
          <AuthContextProvider>
            <Routes>
              {sidePages.map(({ name, path, component }) => (
                <Route key={name} path={path} element={component} />
              ))}
            </Routes>

            <UserContextProvider>
              <SearchContextProvider>
                <PurchaseTabsContextProvider>
                  <PaginationContextProvider>
                    <Routes>
                      <Route path="/" element={<AppLayout />}>
                        {mainPages.map(
                          ({
                            name,
                            index = false,
                            path,
                            permissions,
                            component,
                            isDisabled,
                          }) =>
                            !isDisabled && (
                              <Route
                                key={name}
                                index={index}
                                path={path}
                                element={withAuthAndPermission(permissions)(
                                  component!,
                                )}
                              />
                            ),
                        )}
                      </Route>
                    </Routes>
                  </PaginationContextProvider>
                </PurchaseTabsContextProvider>
              </SearchContextProvider>
            </UserContextProvider>
          </AuthContextProvider>
        </WebSocketContextProvider>
      </QueryClientProvider>
      <ToastContainer />
    </BrowserRouter>
  )
}
