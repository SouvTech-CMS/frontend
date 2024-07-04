import {
  Button,
  Flex,
  Modal,
  ModalBody,
  ModalCloseButton,
  ModalContent,
  ModalFooter,
  ModalHeader,
  ModalOverlay,
  Text,
} from "@chakra-ui/react"
import { useUserContext } from "context/user"
import { FC } from "react"
import { useUserDeleteMutation } from "service/user"
import { ModalProps } from "type/modalProps"
import { User } from "type/user"
import { WithId } from "type/withId"
import { notify } from "util/toasts"

interface UserDeleteModalProps extends ModalProps {
  user: WithId<User>
}

export const UserDeleteModal: FC<UserDeleteModalProps> = (props) => {
  const { user, isOpen, onClose } = props

  const { currentUser } = useUserContext()

  const userDeleteMutation = useUserDeleteMutation()

  const onUserDeleteConfirm = async () => {
    if (user.username === currentUser?.username) {
      notify("Oops, You can't delete yourself :)", "error")
      return
    }

    await userDeleteMutation.mutateAsync(user.id!)

    notify(
      `Employee ${user.fio || user.username} was successfully deleted`,
      "success"
    )
    onClose()
  }

  return (
    <Modal isOpen={isOpen} onClose={onClose} isCentered>
      <ModalOverlay backdropFilter="blur(10px)" />

      <ModalContent>
        <ModalHeader>Delete Employee</ModalHeader>
        <ModalCloseButton />

        <ModalBody>
          <Text>Are you sure you want to delete the employee</Text>
          <Text fontWeight="bold">{user.fio}</Text>
        </ModalBody>

        <ModalFooter>
          <Flex gap={5}>
            <Button
              variant="outline"
              colorScheme="red"
              onClick={onUserDeleteConfirm}
            >
              Delete
            </Button>

            <Button variant="outline" colorScheme="blue" onClick={onClose}>
              Cancel
            </Button>
          </Flex>
        </ModalFooter>
      </ModalContent>
    </Modal>
  )
}
