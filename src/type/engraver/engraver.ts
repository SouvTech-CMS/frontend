import { EngraverDocument } from "type/engraver/engraverDocument"
import { ScheduledBreak } from "type/engraver/scheduledBreak"
import { WorkShiftWithBreaks } from "type/engraver/workShift"

export type Engraver = {
  user_id: number
  is_blocked: boolean
  created_at: string
  blocked_at: string
  user: {
    id: number
    fio: string
    username: string
    password: string
    salary: number
    bot_user_id: number
    email: string
    phone: string
  }
  scheduled_breaks: ScheduledBreak[]
  work_shifts: WorkShiftWithBreaks[]
  documents: EngraverDocument[]
}
