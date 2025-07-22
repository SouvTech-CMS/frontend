import {
  Button,
  Flex,
  Modal,
  ModalBody,
  ModalContent,
  ModalFooter,
  ModalHeader,
  ModalOverlay,
  useDisclosure,
} from "@chakra-ui/react"
import { useEngravingContext } from "context/engraving"
import { useUserContext } from "context/user"
import { FC, useCallback, useEffect, useState } from "react"
import {
  useWorkBreakFinishMutation,
  useWorkBreakStartMutation,
} from "service/engraver/workBreak"
import { WorkBreakUpdate } from "type/engraver/workBreak"

// 10 minutes in ms
const TIMEOUT_IN_MS = 10 * 60 * 1000

const EVENTS_TO_TRACK = ["mousemove", "keydown", "scroll", "click"]

let idleTimer: NodeJS.Timeout

export const InactivityModal: FC = () => {
  const [isIdle, setIsIdle] = useState<boolean>(false)

  const { currentEngraverId } = useUserContext()
  const { workShiftId } = useEngravingContext()

  const body: WorkBreakUpdate = {
    engraver_id: currentEngraverId!,
    work_shift_id: workShiftId!,
  }

  const workBreakStartMutation = useWorkBreakStartMutation()
  const workBreakFinishMutation = useWorkBreakFinishMutation()

  const { isOpen, onOpen, onClose } = useDisclosure()

  const resetIdleTimer = useCallback(() => {
    clearTimeout(idleTimer)
    idleTimer = setTimeout(() => {
      setIsIdle(true)
      onOpen()

      workBreakStartMutation.mutate(body)
    }, TIMEOUT_IN_MS)
  }, [onOpen, currentEngraverId, workShiftId])

  const handleUserActivity = useCallback(() => {
    if (isIdle) {
      setIsIdle(false)
    }

    resetIdleTimer()
  }, [isIdle, resetIdleTimer])

  const handleClick = async () => {
    onClose()

    await workBreakFinishMutation.mutateAsync(body)
  }

  useEffect(
    () => {
      // Set up event listeners for user activity
      EVENTS_TO_TRACK.forEach((event) => {
        window.addEventListener(event, handleUserActivity)
      })

      // Initialize the idle timer
      resetIdleTimer()

      return () => {
        // Clean up event listeners and timer
        EVENTS_TO_TRACK.forEach((event) => {
          window.removeEventListener(event, handleUserActivity)
        })
        clearTimeout(idleTimer)
      }
    },
    // eslint-disable-next-line react-hooks/exhaustive-deps
    [handleUserActivity, resetIdleTimer],
  )

  return (
    <Modal isOpen={isOpen} onClose={onClose} isCentered>
      <ModalOverlay />

      <ModalContent>
        <ModalHeader>Hey, are you here?</ModalHeader>

        <ModalBody>
          It seems you away, so we paused all until you come back and continue
          working.
        </ModalBody>

        <ModalFooter>
          <Flex w="full" direction="row" alignItems="center" gap={2}>
            <Button w="full" variant="success" onClick={handleClick}>
              I'm here
            </Button>
          </Flex>
        </ModalFooter>
      </ModalContent>
    </Modal>
  )
}
