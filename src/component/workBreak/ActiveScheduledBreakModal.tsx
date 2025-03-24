import {
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
import { ScheduledBreak } from "type/engraver/scheduledBreak"
import { ModalProps } from "type/modalProps"
import { WithId } from "type/withId"
import { formatTime } from "util/formatting"

interface ActiveScheduledBreakModalProps extends ModalProps {
  scheduledBreak: WithId<ScheduledBreak>
}

export const ActiveScheduledBreakModal: FC<ActiveScheduledBreakModalProps> = (
  props,
) => {
  const { scheduledBreak, isOpen, onClose } = props

  const startedAt = formatTime(scheduledBreak.started_at)
  const finishedAt = formatTime(scheduledBreak.finished_at)
  // const breakTime =
  //   !!startedAt && !!finishedAt
  //     ? {
  //         hours: Math.floor(
  //           (finishedAt.getTime() - startedAt.getTime()) / (1000 * 60 * 60),
  //         ),
  //         minutes: Math.floor(
  //           ((finishedAt.getTime() - startedAt.getTime()) % (1000 * 60 * 60)) /
  //             (1000 * 60),
  //         ),
  //       }
  //     : undefined

  return (
    <Modal
      isOpen={isOpen}
      onClose={onClose}
      isCentered
      closeOnOverlayClick={false}
    >
      <ModalBackgroundBlur />

      <ModalContent>
        <ModalHeader>Time to take a Break</ModalHeader>

        <ModalBody>
          <Flex w="full" direction="column" gap={2}>
            <Text>
              Your workshop admin decided that you should take a break now.
            </Text>

            <Text fontWeight="medium">
              Break time: {startedAt} - {finishedAt}
              {/* ({breakTime}) */}
            </Text>
          </Flex>
        </ModalBody>

        <ModalFooter py={1}></ModalFooter>
      </ModalContent>
    </Modal>
  )
}
