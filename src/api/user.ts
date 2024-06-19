import { axiosClient } from "api/axiosClient"
import { UserCreateOrUpdate, UserWithRolesAndShops } from "type/user"

export const getCurrentUser = async (): Promise<UserWithRolesAndShops> => {
  const { data: user } = await axiosClient.get("/user/current/")
  return user
}

export const getAllUsers = async (): Promise<UserWithRolesAndShops[]> => {
  const { data: usersList } = await axiosClient.get("/user/")
  return usersList
}

export const createUser = async (user: UserCreateOrUpdate) => {
  await axiosClient.post("/user/", user)
}

export const updateUser = async (user: UserCreateOrUpdate) => {
  await axiosClient.put("/user/", user)
}

export const deleteUser = async (userId: number) => {
  await axiosClient.delete(`/user/${userId}`)
}
