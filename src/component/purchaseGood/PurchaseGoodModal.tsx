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
  Tooltip,
} from "@chakra-ui/react"
import { ModalBackgroundBlur } from "component/ModalBackgroundBlur"
import { ChangeEvent, FC, useEffect, useState } from "react"
import {
  FiAlignLeft,
  FiDollarSign,
  FiHash,
  FiLayers,
  FiPercent,
  FiType,
} from "react-icons/fi"
import { usePurchaseGoodUpdateMutation } from "service/purchase/purchaseGood"
import { ModalProps } from "type/modalProps"
import { PurchaseGood } from "type/purchase/purchaseGood"
import { WithId } from "type/withId"
import { roundNumber } from "util/formatting"
import { notify } from "util/toasts"

interface PurchaseGoodModalProps extends ModalProps {
  prevGood: WithId<PurchaseGood>
}

export const PurchaseGoodModal: FC<PurchaseGoodModalProps> = (props) => {
  const { prevGood, isOpen, onClose } = props

  const prevIsDiscountPercentage = prevGood.discount
    ? prevGood.discount.includes("%")
    : true
  const prevDiscount = parseFloat(prevGood.discount || "")
  const prevInitialItemPrice = prevGood.amount / prevGood.quantity

  const [good, setGood] = useState<WithId<PurchaseGood>>({
    ...prevGood,
    initialItemPrice: prevInitialItemPrice,
  })
  const [isDiscountPercentage, setIsDiscountPercentage] = useState<boolean>(
    prevIsDiscountPercentage,
  )
  const [discount, setDiscount] = useState<number>(prevDiscount)

  const purchaseGoodUpdateMutation = usePurchaseGoodUpdateMutation()

  const isNameInvalid = !good?.name.trim()
  const isQuantityInvalid = !good.quantity
  const isSaveBtnDisabled = isNameInvalid || isQuantityInvalid

  const handleGoodChange = (param: string, value: number | string) => {
    switch (param) {
      case "quantity":
        setGood((prevGood) => ({
          ...prevGood,
          amount: NaN,
        }))
        setGood((prevGood) => ({
          ...prevGood,
          initialItemPrice: NaN,
        }))
        break

      case "amount":
        const newInitialItemPrice = (value as number) / good.quantity
        setGood((prevGood) => ({
          ...prevGood,
          initialItemPrice: newInitialItemPrice,
        }))

        updateAmountOnDiscount(
          value as number,
          good.quantity,
          discount,
          isDiscountPercentage,
        )
        break

      case "initialItemPrice":
        const newAmount = (value as number) * good.quantity
        setGood((prevGood) => ({
          ...prevGood,
          amount: newAmount,
        }))

        updateAmountOnDiscount(
          newAmount,
          good.quantity,
          discount,
          isDiscountPercentage,
        )
        break
    }

    setGood((prevGood) => ({
      ...prevGood,
      [param]: value,
    }))
  }

  const toggleIsDiscountPercentage = () => {
    setIsDiscountPercentage((prevIsPercentage) => !prevIsPercentage)
    setDiscount((prevDiscount) => Number(prevDiscount))

    updateAmountOnDiscount(
      good.amount,
      good.quantity,
      discount,
      !isDiscountPercentage,
    )
  }

  const handleDiscountChange = (e: ChangeEvent<HTMLInputElement>) => {
    const value = e.target.valueAsNumber

    if (isDiscountPercentage) {
      if (value) {
        setDiscount(roundNumber(value, 0))
      } else {
        setDiscount(NaN)
      }
    } else {
      setDiscount(value)
    }

    updateAmountOnDiscount(
      good.amount,
      good.quantity,
      Number(value),
      isDiscountPercentage,
    )
  }

  const updateAmountOnDiscount = (
    amount: number,
    quantity: number,
    discount: number,
    isPercentage: boolean,
  ) => {
    const totalDiscount = discount || 0

    if (isPercentage) {
      const newTotalAmount = amount - (totalDiscount / 100) * amount
      handleGoodChange("total_amount", newTotalAmount)
      const newItemPrice = newTotalAmount / quantity
      handleGoodChange("price_per_item", newItemPrice)
    } else {
      const newTotalAmount = amount - totalDiscount
      handleGoodChange("total_amount", newTotalAmount)
      const newItemPrice = newTotalAmount / quantity
      handleGoodChange("price_per_item", newItemPrice)
    }
  }

  const onGoodChange = async () => {
    if (discount) {
      if (isDiscountPercentage) {
        good.discount = `${discount}%`
      } else {
        good.discount = `${discount}`
      }
    } else {
      good.discount = null
    }

    await purchaseGoodUpdateMutation.mutateAsync(good)

    notify(`Order Good #${good.id} updated successfully`, "success")
    onClose()
  }

  useEffect(() => {
    setGood({
      ...prevGood,
      initialItemPrice: prevInitialItemPrice,
    })
    setDiscount(prevDiscount)
    setIsDiscountPercentage(prevIsDiscountPercentage)
  }, [
    isOpen,
    prevGood,
    prevDiscount,
    prevIsDiscountPercentage,
    prevInitialItemPrice,
  ])

  return (
    <Modal size="xl" isOpen={isOpen} onClose={onClose} isCentered>
      <ModalBackgroundBlur />

      <ModalContent>
        <ModalHeader>
          Order #{good.purchase_id} Good #{good.id}
        </ModalHeader>
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

            {/* Quantity & Initial Item Price */}
            <Flex gap={2}>
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

              {/* Initial Item Price */}
              <InputGroup>
                <InputLeftElement color="gray">
                  <FiDollarSign />
                </InputLeftElement>

                <Input
                  placeholder="Initial Item Price"
                  value={good.initialItemPrice}
                  type="number"
                  onChange={(e) => {
                    const value = e.target.valueAsNumber
                    handleGoodChange("initialItemPrice", value)
                  }}
                />
              </InputGroup>
            </Flex>

            {/* Initial Amount & Discount */}
            <Flex gap={2}>
              {/* Initial Amount */}
              <InputGroup>
                <InputLeftElement color="gray">
                  <FiDollarSign />
                </InputLeftElement>

                <Input
                  placeholder="Initial Amount"
                  value={good.amount}
                  type="number"
                  onChange={(e) => {
                    const value = e.target.valueAsNumber
                    handleGoodChange("amount", value)
                  }}
                />
              </InputGroup>

              {/* Discount */}
              <Tooltip
                label="Click on icon to change discount type"
                placement="top-start"
              >
                <InputGroup>
                  <InputLeftElement
                    color="gray"
                    cursor="pointer"
                    onClick={toggleIsDiscountPercentage}
                  >
                    {isDiscountPercentage ? <FiPercent /> : <FiDollarSign />}
                  </InputLeftElement>

                  <Input
                    placeholder="Discount"
                    value={discount}
                    type="number"
                    onChange={handleDiscountChange}
                  />
                </InputGroup>
              </Tooltip>
            </Flex>

            {/* Total Amount & Item Price */}
            <Flex gap={2}>
              {/* Total Amount */}
              <InputGroup>
                <InputLeftElement color="gray">
                  <FiDollarSign />
                </InputLeftElement>

                <Input
                  placeholder="Total Amount"
                  value={good.total_amount}
                  type="number"
                  isReadOnly
                />
              </InputGroup>

              {/* Total Item Price */}
              <InputGroup>
                <InputLeftElement color="gray">
                  <FiDollarSign />
                </InputLeftElement>

                <Input
                  placeholder="Total Item Price"
                  value={good.price_per_item}
                  type="number"
                  isReadOnly
                />
              </InputGroup>
            </Flex>
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
