export type ScheduledBreak = {
  engraver_id?: number
  started_at: string
  finished_at: string
  // Just for frontend to identify objs
  index?: number
}
