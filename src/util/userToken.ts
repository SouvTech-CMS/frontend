export const getUserToken = () => {
  return localStorage.getItem("token")
}

export const setUserToken = (token: string) => {
  localStorage.setItem("token", token)
}

export const clearUserToken = () => {
  localStorage.removeItem("token")
}
