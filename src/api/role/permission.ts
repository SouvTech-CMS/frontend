import { axiosClient } from "api/axiosClient"
import { Permission } from "type/role/permission"
import { WithId } from "type/withId"

export const getAllPermissions = async (): Promise<WithId<Permission>[]> => {
  const { data: permissionsList } = await axiosClient.get("/permission/")
  return permissionsList
}
