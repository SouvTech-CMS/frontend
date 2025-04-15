export const getApiBaseUrl = () => {
  const baseUrl = import.meta.env.VITE_API_BASE_URL

  if (!baseUrl) {
    throw new Error("API_BASE_URL is not defined")
  }

  return baseUrl
}

export const getFileUrl = (fileName: string) => {
  const apiBaseUrl = getApiBaseUrl()

  return `${apiBaseUrl}/static/${fileName}`
}

export const getEtsyOrderUrl = (orderId: string) => {
  const orderUrl = `https://www.etsy.com/your/orders/sold/completed?search_query=${orderId}&order_id=${orderId}`
  return orderUrl
}

export const getWebSocketBaseUrl = () => {
  const baseUrl = import.meta.env.VITE_WEBSOCKET_BASE_URL

  if (!baseUrl) {
    // eslint-disable-next-line no-console
    console.error("WEBSOCKET_BASE_URL is not defined")
  }

  return baseUrl || ""
}
