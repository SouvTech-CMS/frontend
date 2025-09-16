import {
  Button,
  Flex,
  Input,
  InputGroup,
  InputLeftElement,
  Modal,
  ModalBody,
  ModalCloseButton,
  ModalContent,
  ModalFooter,
  ModalHeader,
} from "@chakra-ui/react"
import { ModalBackgroundBlur } from "component/ModalBackgroundBlur"
import { CommentInput } from "component/comment/Comment"
import { useCommentInput } from "hook/useCommentInput"
import { FC, useEffect, useMemo, useState } from "react"
import { FiAtSign, FiPhone, FiUser } from "react-icons/fi"
import {
  useSupplierManagerCreateMutation,
  useSupplierManagerUpdateMutation,
} from "service/supplier/supplierManager"
import { ModalProps } from "type/modalProps"
import { SupplierManager } from "type/supplier/supplierManager"
import { WithId } from "type/withId"
import { notify } from "util/toasts"

interface ManagerModalProps extends ModalProps {
  supplierId: number
  managerId?: number
  prevManager?: SupplierManager
}

export const ManagerModal: FC<ManagerModalProps> = (props) => {
  const { supplierId, managerId, prevManager, isOpen, onClose } = props

  const isManagerExists = managerId !== undefined && prevManager !== undefined

  const newManager = useMemo(
    () => ({
      supplier_id: supplierId,
      name: "",
      email: "",
      phone_number: "",
    }),
    [supplierId],
  )

  const [manager, setManager] = useState<SupplierManager>(
    prevManager || newManager,
  )

  const { comment, handleCommentChange, onCommentSubmit, isCommentLoading } =
    useCommentInput({
      objectName: "supplier_manager",
      objectId: managerId,
    })

  const managerCreateMutation = useSupplierManagerCreateMutation()
  const managerUpdateMutation = useSupplierManagerUpdateMutation()

  const isLoading =
    managerCreateMutation.isLoading || managerUpdateMutation.isLoading
  const isManagerNameInvalid = !manager.name?.trim()

  const handleManagerUpdate = (param: string, value: number | string) => {
    setManager((prevManager) => ({
      ...prevManager,
      [param]: value,
    }))
  }

  const onManagerUpdate = async () => {
    if (isManagerExists) {
      const body: WithId<SupplierManager> = {
        ...manager,
        id: managerId,
      }
      await managerUpdateMutation.mutateAsync(body)

      await onCommentSubmit(managerId)

      notify(`Manager ${manager.name} updated successfully`, "success")
    } else {
      const { id: managerId } = await managerCreateMutation.mutateAsync(manager)

      await onCommentSubmit(managerId)

      notify(`Manager ${manager.name} created successfully`, "success")
    }

    onClose()
  }

  useEffect(() => {
    if (isManagerExists) {
      setManager(prevManager)
    } else {
      setManager(newManager)
    }
  }, [supplierId, isOpen, isManagerExists, newManager, prevManager])

  return (
    <Modal size="xl" isOpen={isOpen} onClose={onClose} isCentered>
      <ModalBackgroundBlur />

      <ModalContent>
        <ModalHeader>
          {isManagerExists ? `Manager #${managerId}` : "New manager"}
        </ModalHeader>
        <ModalCloseButton />

        <ModalBody>
          <Flex direction="column" gap={3}>
            {/* Name */}
            <InputGroup>
              <InputLeftElement color="gray">
                <FiUser />
              </InputLeftElement>

              <Input
                placeholder="Name"
                value={manager.name}
                type="text"
                onChange={(e) => handleManagerUpdate("name", e.target.value)}
                isInvalid={isManagerNameInvalid}
              />
            </InputGroup>

            {/* Email */}
            <InputGroup>
              <InputLeftElement color="gray">
                <FiAtSign />
              </InputLeftElement>

              <Input
                placeholder="Email"
                value={manager.email}
                type="email"
                onChange={(e) => handleManagerUpdate("email", e.target.value)}
              />
            </InputGroup>

            {/* Phone Number */}
            <InputGroup>
              <InputLeftElement color="gray">
                <FiPhone />
              </InputLeftElement>

              <Input
                placeholder="Phone Number"
                value={manager.phone_number}
                type="number"
                onChange={(e) =>
                  handleManagerUpdate("phone_number", e.target.value)
                }
              />
            </InputGroup>

            {/* Comment */}
            <CommentInput
              comment={comment}
              handleCommentChange={handleCommentChange}
              isDisabled={isCommentLoading}
            />
          </Flex>
        </ModalBody>

        <ModalFooter>
          <Flex gap={5}>
            <Button
              onClick={onManagerUpdate}
              isLoading={isLoading}
              isDisabled={isManagerNameInvalid}
            >
              Save
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
