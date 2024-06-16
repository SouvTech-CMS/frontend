import { Permission } from "type/permission"
import { Role } from "type/role"

export type User = {
  id: number
  username: string
  salary: string
  bot_user_id: number
  e_mail: string
  phone_number: string
  roles_with_permissions: RoleWithPermissions[]
}

export type RoleWithPermissions = {
  role: Role
  permissions: Permission[]
}
