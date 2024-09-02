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
import { usePurchaseGoodUpdateMutation } from "service/purchase/purchaseGood"
import { ModalProps } from "type/modalProps"
import { PurchaseGood } from "type/purchase/purchaseGood"
import { WithId } from "type/withId"
import { notify } from "util/toasts"

interface PurchaseGoodModalProps extends ModalProps {
  prevGood: WithId<PurchaseGood>
}

export const PurchaseGoodModal: FC<PurchaseGoodModalProps> = (props) => {
  const { prevGood, isOpen, onClose } = props

  const [good, setGood] = useState<WithId<PurchaseGood>>(prevGood)

  const purchaseGoodUpdateMutation = usePurchaseGoodUpdateMutation()

  const isNameInvalid = !good?.name.trim()
  const isAmountInvalid = !good.amount
  const isQuantityInvalid = !good.quantity
  const isSaveBtnDisabled =
    isNameInvalid || isAmountInvalid || isQuantityInvalid

  const handleGoodChange = (param: string, value: number | string) => {
    setGood((prevGood) => ({
      ...prevGood,
      [param]: value,
    }))
  }

  const onGoodChange = async () => {
    await purchaseGoodUpdateMutation.mutateAsync(good)

    notify(`Purchase Good #${good.id} updated successfully`, "success")
    onClose()
  }

  useEffect(() => {
    setGood(prevGood)
  }, [isOpen, prevGood])

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
                  handleGoodChange("sku", value)
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
                  handleGoodChange("name", value)
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
                  handleGoodChange("description", value)
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
                  handleGoodChange("quantity", value)
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
                  handleGoodChange("amount", value)
                }}
                isInvalid={isAmountInvalid}
              />
            </InputGroup>
          </Flex>
        </ModalBody>

        <ModalFooter>
          <Flex gap={5}>
            <Button onClick={onGoodChange} isDisabled={isSaveBtnDisabled}>
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
