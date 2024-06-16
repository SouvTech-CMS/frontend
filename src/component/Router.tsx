import { AppLayout } from "component/AppLayout"
import { configuration } from "configuration"
import { AuthProvider } from "context/auth"
import { Auth } from "page/Auth"
import { NotFound } from "page/NotFound"
import { BrowserRouter, Route, Routes } from "react-router-dom"

export const AppRouter = () => {
  const mainPages = configuration.sidebarItems.filter(({ component }) => component)

  return (
    <AuthProvider>
      <BrowserRouter>
        <Routes>
          <Route path="/auth" element={<Auth />} />

          <Route path="/" element={<AppLayout />}>
            {mainPages.map(({ index = false, name, path, component }) => (
              <Route key={name} index={index} path={path} element={component} />
            ))}
          </Route>

          <Route path="/*" element={<NotFound />} />
        </Routes>
      </BrowserRouter>
    </AuthProvider>
  )
}
