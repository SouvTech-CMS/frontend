import { Button, useDisclosure } from "@chakra-ui/react"
import { WorkShiftFinishConfirmModal } from "component/workShift/WorkShiftFinishConfirmModal"
import { FC } from "react"

export const WorkShiftFinishBtn: FC = () => {
  const {
    isOpen: isWorkShiftFinishModalOpen,
    onOpen: onWorkShiftFinishModalOpen,
    onClose: onWorkShiftFinishModalClose,
  } = useDisclosure()

  return (
    <>
      <Button variant="danger" onClick={onWorkShiftFinishModalOpen}>
        Finish Work Shift
      </Button>

      <WorkShiftFinishConfirmModal
        isOpen={isWorkShiftFinishModalOpen}
        onClose={onWorkShiftFinishModalClose}
      />
    </>
  )
}
