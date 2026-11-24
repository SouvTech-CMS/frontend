import {
  getEngraverActiveWorkShift,
  sendWorkShiftHeartbeat,
} from "api/engraver/workShift"
import { queryClient } from "api/queryClient"
import { useUserContext } from "context/user"
import { FC, useEffect } from "react"
import { useQuery } from "react-query"
import { WorkShiftWithBreaks } from "type/engraver/workShift"
import { WithId } from "type/withId"

// NOTE: backend closes a shift after 10 minutes without heartbeats
const HEARTBEAT_INTERVAL_IN_MS = 60 * 1000

export const WorkShiftHeartbeat: FC = () => {
  const { currentEngraverId, isUserEngraver } = useUserContext()

  const { data: activeWorkShift } = useQuery<
    WithId<WorkShiftWithBreaks> | undefined
  >(
    ["activeWorkShift", currentEngraverId],
    () => getEngraverActiveWorkShift(currentEngraverId!),
    {
      enabled: !!isUserEngraver && !!currentEngraverId,
    },
  )
  const workShiftId = activeWorkShift?.id

  useEffect(() => {
    if (!isUserEngraver || !currentEngraverId || !workShiftId) {
      return
    }

    const beat = async () => {
      try {
        await sendWorkShiftHeartbeat({
          work_shift_id: workShiftId,
          engraver_id: currentEngraverId,
        })
      } catch {
        // Shift was closed on the server, show its actual state
        queryClient.invalidateQueries(["activeWorkShift", currentEngraverId])
      }
    }

    beat()
    const interval = setInterval(beat, HEARTBEAT_INTERVAL_IN_MS)

    return () => clearInterval(interval)
  }, [isUserEngraver, currentEngraverId, workShiftId])

  return null
}
