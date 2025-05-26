import { EngraverDocument } from "type/engraver/engraverDocument"
import { ProcessingOrder } from "type/engraver/processingOrder"
import { ScheduledBreak } from "type/engraver/scheduledBreak"
import { WorkShiftWithBreaks } from "type/engraver/workShift"
import { User, UserWithShops } from "type/user"
import { WithId } from "type/withId"

export type Engraver = {
  user: WithId<UserWithShops>
  scheduled_breaks: WithId<ScheduledBreak>[]
  work_shifts: WithId<WorkShiftWithBreaks>[]
  documents: WithId<EngraverDocument>[]
  processing_orders?: WithId<ProcessingOrder>[]
  user_id?: number
  is_blocked?: boolean
  blocked_at?: string
  created_at?: string
}

export type EngraverWithUser = Omit<
  Engraver,
  "scheduled_breaks" | "work_shifts" | "documents" | "processing_orders"
>

export type EngraverCreate = {
  user: User & { password: string }
  engraver?: Omit<
    Engraver,
    "user" | "scheduled_breaks" | "work_shifts" | "documents"
  >
  scheduled_breaks: ScheduledBreak[]
  shops_ids_list: number[]
  user_timezone: string
}

export type EngraverUpdate = {
  user?: WithId<User> & { password?: string }
  engraver?: Omit<
    WithId<Engraver>,
    "user" | "scheduled_breaks" | "work_shifts" | "documents"
  >
  scheduled_breaks?: ScheduledBreak[]
  shops_ids_list?: number[]
  user_timezone: string
}
