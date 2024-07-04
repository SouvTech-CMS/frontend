import { Role } from "constant/roles"
import { Auth } from "page/Auth"
import { NoAccess } from "page/NoAccess"
import Purchases from "page/Purchases"
import Reports from "page/Reports"
import Suppliers from "page/Suppliers"
import Users from "page/Users"
import { IconType } from "react-icons"
import {
  FiBox,
  FiFileText,
  FiGlobe,
  FiHome,
  FiMap,
  FiTruck,
  FiUsers,
} from "react-icons/fi"
import { getApiBaseUrl } from "util/apiBaseUrl"

type Route = {
  index?: boolean
  type: "main" | "side"
  icon?: IconType
  name: string
  path: string
  component?: JSX.Element
  roles?: Role[]
}

export const configuration = {
  isDevEnv: process.env.NODE_ENV === "development",
  sidebarItems: [
    //* Main pages
    {
      index: true,
      type: "main",
      icon: FiHome,
      name: "Dashboard",
      path: "/",
      roles: [Role.MANAGER],
    },
    {
      type: "main",
      icon: FiFileText,
      name: "Reports",
      path: "/reports",
      roles: [Role.MANAGER],
      component: <Reports />,
    },
    {
      type: "main",
      icon: FiTruck,
      name: "Purchases",
      path: "/purchases",
      roles: [Role.STORAGER],
      component: <Purchases />,
    },
    {
      type: "main",
      icon: FiGlobe,
      name: "Suppliers",
      path: "/suppliers",
      roles: [Role.STORAGER],
      component: <Suppliers />,
    },
    {
      type: "main",
      icon: FiBox,
      name: "Storage",
      path: "/storage",
      roles: [Role.STORAGER],
    },
    {
      type: "main",
      icon: FiUsers,
      name: "Employees",
      path: "/users",
      roles: [Role.ADMIN],
      component: <Users />,
    },
    {
      type: "main",
      icon: FiMap,
      name: "Logs",
      path: "/logs",
      roles: [Role.ADMIN],
    },
    //* Side pages
    {
      type: "side",
      name: "Auth",
      path: "/auth",
      component: <Auth />,
    },
    // {
    //   type: "side",
    //   name: "NotFound",
    //   path: "/*",
    //   component: <NotFound />,
    // },
    {
      type: "side",
      name: "NoAccess",
      path: "/noaccess",
      component: <NoAccess />,
    },
  ] as Route[],
  api: {
    baseUrl: getApiBaseUrl(),
  },
}
