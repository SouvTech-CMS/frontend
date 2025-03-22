import { axiosClient } from "api/axiosClient"
import { ScheduledBreak } from "type/engraver/scheduledBreak"
import { WithId } from "type/withId"

export const getEngraverScheduledBreaks = async (
  engraverId: number,
): Promise<WithId<ScheduledBreak>> => {
  const { data: scheduledBreaks } = await axiosClient.get(
    `/engraver/scheduled_breaks/${engraverId}/active`,
  )
  return scheduledBreaks
}
