import { axiosClient } from "api/axiosClient"
import { User } from "type/user"

export const getCurrentUser = async (): Promise<User> => {
  const { data: user } = await axiosClient.get("/user/current/")
  return user
}

export const getAllUsers = async (): Promise<User[]> => {
  const { data: usersList } = await axiosClient.get("/user/")
  return usersList
}

export const deleteUser = async (userId: number) => {
  await axiosClient.delete(`/user/${userId}`)
}
