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
import { FC, useEffect, useState } from "react"
import {
  FiAlignLeft,
  FiDollarSign,
  FiHash,
  FiLayers,
  FiType,
} from "react-icons/fi"
import { ModalProps } from "type/modalProps"
import { PurchaseGood } from "type/purchase/purchaseGood"

interface NewPurchaseGoodModalProps extends ModalProps {
  prevGood?: PurchaseGood
  onAddGood: (good: PurchaseGood) => void
}

const newGood: PurchaseGood = {
  name: "",
  quantity: NaN,
  amount: NaN,
  in_delivery: 0,
}

export const NewPurchaseGoodModal: FC<NewPurchaseGoodModalProps> = (props) => {
  const { prevGood = newGood, onAddGood, isOpen, onClose } = props

  const isEditing = !!prevGood.name.trim()

  const [good, setGood] = useState<PurchaseGood>(prevGood)

  const isNameInvalid = !good?.name.trim()
  const isAmountInvalid = !good.amount
  const isQuantityInvalid = !good.quantity
  const isSaveBtnDisabled =
    isNameInvalid || isAmountInvalid || isQuantityInvalid

  const handleGoodUpdate = (param: string, value: number | string) => {
    setGood((prevGood) => ({
      ...prevGood,
      [param]: value,
    }))
  }

  const handleAdd = () => {
    onAddGood(good)
  }

  useEffect(() => {
    if (!isEditing) {
      setGood(newGood)
    }
  }, [isOpen, isEditing])

  return (
    <Modal size="xl" isOpen={isOpen} onClose={onClose} isCentered>
      <ModalBackgroundBlur />

      <ModalContent>
        <ModalHeader>New Good</ModalHeader>
        <ModalCloseButton />

        <ModalBody>
          <Flex w="full" direction="column" gap={5}>
            {/* SKU */}
            <InputGroup>
              <InputLeftElement color="gray">
                <FiHash />
              </InputLeftElement>

              <Input
                placeholder="SKU"
                value={good.sku}
                onChange={(e) => {
                  const value = e.target.value
                  handleGoodUpdate("sku", value)
                }}
              />
            </InputGroup>

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
                placeholder="Total Amount"
                value={good.amount}
                type="number"
                onChange={(e) => {
                  const value = e.target.valueAsNumber
                  handleGoodUpdate("amount", value)
                }}
                isInvalid={isAmountInvalid}
              />
            </InputGroup>
          </Flex>
        </ModalBody>

        <ModalFooter>
          <Flex gap={5}>
            <Button onClick={handleAdd} isDisabled={isSaveBtnDisabled}>
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
