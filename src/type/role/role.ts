import { Permission } from "type/role/permission"
import { WithId } from "type/withId"

export type Role = {
  name: string
  description?: string
  default_salary?: number
}

export type RoleWithPermissions = WithId<Role> & {
  permissions: WithId<Permission>[]
}

export type RoleCreate = {
  role: Role
  permissions_list: number[]
}

export type RoleUpdate = {
  role: WithId<Role>
  permissions_list: number[]
}
