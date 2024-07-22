import { WithId } from "type/withId"

export type Notification = {
  user_id: number
  role_id: number
  message: string
  obj_name: string
  obj_id: number
  is_read: boolean
}

export type UserRoleNotifications = {
  user_notifications?: WithId<Notification>[]
  role_notifications?: WithId<Notification>[]
}
