import { ScheduledBreak } from "type/engraver/scheduledBreak"
import { WorkShiftWithBreaks } from "type/engraver/workShift"
import { WithId } from "type/withId"

export type EngraverWorkTimeAnalyticsRequestBody = {
  shops?: number[]
  start_date?: string
  end_date?: string
  engraver_id: number
}

export type EngraverWorkTimeAnalyticsItem = WithId<WorkShiftWithBreaks> & {
  scheduled_breaks: WithId<ScheduledBreak>[]
  total_time: number
}

export type EngraverWorkTimeAnalyticsResponse = EngraverWorkTimeAnalyticsItem[]
