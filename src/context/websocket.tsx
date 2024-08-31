import { queryClient } from "api/queryClient"
import { createContext, useContext, useEffect } from "react"
import { FCC } from "type/fcc"
import { getWebSocketBaseUrl } from "util/urls"

interface WebSocketContextProps {
  // sendText: (message: string) => void
}

export const WebSocketContext = createContext<
  WebSocketContextProps | undefined
>(undefined)

const webSocketUrl = getWebSocketBaseUrl()

export const WebSocketContextProvider: FCC = (props) => {
  const { children } = props

  useEffect(
    () => {
      const ws = new WebSocket(webSocketUrl)

      ws.onmessage = (event) => {
        const message = event.data

        switch (message) {
          case "purchase":
          case "purchase_delivery":
            queryClient.invalidateQueries("purchasesList")
            queryClient.invalidateQueries("purchaseDeliveriesList")
            break
          case "supplier":
          case "supplier_manager":
            queryClient.invalidateQueries("suppliersWithManagersList")
            break
          case "file":
            queryClient.invalidateQueries("purchasesList")
            queryClient.invalidateQueries("purchaseDeliveriesList")
            break
          case "comment":
            queryClient.invalidateQueries()
            break
          case "order":
            queryClient.invalidateQueries("ordersResponse")
            break
          case "good":
            queryClient.invalidateQueries("goodsResponse")
            break
          case "user":
          case "role":
            queryClient.invalidateQueries("currentUser")
            queryClient.invalidateQueries("usersList")
            break
          case "storage":
          case "storage_good":
            queryClient.invalidateQueries("purchaseDeliveriesList")
            queryClient.invalidateQueries("storageGoodsList")
            queryClient.invalidateQueries("storageGoodsCount")
            queryClient.invalidateQueries("storageActualInfo")
            break
          case "production_info":
            queryClient.invalidateQueries("goodsWithProductionInfoList")
            break
        }
      }

      return () => {
        ws.close()
      }
    },
    // eslint-disable-next-line react-hooks/exhaustive-deps
    [queryClient],
  )

  return (
    <WebSocketContext.Provider
      value={
        {
          // sendText,
        }
      }
    >
      {children}
    </WebSocketContext.Provider>
  )
}

export const useWebSocketContext = () => {
  const context = useContext(WebSocketContext)

  if (!context) {
    throw new Error(
      "useWebSocketContext must be used in WebSocketContextProvider",
    )
  }

  return context
}