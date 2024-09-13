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
import { useRoleDeleteMutation } from "service/role/role"
import { ModalProps } from "type/modalProps"
import { Role } from "type/role/role"
import { WithId } from "type/withId"
import { notify } from "util/toasts"

interface RoleDeleteModalProps extends ModalProps {
  role: WithId<Role>
}

export const RoleDeleteModal: FC<RoleDeleteModalProps> = (props) => {
  const { role, isOpen, onClose } = props

  const roleDeleteMutation = useRoleDeleteMutation()

  const isLoading = roleDeleteMutation.isLoading

  const onRoleDeleteConfirm = async () => {
    await roleDeleteMutation.mutateAsync(role.id)

    notify(`Role ${role.name} was successfully deleted`, "success")
    onClose()
  }

  return (
    <Modal isOpen={isOpen} onClose={onClose} isCentered>
      <ModalBackgroundBlur />

      <ModalContent>
        <ModalHeader>Delete Role</ModalHeader>
        <ModalCloseButton />

        <ModalBody>
          <Text>Are you sure you want to delete the role</Text>
          <Text fontWeight="bold">{role.name}</Text>
        </ModalBody>

        <ModalFooter>
          <Flex gap={5}>
            <Button
              variant="danger"
              onClick={onRoleDeleteConfirm}
              isLoading={isLoading}
              isDisabled={isLoading}
            >
              Delete
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
