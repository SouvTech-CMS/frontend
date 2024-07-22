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
  ModalOverlay,
} from "@chakra-ui/react"
import { CommentInput } from "component/comment/Comment"
import { useCommentInput } from "hook/useCommentInput"
import { FC, useEffect, useState } from "react"
import { FiAtSign, FiPhone, FiUser } from "react-icons/fi"
import { useSupplierManagerCreateMutation } from "service/supplierManager"
import { ModalProps } from "type/modalProps"
import { SupplierManager } from "type/supplierManager"
import { notify } from "util/toasts"

interface NewManagerModalProps extends ModalProps {
  supplierId: number
}

const newManager: SupplierManager = {
  name: "",
  email: "",
  phone_number: "",
}

export const NewManagerModal: FC<NewManagerModalProps> = (props) => {
  const { supplierId, isOpen, onClose } = props

  const [manager, setManager] = useState<SupplierManager>({
    ...newManager,
    supplier_id: supplierId,
  })

  const { comment, handleCommentChange, onCommentSubmit, isCommentLoading } =
    useCommentInput({
      objectName: "supplier_manager",
    })

  const supplierManagerCreateMutation = useSupplierManagerCreateMutation()

  const isLoading = supplierManagerCreateMutation.isLoading
  const isManagerNameInvalid = !manager.name.trim()

  const handleManagerUpdate = (param: string, value: number | string) => {
    setManager((prevManager) => ({
      ...prevManager,
      [param]: value,
    }))
  }

  const onManagerCreate = async () => {
    const { id: managerId } = await supplierManagerCreateMutation.mutateAsync(
      manager,
    )

    await onCommentSubmit(managerId)

    notify(`Manager ${manager.name} created successfully`, "success")
    onClose()
  }

  useEffect(() => {
    setManager({
      ...newManager,
      supplier_id: supplierId,
    })
  }, [supplierId, isOpen])

  return (
    <Modal size="xl" isOpen={isOpen} onClose={onClose} isCentered>
      <ModalOverlay backdropFilter="blur(10px)" />

      <ModalContent>
        <ModalHeader>New manager</ModalHeader>
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
              onClick={onManagerCreate}
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
