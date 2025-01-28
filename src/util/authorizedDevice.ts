export const getDeviceToken = () => {
  return localStorage.getItem("device-token")
}

export const setDeviceToken = (token: string) => {
  localStorage.setItem("device-token", token)
}

export const clearDeviceToken = () => {
  localStorage.removeItem("device-token")
}
