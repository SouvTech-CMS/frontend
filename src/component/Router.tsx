import { AppLayout } from "component/AppLayout"
import { configuration } from "configuration"
import { AuthProvider } from "context/auth"
import { NotFound } from "page/NotFound"
import { BrowserRouter, Route, Routes } from "react-router-dom"

export const AppRouter = () => {
  const mainPages = configuration.sidebarItems.filter(({ component }) => component)

  return (
    <BrowserRouter>
      <AuthProvider>
        <Routes>
          <Route path="/" element={<AppLayout />}>
            {mainPages.map(({ index = false, name, path, component }) => (
              <Route key={name} index={index} path={path} element={component} />
            ))}
          </Route>

          <Route path="/*" element={<NotFound />} />
        </Routes>
      </AuthProvider>
    </BrowserRouter>
  )
}
