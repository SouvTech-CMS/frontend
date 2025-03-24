import { axiosClient } from "api/axiosClient"
import { ScheduledBreak } from "type/engraver/scheduledBreak"
import { WithId } from "type/withId"

export const getEngraverScheduledBreaks = async (
  engraverId: number,
  timezone: string,
): Promise<WithId<ScheduledBreak>> => {
  const { data: scheduledBreaks } = await axiosClient.get(
    `/engraver/scheduled_breaks/${engraverId}/active`,
    {
      params: {
        timezone: timezone,
      },
    },
  )
  return scheduledBreaks
}
