import { axiosClient } from "api/axiosClient"
import { RoleCreate, RoleUpdate, RoleWithPermissions } from "type/role/role"

export const getAllRoles = async (): Promise<RoleWithPermissions[]> => {
  const { data: rolesList } = await axiosClient.get("/role/list/")
  return rolesList
}

export const createRole = async (
  role: RoleCreate,
): Promise<RoleWithPermissions> => {
  const { data: newRole } = await axiosClient.post("/role/", role)
  return newRole
}

export const updateRole = async (role: RoleUpdate) => {
  await axiosClient.put("/role/", role)
}

export const deleteRole = async (roleId: number) => {
  await axiosClient.delete(`/role/${roleId}`)
}
