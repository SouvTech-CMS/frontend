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
import { FC } from "react"
import { useEngraverBlockMutation } from "service/engraver/engraver"
import { Engraver } from "type/engraver/engraver"
import { ModalProps } from "type/modalProps"
import { WithId } from "type/withId"
import { notify } from "util/toasts"

interface EngraverBlockModalProps extends ModalProps {
  engraver: WithId<Engraver>
}

export const EngraverBlockModal: FC<EngraverBlockModalProps> = (props) => {
  const { engraver, isOpen, onClose } = props

  const isEngraverWasBlocked = engraver.is_blocked

  const engraverId = engraver.id
  const engraverUser = engraver.user
  const engraverName = engraverUser.fio || engraverUser.username

  const engraverBlockMutation = useEngraverBlockMutation()

  const isLoading = engraverBlockMutation.isLoading

  const onEngraverBlockConfirm = async () => {
    await engraverBlockMutation.mutateAsync(engraverId)

    notify(
      `Engraver ${engraverName} was ${
        isEngraverWasBlocked ? "unblocked" : "blocked"
      } successfully`,
      "success",
    )

    onClose()
  }

  return (
    <Modal isOpen={isOpen} onClose={onClose} isCentered>
      <ModalBackgroundBlur />

      <ModalContent>
        <ModalHeader>
          {isEngraverWasBlocked ? "Unblock" : "Block"} Engraver
        </ModalHeader>
        <ModalCloseButton />

        <ModalBody>
          <Text>
            Are you sure you want to
            {isEngraverWasBlocked ? " unblock" : " block"} the engraver
          </Text>
          <Text fontWeight="bold">{engraverName}</Text>
        </ModalBody>

        <ModalFooter>
          <Flex gap={5}>
            <Button
              variant="danger"
              onClick={onEngraverBlockConfirm}
              isLoading={isLoading}
              isDisabled={isLoading}
            >
              {isEngraverWasBlocked ? "Unblock" : "Block"}
            </Button>

            <Button variant="secondary" onClick={onClose}>
              Cancel
            </Button>
          </Flex>
        </ModalFooter>
      </ModalContent>
    </Modal>
  )
}
