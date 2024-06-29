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
import { User } from "type/user"
import { WithId } from "type/withId"
import { notify } from "util/toasts"

interface UserDeleteModalProps {
  user: WithId<User>
  isOpen: boolean
  onClose: () => void
}

export const UserDeleteModal: FC<UserDeleteModalProps> = (props) => {
  const { user, isOpen, onClose } = props

  const { currentUser } = useUserContext()

  const userDeleteMutation = useUserDeleteMutation()

  const onUserDeleteConfirm = async () => {
    if (user.username === currentUser?.username) {
      notify("Упс, Вы не можете удалить себя :)", "error")
    }
    onClose()

    await userDeleteMutation.mutateAsync(user.id!)

    notify(
      `Сотрудник ${user.fio || user.username} был успешно удалён`,
      "success"
    )
  }

  return (
    <Modal isOpen={isOpen} onClose={onClose} isCentered>
      <ModalOverlay backdropFilter="blur(10px)" />

      <ModalContent>
        <ModalHeader>Удаление сотрудника</ModalHeader>
        <ModalCloseButton />

        <ModalBody>
          <Text>
            Вы точно хотите удалить сотрудника
            <Text fontWeight="bold">{user.fio}</Text>
          </Text>
        </ModalBody>

        <ModalFooter>
          <Flex gap={5}>
            <Button
              variant="outline"
              colorScheme="red"
              onClick={onUserDeleteConfirm}
            >
              Удалить
            </Button>

            <Button variant="outline" colorScheme="blue" onClick={onClose}>
              Отмена
            </Button>
          </Flex>
        </ModalFooter>
      </ModalContent>
    </Modal>
  )
}
