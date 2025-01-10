import { EngraverDocument } from "type/engraver/engraverDocument"
import { ScheduledBreak } from "type/engraver/scheduledBreak"
import { WorkShiftWithBreaks } from "type/engraver/workShift"
import { User, UserWithShops } from "type/user"
import { WithId } from "type/withId"

export type Engraver = {
  user: WithId<UserWithShops>
  scheduled_breaks: ScheduledBreak[]
  work_shifts: WorkShiftWithBreaks[]
  documents: EngraverDocument[]
  user_id?: number
  is_blocked?: boolean
  blocked_at?: string
  created_at?: string
}

export type EngraverCreate = {
  user: User & { password: string }
  engraver?: Omit<
    Engraver,
    "user" | "scheduled_breaks" | "work_shifts" | "documents"
  >
  scheduled_breaks: ScheduledBreak[]
  shops_ids_list: number[]
}

export type EngraverUpdate = {
  user?: WithId<User> & { password?: string }
  engraver?: Omit<
    WithId<Engraver>,
    "user" | "scheduled_breaks" | "work_shifts" | "documents"
  >
  scheduled_breaks?: ScheduledBreak[]
  shops_ids_list?: number[]
}
