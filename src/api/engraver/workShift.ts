import { axiosClient } from "api/axiosClient"
import { WorkShift, WorkShiftWithBreaks } from "type/engraver/workShift"
import { WithId } from "type/withId"

export const getEngraverActiveWorkShift = async (
  engraverId: number,
): Promise<WithId<WorkShiftWithBreaks> | undefined> => {
  const { data: activeWorkShift } = await axiosClient.get(
    `/engraver/work_shift/active/${engraverId}`,
  )
  return activeWorkShift
}

export const createWorkShift = async (
  workShift: WorkShift,
): Promise<WithId<WorkShift>> => {
  const { data: newWorkShift } = await axiosClient.post(
    "/engraver/work_shift/",
    workShift,
  )
  return newWorkShift
}

export const updateWorkShift = async (workShift: WithId<WorkShift>) => {
  await axiosClient.put("/engraver/work_shift/", workShift)
}
