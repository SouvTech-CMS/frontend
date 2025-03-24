import { axiosClient } from "api/axiosClient"
import { WorkBreak, WorkBreakUpdate } from "type/engraver/workBreak"
import { WithId } from "type/withId"

export const startWorkBreak = async (
  workBreak: WorkBreakUpdate,
): Promise<WithId<WorkBreak>> => {
  const { data: newWorkBreak } = await axiosClient.post(
    "/engraver/work_break/start",
    workBreak,
  )
  return newWorkBreak
}

export const finishWorkBreak = async (workBreak: WorkBreakUpdate) => {
  await axiosClient.put("/engraver/work_break/finish", workBreak)
}
