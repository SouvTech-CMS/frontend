import { axiosClient } from "api/axiosClient"
import { UserCreate, UserUpdate, UserWithRolesAndShops } from "type/user"

export const getCurrentUser = async (): Promise<UserWithRolesAndShops> => {
  const { data: user } = await axiosClient.get("/user/current/")
  return user
}

export const getAllUsers = async (): Promise<UserWithRolesAndShops[]> => {
  const { data: usersList } = await axiosClient.get("/user/")
  return usersList
}

export const createUser = async (
  user: UserCreate
): Promise<UserWithRolesAndShops> => {
  const { data: newUser } = await axiosClient.post("/user/", user)
  return newUser
}

export const updateUser = async (user: UserUpdate) => {
  await axiosClient.put("/user/", user)
}

export const deleteUser = async (userId: number) => {
  await axiosClient.delete(`/user/${userId}`)
}
