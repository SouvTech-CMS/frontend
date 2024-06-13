import { Reports } from "page/Reports"
import { FiBox, FiFileText, FiHome, FiMap, FiUsers } from "react-icons/fi"

export const configuration = {
  isDevEnv: process.env.NODE_ENV === "development",
  sidebarItems: [
    {
      index: true,
      icon: FiHome,
      name: "Главная",
      path: "/",
    },
    {
      icon: FiFileText,
      name: "Отчёты",
      path: "/reports",
      component: <Reports />,
    },
    {
      icon: FiBox,
      name: "Склад",
      path: "/storage",
    },
    {
      icon: FiUsers,
      name: "Пользователи",
      path: "/users",
    },
    {
      icon: FiMap,
      name: "Логи",
      path: "/logs",
    },
    // {
    //   type: "side",
    //   name: "Авторизация",
    //   path: "/auth",
    //   component: <Auth />,
    // },
    // {
    //   type: "side",
    //   name: "NotFound",
    //   path: "/*",
    //   component: <NotFound />,
    // },
  ],
}
