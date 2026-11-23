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
import { FC } from "react"
import { useWorkBreakFinishMutation } from "service/engraver/workBreak"

interface ActiveWorkBreakModalProps {
  engraverId: number
  workShiftId: number
  isSystem?: boolean
}

export const ActiveWorkBreakModal: FC<ActiveWorkBreakModalProps> = (props) => {
  const { engraverId, workShiftId, isSystem } = props

  const workBreakFinishMutation = useWorkBreakFinishMutation()

  const isLoading = workBreakFinishMutation.isLoading

  const handleBreakFinish = () => {
    workBreakFinishMutation.mutate({
      work_shift_id: workShiftId,
      engraver_id: engraverId,
    })
  }

  return (
    <Modal
      isOpen
      onClose={() => undefined}
      isCentered
      closeOnOverlayClick={false}
      closeOnEsc={false}
    >
      <ModalBackgroundBlur />

      <ModalContent>
        <ModalHeader>
          {isSystem ? "Hey, are you here?" : "You're on a break"}
        </ModalHeader>

        <ModalBody>
          <Text>
            {isSystem
              ? "We started a break while you were away."
              : "Alright, you can take a break, but don't forget to come back and finish your work shift."}
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
              {isSystem ? "I'm here" : "I'm here and ready to continue"}
            </Button>
          </Flex>
        </ModalFooter>
      </ModalContent>
    </Modal>
  )
}
