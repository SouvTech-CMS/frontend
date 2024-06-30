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
import { FiDollarSign, FiEdit, FiLayers } from "react-icons/fi"
import { PurchaseGood } from "type/purchaseGood"

interface NewGoodModalProps {
  handleAddGood: (good: PurchaseGood) => void
  isOpen: boolean
  onClose: () => void
}

const newGood: PurchaseGood = {
  name: "",
  quantity: 0,
  price_per_item: 0,
}

export const NewGoodModal: FC<NewGoodModalProps> = (props) => {
  const { handleAddGood, isOpen, onClose } = props

  const [good, setGood] = useState<PurchaseGood>(newGood)

  const isNameInvalid = !good?.name.trim()
  const isPriceInvalid = good.price_per_item <= 0
  const isQuantityInvalid = good.quantity <= 0
  const isSaveBtnDisabled = isNameInvalid || isPriceInvalid || isQuantityInvalid

  const handleGoodUpdate = (param: string, value: number | string) => {
    if (param !== "name") {
      value = Number(value)
    }

    setGood((prevGood) => ({
      ...prevGood,
      [param]: value,
    }))
  }

  useEffect(() => {
    setGood(newGood)
  }, [isOpen])

  return (
    <Modal size="xl" isOpen={isOpen} onClose={onClose} isCentered>
      <ModalOverlay backdropFilter="blur(10px)" />

      <ModalContent>
        <ModalHeader>New Good</ModalHeader>
        <ModalCloseButton />

        <ModalBody>
          <Flex w="full" direction="column" gap={5}>
            {/* Name */}
            <Flex alignItems="center" gap={2}>
              <FiEdit color="gray" />

              <FormControl isInvalid={isNameInvalid}>
                <Input
                  placeholder="Name"
                  value={good.name}
                  type="text"
                  onChange={(e) => {
                    const value = e.target.value
                    handleGoodUpdate("name", value)
                  }}
                />
              </FormControl>
            </Flex>

            {/* Quantity */}
            <Flex alignItems="center" gap={2}>
              <FiLayers color="gray" />

              <FormControl isInvalid={isQuantityInvalid}>
                <Input
                  placeholder="Quantity"
                  value={good.quantity}
                  type="number"
                  onChange={(e) => {
                    const value = e.target.value
                    handleGoodUpdate("quantity", value)
                  }}
                />
              </FormControl>
            </Flex>

            {/* Price per Item */}
            <Flex alignItems="center" gap={2}>
              <FiDollarSign color="gray" />

              <FormControl isInvalid={isPriceInvalid}>
                <Input
                  placeholder="Unit Price"
                  value={good.price_per_item}
                  type="number"
                  onChange={(e) => {
                    const value = e.target.value
                    handleGoodUpdate("price_per_item", value)
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
              onClick={() => handleAddGood(good)}
              isDisabled={isSaveBtnDisabled}
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
