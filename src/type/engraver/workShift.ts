import { WorkBreak } from "type/engraver/workBreak"
import { WithId } from "type/withId"

export type WorkShift = {
  engraver_id: number
  started_at: string
  finished_at?: string
}

export type WorkShiftWithBreaks = WorkShift & {
  work_breaks: WithId<WorkBreak>[]
}
