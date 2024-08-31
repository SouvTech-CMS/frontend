export const getApiBaseUrl = () => {
  const baseUrl = process.env.REACT_APP_API_BASE_URL

  if (!baseUrl) {
    throw new Error("REACT_APP_API_BASE_URL is not defined")
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
  const baseUrl = process.env.REACT_APP_WEBSOCKET_BASE_URL

  if (!baseUrl) {
    // eslint-disable-next-line no-console
    console.error("REACT_APP_WEBSOCKET_BASE_URL is not defined")
  }

  return baseUrl || ""
}
