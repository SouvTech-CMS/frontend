export type WorkBreak = {
  work_shift_id: number
  started_at: string
  finished_at?: string
  is_system?: boolean
}

export type WorkBreakUpdate = {
  work_shift_id: number
  engraver_id: number
}
