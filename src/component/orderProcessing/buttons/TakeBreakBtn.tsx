import { Button, ButtonProps, useDisclosure } from "@chakra-ui/react"
import { ActiveWorkBreakModal } from "component/workBreak/ActiveWorkBreakModal"
import { useEngravingContext } from "context/engraving"
import { useUserContext } from "context/user"
import { FC } from "react"
import { useWorkBreakStartMutation } from "service/engraver/workBreak"
import { WorkBreakUpdate } from "type/engraver/workBreak"
import { notify } from "util/toasts"

interface TakeBreakBtnProps extends ButtonProps {}

export const TakeBreakBtn: FC<TakeBreakBtnProps> = (props) => {
  const { engraverId } = useUserContext()
  const { workShiftId } = useEngravingContext()

  const workBreakStartMutation = useWorkBreakStartMutation()

  const isLoading = workBreakStartMutation.isLoading

  const handleBreakStart = async () => {
    if (!workShiftId || !engraverId) {
      notify("Cannot start your break", "error")
      return
    }

    const body: WorkBreakUpdate = {
      work_shift_id: workShiftId,
      engraver_id: engraverId,
    }

    await workBreakStartMutation.mutateAsync(body)
  }

  const handleClick = async () => {
    onActiveWorkBreakModalOpen()
    await handleBreakStart()
  }

  const {
    isOpen: isActiveWorkBreakModalOpen,
    onOpen: onActiveWorkBreakModalOpen,
    onClose: onActiveWorkBreakModalClose,
  } = useDisclosure()

  return (
    <>
      <Button onClick={handleClick} isLoading={isLoading} {...props}>
        Take a Break
      </Button>

      <ActiveWorkBreakModal
        isOpen={isActiveWorkBreakModalOpen}
        onClose={onActiveWorkBreakModalClose}
      />
    </>
  )
}
