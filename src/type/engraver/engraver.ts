import { EngraverDocument } from "type/engraver/engraverDocument"
import { ScheduledBreak } from "type/engraver/scheduledBreak"
import { WorkShiftWithBreaks } from "type/engraver/workShift"
import { User } from "type/user"
import { WithId } from "type/withId"

export type Engraver = {
  user: WithId<User>
  scheduled_breaks: ScheduledBreak[]
  work_shifts: WorkShiftWithBreaks[]
  documents: EngraverDocument[]
  user_id: number
  is_blocked: boolean
  blocked_at?: string
  created_at?: string
}
