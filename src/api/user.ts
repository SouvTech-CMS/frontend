import { axiosClient } from "api/axiosClient"
import { User } from "type/user"

export const getCurrentUser = async (): Promise<User> => {
  const { data: user } = await axiosClient.get("/user/current/")
  return user
}
