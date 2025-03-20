import {
  Button,
  Flex,
  Modal,
  ModalBody,
  ModalCloseButton,
  ModalContent,
  ModalFooter,
  ModalHeader,
  Text,
} from "@chakra-ui/react"
import { ModalBackgroundBlur } from "component/ModalBackgroundBlur"
import { useEngravingContext } from "context/engraving"
import { useUserContext } from "context/user"
import { FC } from "react"
import { useWorkShiftUpdateMutation } from "service/engraver/workShift"
import { WorkShift } from "type/engraver/workShift"
import { ModalProps } from "type/modalProps"
import { WithId } from "type/withId"
import { notify } from "util/toasts"

interface WorkShiftFinishConfirmModalProps extends ModalProps {}

export const WorkShiftFinishConfirmModal: FC<
  WorkShiftFinishConfirmModalProps
> = (props) => {
  const { isOpen, onClose } = props

  const { activeWorkShift, isActiveWorkShiftLoading } = useEngravingContext()
  const { currentEngraver, isLoadingCurrentUser } = useUserContext()

  const engraverId = currentEngraver?.id

  const workShiftUpdateMutation = useWorkShiftUpdateMutation()

  const isLoading = isLoadingCurrentUser || isActiveWorkShiftLoading

  const onConfirm = async () => {
    if (!activeWorkShift || !engraverId) {
      notify("Cannot load current work shift", "error")
      return
    }

    const { work_breaks, ...workShift } = activeWorkShift
    const now = new Date()
    const body: WithId<WorkShift> = {
      ...workShift,
      finished_at: now.toISOString(),
    }

    await workShiftUpdateMutation.mutateAsync(body)
  }

  return (
    <Modal isOpen={isOpen} onClose={onClose} isCentered>
      <ModalBackgroundBlur />

      <ModalContent>
        <ModalHeader>Finish Work Shift</ModalHeader>
        <ModalCloseButton />

        <ModalBody>
          <Text>
            Are you sure you want to finish your current work shift for today?
          </Text>
        </ModalBody>

        <ModalFooter>
          <Flex gap={5}>
            <Button
              variant="danger"
              onClick={onConfirm}
              isLoading={isLoading}
              isDisabled={isLoading}
            >
              Finish
            </Button>

            <Button
              variant="secondary"
              onClick={onClose}
              isLoading={isLoading}
              isDisabled={isLoading}
            >
              Cancel
            </Button>
          </Flex>
        </ModalFooter>
      </ModalContent>
    </Modal>
  )
}
