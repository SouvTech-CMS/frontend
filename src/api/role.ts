import { axiosClient } from "api/axiosClient"
import { Role } from "type/role"

export const getAllRoles = async (): Promise<Role[]> => {
  const { data: rolesList } = await axiosClient.get("/role/")
  return rolesList
}
