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
  Textarea,
} from "@chakra-ui/react"
import { FC, useEffect, useState } from "react"
import { FiMapPin, FiUser } from "react-icons/fi"
import {
  useSupplierCreateMutation,
  useSupplierUpdateMutation,
} from "service/supplier"
import { ModalProps } from "type/modalProps"
import { Supplier } from "type/supplier"
import { WithId } from "type/withId"
import { notify } from "util/toasts"

interface SupplierModalProps extends ModalProps {
  prevSupplier?: WithId<Supplier>
}

const newSupplier: Supplier = {
  name: "",
}

export const SupplierModal: FC<SupplierModalProps> = (props) => {
  const { prevSupplier, isOpen, onClose } = props

  const isNewSupplier = !prevSupplier

  const [supplier, setSupplier] = useState<Supplier>(
    prevSupplier || newSupplier
  )

  const supplierCreateMutation = useSupplierCreateMutation()
  const supplierUpdateMutation = useSupplierUpdateMutation()

  const isLoading =
    supplierCreateMutation.isLoading || supplierUpdateMutation.isLoading

  const isSupplierNameInvalid = !supplier.name.trim()

  const handleSupplierUpdate = (param: string, value: number | string) => {
    setSupplier((prevSupplier) => ({
      ...prevSupplier,
      [param]: value,
    }))
  }

  const onSupplierUpdate = async () => {
    if (isNewSupplier) {
      await supplierCreateMutation.mutateAsync(supplier)

      notify(`Supplier ${supplier.name} created successfully`, "success")
    } else {
      await supplierUpdateMutation.mutateAsync({
        ...supplier,
        id: prevSupplier.id,
      })

      notify(`Supplier ${supplier.name} updated successfully`, "success")
    }
    onClose()
  }

  useEffect(() => {
    if (prevSupplier) {
      setSupplier(prevSupplier)
    } else {
      setSupplier(newSupplier)
    }
  }, [prevSupplier, isOpen])

  return (
    <Modal size="xl" isOpen={isOpen} onClose={onClose} isCentered>
      <ModalOverlay backdropFilter="blur(10px)" />

      <ModalContent>
        <ModalHeader>{isNewSupplier ? "New supplier" : "Supplier"}</ModalHeader>
        <ModalCloseButton />

        <ModalBody>
          <Flex w="full" direction="column" gap={5}>
            {/* Name */}
            <Flex alignItems="center" gap={2}>
              <FiUser color="gray" />

              <FormControl isInvalid={isSupplierNameInvalid}>
                <Input
                  placeholder="Name"
                  value={supplier.name}
                  type="text"
                  onChange={(e) => {
                    const value = e.target.value
                    handleSupplierUpdate("name", value)
                  }}
                />
              </FormControl>
            </Flex>

            {/* Address */}
            <Flex alignItems="center" gap={2}>
              <FiMapPin color="gray" />

              <FormControl>
                <Textarea
                  placeholder="Address"
                  value={supplier.address}
                  onChange={(e) => {
                    const value = e.target.value
                    handleSupplierUpdate("address", value)
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
              onClick={onSupplierUpdate}
              isLoading={isLoading}
              isDisabled={isSupplierNameInvalid}
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
