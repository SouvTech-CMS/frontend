import { Engraver } from "type/engraver/engraver"
import { RoleWithPermissions } from "type/role/role"
import { Shop } from "type/shop"
import { WithId } from "type/withId"

export type User = {
  username: string
  password?: string
  fio?: string
  salary?: number
  bot_user_id?: number
  email?: string
  phone?: string
}

export type UserWithRolesAndShops = WithId<User> & {
  roles: RoleWithPermissions[]
  shops: WithId<Shop>[]
  engraver?: WithId<Engraver>
}

export type UserWithShops = User & {
  shops: WithId<Shop>[]
}

export type UserWithRolesIdsAndShopsIds = {
  user: WithId<User>
  roles_with_permissions: number[]
  shops: number[]
}

export type UserCreate = {
  user: User & { password: string }
  roles_list: number[]
  shops_list: number[]
}

export type UserUpdate = {
  user: WithId<User> & { password?: string }
  roles_list: number[]
  shops_list: number[]
}
