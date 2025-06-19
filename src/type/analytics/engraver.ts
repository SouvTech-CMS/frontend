import { EngraverWithUser } from "type/engraver/engraver"
import { ProcessingOrderWithOrder } from "type/engraver/processingOrder"
import { ScheduledBreak } from "type/engraver/scheduledBreak"
import { WorkShiftWithBreaks } from "type/engraver/workShift"
import { StorageGoodDefectWithStorageGood } from "type/storage/storageGoodDefect"
import { WithId } from "type/withId"

export type EngraverWorkTimeAnalyticsRequestBody = {
  start_date?: string
  end_date?: string
  engraver_id: number
  timezone: string
}

export type EngraverWorkTimeAnalyticsItem = WithId<WorkShiftWithBreaks> & {
  scheduled_breaks: WithId<ScheduledBreak>[]
  total_time: number
}

export type EngraverWorkTimeAnalyticsResponse = EngraverWorkTimeAnalyticsItem[]

export type EngraversProductivityAnalyticsRequestBody = {
  shops?: number[]
  start_date?: string
  end_date?: string
  engravers_ids: number[]
}

export type EngraverProductivityAnalyticsItem = {
  engraver: WithId<EngraverWithUser>
  processed_orders: WithId<ProcessingOrderWithOrder>[]
  storage_goods_defects: WithId<StorageGoodDefectWithStorageGood>[]
  average_processing_time?: number
}

export type EngraverProductivityAnalyticsResponse =
  EngraverProductivityAnalyticsItem[]
