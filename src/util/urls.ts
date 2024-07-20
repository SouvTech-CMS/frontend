export const getApiBaseUrl = () => {
  const apiBaseUrl = process.env.REACT_APP_API_BASE_URL

  if (!apiBaseUrl) {
    throw new Error("REACT_APP_API_BASE_URL is not defined")
  }

  return apiBaseUrl
}

export const getFileUrl = (fileName: string) => {
  const apiBaseUrl = getApiBaseUrl()

  return `${apiBaseUrl}/static/${fileName}`
}

export const getEtsyOrderUrl = (orderId: string) => {
  const orderUrl = `https://www.etsy.com/your/orders/sold/completed?search_query=${orderId}&order_id=${orderId}`
  return orderUrl
}
