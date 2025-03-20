import { Button, Flex, useDisclosure } from "@chakra-ui/react"
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
      <Flex
        w="full"
        direction="column"
        justifyContent="center"
        alignItems="flex-end"
        mt="auto"
      >
        <Button variant="danger" onClick={onWorkShiftFinishModalOpen}>
          Finish Work Shift
        </Button>
      </Flex>

      <WorkShiftFinishConfirmModal
        isOpen={isWorkShiftFinishModalOpen}
        onClose={onWorkShiftFinishModalClose}
      />
    </>
  )
}
