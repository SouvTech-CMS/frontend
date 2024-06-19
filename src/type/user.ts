import { Permission } from "type/permission"
import { Role } from "type/role"
import { Shop } from "type/shop"

export type User = {
  id?: number
  username: string
  password?: string
  fio?: string
  salary?: number
  bot_user_id?: number
  email?: string
  phone?: string
}

export type UserWithRolesAndShops = {
  user: User
  roles_with_permissions: RoleWithPermissions[]
  shops: Shop[]
}

export type UserWithRolesIdsAndShopsIds = {
  user: User
  roles_with_permissions: number[]
  shops: number[]
}

export type UserCreateOrUpdate = {
  user: User
  roles_list: number[]
  shops_list: number[]
}

export type RoleWithPermissions = {
  role: Role
  permissions: Permission[]
}
