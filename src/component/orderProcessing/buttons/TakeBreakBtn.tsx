import { Button, ButtonProps } from "@chakra-ui/react"
import { useEngravingContext } from "context/engraving"
import { useUserContext } from "context/user"
import { FC } from "react"
import { useWorkBreakStartMutation } from "service/engraver/workBreak"
import { WorkBreakUpdate } from "type/engraver/workBreak"
import { notify } from "util/toasts"

interface TakeBreakBtnProps extends ButtonProps {}

export const TakeBreakBtn: FC<TakeBreakBtnProps> = (props) => {
  const { currentEngraverId } = useUserContext()
  const { workShiftId } = useEngravingContext()

  const workBreakStartMutation = useWorkBreakStartMutation()

  const isLoading = workBreakStartMutation.isLoading

  const handleBreakStart = () => {
    if (!workShiftId || !currentEngraverId) {
      notify("Cannot start your break", "error")
      return
    }

    const body: WorkBreakUpdate = {
      work_shift_id: workShiftId,
      engraver_id: currentEngraverId,
    }

    workBreakStartMutation.mutate(body)
  }

  return (
    <Button onClick={handleBreakStart} isLoading={isLoading} {...props}>
      Take a Break
    </Button>
  )
}
