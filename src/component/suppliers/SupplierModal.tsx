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
import { FiCornerDownRight } from "react-icons/fi"
import {
  useSupplierCreateMutation,
  useSupplierUpdateMutation,
} from "service/supplier"
import { Supplier } from "type/supplier"
import { notify } from "util/toasts"

interface SupplierModalProps {
  prevSupplier?: Supplier
  isOpen: boolean
  onClose: () => void
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

  const isSupplierNameInvalid = !supplier.name.trim()

  const handleSupplierUpdate = (param: string, value: number | string) => {
    setSupplier((prevSupplier) => ({
      ...prevSupplier,
      [param]: value,
    }))
  }

  const onSupplierUpdate = async () => {
    const body: Supplier = supplier

    if (isNewSupplier) {
      await supplierCreateMutation.mutateAsync(body)

      notify(`Поставщик ${supplier.name} успешно добавлен`, "success")
    } else {
      await supplierUpdateMutation.mutateAsync(body)

      notify(`Поставщик ${supplier.name} успешно изменён`, "success")
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
    <Modal size="2xl" isOpen={isOpen} onClose={onClose} isCentered>
      <ModalOverlay backdropFilter="blur(10px)" />

      <ModalContent>
        <ModalHeader>
          {isNewSupplier ? "Новый поставщик" : "Поставщик"}{" "}
        </ModalHeader>
        <ModalCloseButton />

        <ModalBody>
          <Flex h="full" w="full" direction="column" gap={5}>
            {/* Name */}
            <Flex alignItems="center" gap={2}>
              <FiCornerDownRight color="gray" />

              <FormControl isInvalid={isSupplierNameInvalid}>
                <Input
                  placeholder="Название"
                  value={supplier.name}
                  type="text"
                  onChange={(e) => {
                    const value = e.target.value.trim()
                    handleSupplierUpdate("name", value)
                  }}
                />
              </FormControl>
            </Flex>
          </Flex>
        </ModalBody>

        <ModalFooter>
          <Flex gap={5}>
            <Button
              variant="outline"
              colorScheme="green"
              onClick={onSupplierUpdate}
              isDisabled={isSupplierNameInvalid}
            >
              Сохранить
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
