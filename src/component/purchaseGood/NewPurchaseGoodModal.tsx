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
import { PurchaseStatus } from "constant/purchaseStatus"
import { FC, useEffect, useState } from "react"
import { FiAlignLeft, FiDollarSign, FiLayers, FiType } from "react-icons/fi"
import { ModalProps } from "type/modalProps"
import { PurchaseGood } from "type/purchaseGood"

interface NewPurchaseGoodModalProps extends ModalProps {
  handleAddGood: (good: PurchaseGood) => void
}

const newGood: PurchaseGood = {
  name: "",
  quantity: NaN,
  price_per_item: NaN,
  status: PurchaseStatus.Order,
}

export const NewPurchaseGoodModal: FC<NewPurchaseGoodModalProps> = (props) => {
  const { handleAddGood, isOpen, onClose } = props

  const [good, setGood] = useState<PurchaseGood>(newGood)

  const isNameInvalid = !good?.name.trim()
  const isPriceInvalid = !good.price_per_item
  const isQuantityInvalid = !good.quantity
  const isSaveBtnDisabled = isNameInvalid || isPriceInvalid || isQuantityInvalid

  const handleGoodUpdate = (param: string, value: number | string) => {
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
            <InputGroup>
              <InputLeftElement color="gray">
                <FiType />
              </InputLeftElement>

              <Input
                placeholder="Name"
                value={good.name}
                onChange={(e) => {
                  const value = e.target.value
                  handleGoodUpdate("name", value)
                }}
                isInvalid={isNameInvalid}
              />
            </InputGroup>

            {/* Description */}
            <InputGroup>
              <InputLeftElement color="gray">
                <FiAlignLeft />
              </InputLeftElement>

              <Input
                placeholder="Description"
                value={good.description}
                onChange={(e) => {
                  const value = e.target.value
                  handleGoodUpdate("description", value)
                }}
              />
            </InputGroup>

            {/* Quantity */}
            <InputGroup>
              <InputLeftElement color="gray">
                <FiLayers />
              </InputLeftElement>

              <Input
                placeholder="Quantity"
                value={good.quantity}
                type="number"
                onChange={(e) => {
                  const value = e.target.valueAsNumber
                  handleGoodUpdate("quantity", value)
                }}
                isInvalid={isQuantityInvalid}
              />
            </InputGroup>

            {/* Price per Item */}
            <InputGroup>
              <InputLeftElement color="gray">
                <FiDollarSign />
              </InputLeftElement>

              <Input
                placeholder="Unit Price"
                value={good.price_per_item}
                type="number"
                onChange={(e) => {
                  const value = e.target.valueAsNumber
                  handleGoodUpdate("price_per_item", value)
                }}
                isInvalid={isPriceInvalid}
              />
            </InputGroup>
          </Flex>
        </ModalBody>

        <ModalFooter>
          <Flex gap={5}>
            <Button
              onClick={() => handleAddGood(good)}
              isDisabled={isSaveBtnDisabled}
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
