import { Permission } from "constant/permissions"
import { EngravingContextProvider } from "context/engraving"
import { TableContextProvider } from "context/table"
import { TicketsContextProvider } from "context/tickets"
import { Auth } from "page/Auth"
import { AuthorizedDevices } from "page/AuthorizedDevices"
import { ClientDetails } from "page/ClientDetails"
import { Clients } from "page/Clients"
import { Dashboard } from "page/Dashboard"
import { DeliveryDetails } from "page/DeliveryDetails"
import { DetailedReports } from "page/DetailedReports"
import { Engravers } from "page/Engravers"
import { Engraving } from "page/Engraving"
import { Goods } from "page/Goods"
import { Guides } from "page/Guides"
import { Maintenance } from "page/Maintenance"
import { NoAccess } from "page/NoAccess"
import { OrderInfo } from "page/OrderInfo"
import { Orders } from "page/Orders"
import { OrdersForEngraving } from "page/OrdersForEngraving"
import { ProductionInfo } from "page/ProductionInfo"
import { PurchaseDetails } from "page/PurchaseDetails"
import { Purchases } from "page/Purchases"
import { PurchasesHistory } from "page/PurchasesHistory"
import { Roles } from "page/Roles"
import { Shelves } from "page/Shelves"
import { Storage } from "page/Storage"
import { StorageGoodDetails } from "page/StorageGoodDetails"
import { Suppliers } from "page/Suppliers"
import { Tickets } from "page/Tickets"
import { Users } from "page/Users"
import { IconType } from "react-icons"
import {
  FiCpu,
  FiFeather,
  FiFileText,
  FiGlobe,
  FiHash,
  FiHome,
  FiMap,
  FiMessageCircle,
  FiPackage,
  FiPenTool,
  FiPocket,
  FiShoppingBag,
  FiShoppingCart,
  FiTruck,
  FiUser,
  FiUsers,
} from "react-icons/fi"
import { ClientSearchFilter } from "type/client/client"
import { GoodSearchFilter } from "type/order/good"
import { OrderSearchFilter } from "type/order/order"
import { ProductionInfoSearchFilter } from "type/productionInfo/productionInfo"
import { PurchaseHistorySearchFilter } from "type/purchase/purchaseHistory"
import { StorageGoodSearchFilter } from "type/storage/storageGood"
import { getApiBaseUrl, getWebSocketBaseUrl } from "util/urls"

type Route = {
  index?: boolean
  type: "main" | "child" | "side"
  icon: IconType
  name: string
  path: string
  component?: JSX.Element
  //! If 'permissions' param not set (undefined) to route
  //! it available to everybody
  //* If 'permissions' param set as empty list
  //* it available only for Admin
  permissions?: Permission[]
  isDisabled?: boolean
}

export const configuration = {
  version: "v0.8.3",
  isDevEnv: import.meta.env.DEV,
  sidebarItems: [
    //* Main pages
    // Dashboard
    {
      index: true,
      type: "main",
      icon: FiHome,
      name: "Dashboard",
      path: "/",
      component: <Dashboard />,
    },
    // Find Order for Engraving
    {
      type: "main",
      icon: FiPenTool,
      name: "Engraving",
      path: "/engraving",
      permissions: [Permission.PROCESSING_ORDER],
      // TODO: add guide page url
      component: (
        <EngravingContextProvider>
          <OrdersForEngraving />
        </EngravingContextProvider>
      ),
    },
    // Order Engraving
    {
      type: "child",
      name: "Order Engraving :id",
      path: "/engraving/:id",
      permissions: [Permission.PROCESSING_ORDER],
      // TODO: add guide page url
      component: (
        <TicketsContextProvider>
          <EngravingContextProvider>
            <Engraving />
          </EngravingContextProvider>
        </TicketsContextProvider>
      ),
    },
    // Reports
    {
      type: "main",
      icon: FiFileText,
      name: "Reports",
      path: "/reports",
      permissions: [Permission.REPORT_DETAILED],
      component: (
        <DetailedReports guideNotionPageId="6e72f5362da84a639413014b70ee9f72" />
      ),
    },
    // Orders
    {
      type: "main",
      icon: FiShoppingCart,
      name: "Orders",
      path: "/orders",
      permissions: [Permission.ORDER_READ],
      component: (
        <TableContextProvider<OrderSearchFilter>>
          <Orders guideNotionPageId="212db0fd239248e199af5852cdc2a577" />
        </TableContextProvider>
      ),
    },
    // Tickets
    {
      type: "main",
      icon: FiMessageCircle,
      name: "Tickets",
      path: "/tickets",
      permissions: [Permission.TICKET_READ, Permission.TICKET_MESSAGE_READ],
      // TODO: add guide page url
      component: (
        <TicketsContextProvider>
          <Tickets />
        </TicketsContextProvider>
      ),
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
      component: (
        <TableContextProvider<GoodSearchFilter>>
          <Goods guideNotionPageId="439359fa5d974bd8a28d613099f95af1" />
        </TableContextProvider>
      ),
    },
    // Clients
    {
      type: "main",
      icon: FiUser,
      name: "Clients",
      path: "/clients",
      permissions: [Permission.ORDER_READ, Permission.CLIENT_READ],
      // TODO: add guide page url
      component: (
        <TableContextProvider<ClientSearchFilter>>
          <Clients />
        </TableContextProvider>
      ),
    },
    // Client Details
    {
      type: "child",
      name: "Client Details",
      path: "/client/:id",
      permissions: [
        Permission.ORDER_READ,
        Permission.GOOD_READ,
        Permission.CLIENT_READ,
      ],
      // TODO: add guide page url
      component: <ClientDetails />,
    },
    // Purchases
    {
      type: "main",
      icon: FiTruck,
      name: "Purchases",
      path: "/purchases",
      permissions: [Permission.PURCHASE_READ],
      component: (
        <Purchases guideNotionPageId="b3f24fd720134abdb5e58ebd3531db36" />
      ),
    },
    // Purchases History
    {
      type: "child",
      name: "Purchases",
      path: "/purchases/history",
      permissions: [Permission.PURCHASE_READ],
      // TODO: add guide page url
      component: (
        <TableContextProvider<PurchaseHistorySearchFilter>>
          <PurchasesHistory />
        </TableContextProvider>
      ),
    },
    // Purchases Details
    {
      type: "child",
      name: "Purchase Details",
      path: "/purchase/:id",
      permissions: [Permission.PURCHASE_READ],
      component: <PurchaseDetails />,
    },
    // Purchases Details
    {
      type: "child",
      name: "Delivery Details",
      path: "/delivery/:id",
      permissions: [Permission.PURCHASE_READ],
      component: <DeliveryDetails />,
    },
    // Suppliers
    {
      type: "main",
      icon: FiGlobe,
      name: "Suppliers",
      path: "/suppliers",
      permissions: [Permission.SUPPLIER_READ],
      component: (
        <Suppliers guideNotionPageId="ec6080ea1f374005a5e5c1ba1cfdb58a" />
      ),
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
          <Storage guideNotionPageId="3ff859e583d645ea85f630d3f4697cde" />,
        </TableContextProvider>
      ),
    },
    // Storage Good Details
    {
      type: "child",
      name: "Storage Good :id",
      path: "/storage-good/:id",
      permissions: [Permission.STORAGE_READ],
      component: (
        <TableContextProvider<OrderSearchFilter>>
          <StorageGoodDetails />
        </TableContextProvider>
      ),
    },
    // Production Info
    {
      type: "main",
      icon: FiFeather,
      name: "Production Info",
      path: "/production-info",
      permissions: [Permission.PRODUCTION_INFO_READ],
      component: (
        <TableContextProvider<ProductionInfoSearchFilter>>
          <ProductionInfo guideNotionPageId="3120cc3e2bee43e894b2ab32553e3b5e" />
        </TableContextProvider>
      ),
    },
    // Shelves
    {
      type: "main",
      icon: FiHash,
      name: "Shelves",
      path: "/shelves",
      permissions: [Permission.STORAGE_READ, Permission.SHELF_READ],
      // TODO: add guide page url
      component: <Shelves />,
    },
    // Authorized Devices
    {
      type: "main",
      icon: FiCpu,
      name: "Devices",
      path: "/authorized-devices",
      permissions: [Permission.DEVICE_READ],
      // TODO: add guide page url
      component: <AuthorizedDevices />,
    },
    // Engravers
    {
      type: "main",
      icon: FiUsers,
      name: "Engravers",
      path: "/engravers",
      permissions: [Permission.ENGRAVER_READ],
      // TODO: add guide page url
      component: (
        <TableContextProvider<OrderSearchFilter>>
          <Engravers />
        </TableContextProvider>
      ),
    },
    // Employees
    {
      type: "main",
      icon: FiUsers,
      name: "Employees",
      path: "/users",
      permissions: [
        Permission.USER_READ,
        Permission.ROLE_READ,
        Permission.ENGRAVER_READ,
      ],
      component: <Users guideNotionPageId="57b7bd55eab24fd89a2692f2296560c8" />,
    },
    // Roles
    {
      type: "main",
      icon: FiPocket,
      name: "Role Access",
      path: "/roles",
      permissions: [Permission.ROLE_READ],
      // TODO: add guide page url
      component: <Roles />,
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
    // Guide
    {
      type: "child",
      name: "Guide",
      path: "/guide/:id",
      component: <Guides />,
    },
    // Maintenance
    {
      type: "side",
      name: "Maintenance",
      path: "/maintenance",
      component: <Maintenance />,
    },
  ] as Route[],
  urls: {
    apiBaseUrl: getApiBaseUrl(),
    webSocketBaseUrl: getWebSocketBaseUrl(),
  },
}
