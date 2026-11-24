import { FC, useEffect } from "react"
import { useWorkBreakStartMutation } from "service/engraver/workBreak"

const TIMEOUT_IN_MS = 10 * 60 * 1000
const EVENTS_TO_TRACK = ["mousemove", "keydown", "scroll", "click"]

interface InactivityBreakTimerProps {
  engraverId: number
  workShiftId: number
}

export const InactivityBreakTimer: FC<InactivityBreakTimerProps> = ({
  engraverId,
  workShiftId,
}) => {
  const { mutate } = useWorkBreakStartMutation()

  useEffect(() => {
    let timer: ReturnType<typeof setTimeout>

    const reset = () => {
      clearTimeout(timer)
      timer = setTimeout(() => {
        mutate({
          engraver_id: engraverId,
          work_shift_id: workShiftId,
          is_system: true,
        })
      }, TIMEOUT_IN_MS)
    }

    EVENTS_TO_TRACK.forEach((event) => window.addEventListener(event, reset))
    reset()

    return () => {
      EVENTS_TO_TRACK.forEach((event) =>
        window.removeEventListener(event, reset),
      )
      clearTimeout(timer)
    }
  }, [engraverId, workShiftId, mutate])

  return null
}
