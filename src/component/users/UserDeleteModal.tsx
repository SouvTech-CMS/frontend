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
import { Bounce, ToastOptions, toast } from "react-toastify"
import { useUserDeleteMutation } from "service/user"
import { User } from "type/user"

interface UserDeleteModalProps {
  user: User
  isOpen: boolean
  onClose: () => void
}

export const UserDeleteModal: FC<UserDeleteModalProps> = (props) => {
  const { user, isOpen, onClose } = props

  const { currentUser } = useUserContext()

  const userDeleteMutation = useUserDeleteMutation()

  const toastOptions: ToastOptions = {
    position: "bottom-right",
    autoClose: 2000,
    hideProgressBar: true,
    closeOnClick: true,
    pauseOnHover: false,
    draggable: true,
    transition: Bounce,
    closeButton: true,
  }

  const onUserDeleteConfirm = async () => {
    if (user.username === currentUser?.username) {
      toast.error(
        <Text fontWeight="bold">Упс, Вы не можете удалить себя :)</Text>,
        toastOptions
      )
    }
    onClose()

    await userDeleteMutation.mutateAsync(user.id!)

    toast.success(
      <Text fontWeight="bold">Сотрудник {user.fio} был успешно удалён</Text>,
      toastOptions
    )
  }

  return (
    <Modal isOpen={isOpen} onClose={onClose} isCentered>
      <ModalOverlay backdropFilter="blur(10px)" />

      <ModalContent>
        <ModalHeader>Удаление сотрудника</ModalHeader>
        <ModalCloseButton />

        <ModalBody>
          <Text>Вы точно хотите удалить сотрудника</Text>
          <Text fontWeight="bold">{user.fio}</Text>
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
