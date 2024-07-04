import {
  Button,
  Flex,
  FormControl,
  Input,
  Modal,
  ModalBody,
  ModalCloseButton,
  ModalContent,
  ModalFooter,
  ModalHeader,
  ModalOverlay,
} from "@chakra-ui/react"
import { FC, useEffect, useState } from "react"
import { FiAtSign, FiCornerDownRight, FiPhone } from "react-icons/fi"
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

  const supplierManagerCreateMutation = useSupplierManagerCreateMutation()

  const isManagerNameInvalid = !manager.name.trim()

  const handleManagerUpdate = (param: string, value: number | string) => {
    setManager((prevManager) => ({
      ...prevManager,
      [param]: value,
    }))
  }

  const onManagerCreate = async () => {
    await supplierManagerCreateMutation.mutateAsync(manager)

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
            <Flex alignItems="center" gap={2}>
              <FiCornerDownRight color="gray" />

              <FormControl isInvalid={isManagerNameInvalid}>
                <Input
                  placeholder="Name"
                  value={manager.name}
                  type="text"
                  onChange={(e) => {
                    const value = e.target.value
                    handleManagerUpdate("name", value)
                  }}
                />
              </FormControl>
            </Flex>

            {/* Email */}
            <Flex alignItems="center" gap={2}>
              <FiAtSign color="gray" />

              <FormControl>
                <Input
                  placeholder="Email"
                  value={manager.email}
                  type="email"
                  onChange={(e) => {
                    const value = e.target.value
                    handleManagerUpdate("email", value)
                  }}
                />
              </FormControl>
            </Flex>

            {/* Phone Number */}
            <Flex alignItems="center" gap={2}>
              <FiPhone color="gray" />

              <FormControl>
                <Input
                  placeholder="Phone Number"
                  value={manager.phone_number}
                  type="number"
                  onChange={(e) => {
                    const value = e.target.value
                    handleManagerUpdate("phone_number", value)
                  }}
                />
              </FormControl>
            </Flex>
          </Flex>
        </ModalBody>

        <ModalFooter>
          <Flex gap={5}>
            <Button
              variant="solid"
              colorScheme="blue"
              onClick={onManagerCreate}
              isDisabled={isManagerNameInvalid}
            >
              Save
            </Button>

            <Button variant="solid" colorScheme="gray" onClick={onClose}>
              Cancel
            </Button>
          </Flex>
        </ModalFooter>
      </ModalContent>
    </Modal>
  )
}
