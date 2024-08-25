import { Permission } from "constant/permissions"
import { TableContextProvider } from "context/table"
import { Auth } from "page/Auth"
import { Dashboard } from "page/Dashboard"
import { DetailedReports } from "page/DetailedReports"
import { Goods } from "page/Goods"
import { NoAccess } from "page/NoAccess"
import { OrderInfo } from "page/OrderInfo"
import { Orders } from "page/Orders"
import { ProductionInfo } from "page/ProductionInfo"
import { Purchases } from "page/Purchases"
import { PurchasesHistory } from "page/PurchasesHistory"
import { Storage } from "page/Storage"
import { StorageGoodDetails } from "page/StorageGoodDetails"
import { Suppliers } from "page/Suppliers"
import { Users } from "page/Users"
import { IconType } from "react-icons"
import {
  FiFeather,
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
import { StorageGoodSearchFilter } from "type/storage/storageGood"
import { getApiBaseUrl } from "util/urls"

type Route = {
  index?: boolean
  type: "main" | "child" | "side"
  icon: IconType
  name: string
  path: string
  component?: JSX.Element
  permissions?: Permission[]
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
      permissions: [],
      component: Dashboard,
      isDisabled: true,
    },
    // Reports
    {
      type: "main",
      icon: FiFileText,
      name: "Reports",
      path: "/reports",
      permissions: [Permission.REPORT_DETAILED],
      component: <DetailedReports />,
    },
    // Orders
    {
      type: "main",
      icon: FiShoppingCart,
      name: "Orders",
      path: "/orders",
      permissions: [Permission.ORDER_READ],
      component: <Orders />,
    },
    // Order Info
    {
      type: "child",
      name: "Order :id",
      path: "/order/:id",
      permissions: [Permission.ORDER_READ],
      component: <OrderInfo />,
    },
    // Goods
    {
      type: "main",
      icon: FiShoppingBag,
      name: "Goods",
      path: "/goods",
      permissions: [Permission.GOOD_READ],
      component: <Goods />,
    },
    // Purchases
    {
      type: "main",
      icon: FiTruck,
      name: "Purchases",
      path: "/purchases",
      permissions: [Permission.PURCHASE_READ],
      component: <Purchases />,
    },
    // Purchases History
    {
      type: "child",
      name: "Purchases",
      path: "/purchases/history",
      permissions: [Permission.PURCHASE_READ],
      component: <PurchasesHistory />,
    },
    // Suppliers
    {
      type: "main",
      icon: FiGlobe,
      name: "Suppliers",
      path: "/suppliers",
      permissions: [Permission.SUPPLIER_READ],
      component: <Suppliers />,
    },
    // Storage
    {
      type: "main",
      icon: FiPackage,
      name: "Storage",
      path: "/storage",
      permissions: [Permission.STORAGE_READ],
      component: (
        <TableContextProvider<StorageGoodSearchFilter>>
          <Storage />,
        </TableContextProvider>
      ),
    },
    // Storage Good Details
    {
      type: "child",
      name: "Storage Good :id",
      path: "/storage-good/:id",
      permissions: [Permission.STORAGE_READ],
      component: <StorageGoodDetails />,
    },
    // Production Info
    {
      type: "main",
      icon: FiFeather,
      name: "Production Info",
      path: "/production-info",
      permissions: [Permission.PRODUCTION_INFO_READ],
      component: <ProductionInfo />,
    },
    // Employees
    {
      type: "main",
      icon: FiUsers,
      name: "Employees",
      path: "/users",
      permissions: [],
      component: <Users />,
    },
    // Logs
    {
      type: "main",
      icon: FiMap,
      name: "Logs",
      path: "/logs",
      permissions: [],
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
