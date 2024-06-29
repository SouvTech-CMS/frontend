import { axiosClient } from "api/axiosClient"
import { Role } from "type/role"
import { WithId } from "type/withId"

export const getAllRoles = async (): Promise<WithId<Role>[]> => {
  const { data: rolesList } = await axiosClient.get("/role/")
  return rolesList
}
