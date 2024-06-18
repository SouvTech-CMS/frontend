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
  roles_with_permissions: RoleWithPermissions[]
  shops: Shop[]
}

export type UserCreate = {
  username: string
  password?: string
  fio: string
  salary: number
  email: string
  phone: string
}

export type RoleWithPermissions = {
  role: Role
  permissions: Permission[]
}
