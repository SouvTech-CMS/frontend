export const getUserToken = () => {
  return localStorage.getItem("token")
}

export const setUserToken = (token: string) => {
  localStorage.setItem("token", token)
}

export const USER_TOKEN_EXPIRED_EVENT = "user-token-expired"

export const clearUserToken = () => {
  localStorage.removeItem("token")
}
