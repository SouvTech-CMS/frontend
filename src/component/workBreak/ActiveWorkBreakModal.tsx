import {
  Button,
  Flex,
  Modal,
  ModalBody,
  ModalContent,
  ModalFooter,
  ModalHeader,
  Text,
} from "@chakra-ui/react"
import { ModalBackgroundBlur } from "component/ModalBackgroundBlur"
import { useEngravingContext } from "context/engraving"
import { useUserContext } from "context/user"
import { FC } from "react"
import { useWorkBreakFinishMutation } from "service/engraver/workBreak"
import { WorkBreakUpdate } from "type/engraver/workBreak"
import { ModalProps } from "type/modalProps"
import { notify } from "util/toasts"

interface ActiveWorkBreakModalProps extends ModalProps {}

export const ActiveWorkBreakModal: FC<ActiveWorkBreakModalProps> = (props) => {
  const { isOpen, onClose } = props

  const { currentEngraverId } = useUserContext()
  const { workShiftId } = useEngravingContext()

  const workBreakFinishMutation = useWorkBreakFinishMutation()

  const isLoading = workBreakFinishMutation.isLoading

  const handleBreakFinish = async () => {
    if (!workShiftId || !currentEngraverId) {
      notify("Cannot finish your break", "error")
      return
    }

    const body: WorkBreakUpdate = {
      work_shift_id: workShiftId,
      engraver_id: currentEngraverId,
    }

    await workBreakFinishMutation.mutateAsync(body)

    onClose()
  }

  return (
    <Modal
      isOpen={isOpen}
      onClose={onClose}
      isCentered
      closeOnOverlayClick={false}
    >
      <ModalBackgroundBlur />

      <ModalContent>
        <ModalHeader>You're on a break</ModalHeader>

        <ModalBody>
          <Text>
            Alright, you can take a break, but don't forget to come back and
            finish your work shift.
          </Text>
        </ModalBody>

        <ModalFooter>
          <Flex
            w="full"
            direction="row"
            justifyContent="center"
            alignItems="center"
            gap={5}
          >
            <Button
              w="full"
              variant="success"
              onClick={handleBreakFinish}
              isLoading={isLoading}
              isDisabled={isLoading}
            >
              I'm here and ready to continue
            </Button>
          </Flex>
        </ModalFooter>
      </ModalContent>
    </Modal>
  )
}
