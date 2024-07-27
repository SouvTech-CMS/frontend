import { Role } from "constant/roles"
import { Auth } from "page/Auth"
import Dashboard from "page/Dashboard"
import Goods from "page/Goods"
import { NoAccess } from "page/NoAccess"
import OrderInfo from "page/OrderInfo"
import Orders from "page/Orders"
import Purchases from "page/Purchases"
import Reports from "page/Reports"
import Storage from "page/Storage"
import StorageGoodDetails from "page/StorageGoodDetails"
import Suppliers from "page/Suppliers"
import Users from "page/Users"
import { IconType } from "react-icons"
import {
  FiFileText,
  FiGlobe,
  FiHome,
  FiMap,
  FiPackage,
  FiShoppingBag,
  FiShoppingCart,
  FiTruck,
  FiUsers,
} from "react-icons/fi"
import { getApiBaseUrl } from "util/urls"

type Route = {
  index?: boolean
  type: "main" | "child" | "side"
  icon: IconType
  name: string
  path: string
  component?: JSX.Element
  roles?: Role[]
  isDisabled?: boolean
}

export const configuration = {
  version: "v0.0.37",
  isDevEnv: process.env.NODE_ENV === "development",
  sidebarItems: [
    //* Main pages
    // Dashboard
    {
      index: true,
      type: "main",
      icon: FiHome,
      name: "Dashboard",
      path: "/",
      roles: [Role.ADMIN],
      component: <Dashboard />,
      isDisabled: true,
    },
    // Reports
    {
      type: "main",
      icon: FiFileText,
      name: "Reports",
      path: "/reports",
      roles: [Role.MANAGER],
      component: <Reports />,
      isDisabled: true,
    },
    // Orders
    {
      type: "main",
      icon: FiShoppingCart,
      name: "Orders",
      path: "/orders",
      roles: [Role.MANAGER],
      component: <Orders />,
    },
    // Order Info
    {
      type: "child",
      name: "Order :id",
      path: "/order/:id",
      roles: [Role.MANAGER],
      component: <OrderInfo />,
    },
    // Goods
    {
      type: "main",
      icon: FiShoppingBag,
      name: "Goods",
      path: "/goods",
      roles: [Role.MANAGER],
      component: <Goods />,
    },
    // Purchases
    {
      type: "main",
      icon: FiTruck,
      name: "Purchases",
      path: "/purchases",
      roles: [Role.STORAGER],
      component: <Purchases />,
    },
    // Suppliers
    {
      type: "main",
      icon: FiGlobe,
      name: "Suppliers",
      path: "/suppliers",
      roles: [Role.STORAGER],
      component: <Suppliers />,
    },
    // Storage
    {
      type: "main",
      icon: FiPackage,
      name: "Storage",
      path: "/storage",
      roles: [Role.STORAGER],
      component: <Storage />,
    },
    // Storage Good Details
    {
      type: "child",
      name: "Storage Good :id",
      path: "/storage-good/:id",
      roles: [Role.STORAGER],
      component: <StorageGoodDetails />,
    },
    // Employees
    {
      type: "main",
      icon: FiUsers,
      name: "Employees",
      path: "/users",
      roles: [Role.ADMIN],
      component: <Users />,
    },
    // Logs
    {
      type: "main",
      icon: FiMap,
      name: "Logs",
      path: "/logs",
      roles: [Role.ADMIN],
    },
    //* Side pages
    // Auth
    {
      type: "side",
      name: "Auth",
      path: "/auth",
      component: <Auth />,
    },
    // NoAccess
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
