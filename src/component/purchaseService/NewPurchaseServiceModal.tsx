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
import { FiDollarSign, FiPercent, FiType } from "react-icons/fi"
import { ModalProps } from "type/modalProps"
import { PurchaseService } from "type/purchase/purchaseService"
import { roundNumber } from "util/formatting"

interface NewPurchaseServiceModalProps extends ModalProps {
  prevService?: PurchaseService
  onAddService: (service: PurchaseService) => void
}

const newService: PurchaseService = {
  name: "",
  amount: NaN,
  total_amount: NaN,
}

export const NewPurchaseServiceModal: FC<NewPurchaseServiceModalProps> = (
  props,
) => {
  const { prevService = newService, onAddService, isOpen, onClose } = props

  const isEditing = prevService !== undefined

  const prevIsDiscountPercentage = !!prevService.discount
    ? prevService.discount.includes("%")
    : true
  const prevDiscount = parseFloat(prevService.discount || "")

  const [service, setService] = useState<PurchaseService>(prevService)
  const [isDiscountPercentage, setIsDiscountPercentage] = useState<boolean>(
    prevIsDiscountPercentage,
  )
  const [discount, setDiscount] = useState<number>(prevDiscount)

  const isNameInvalid = !service.name.trim()
  const isAmountInvalid = !service.amount
  const isSaveBtnDisabled = isNameInvalid || isAmountInvalid

  const handleServiceChange = (param: string, value: number | string) => {
    switch (param) {
      case "amount":
        updateAmountOnDiscount(value as number, discount, isDiscountPercentage)
        break
    }

    setService((prevService) => ({
      ...prevService,
      [param]: value,
    }))
  }

  const toggleIsDiscountPercentage = () => {
    setIsDiscountPercentage((prevIsPercentage) => !prevIsPercentage)
    setDiscount((prevDiscount) => Number(prevDiscount))

    updateAmountOnDiscount(service.amount, discount, !isDiscountPercentage)
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

    updateAmountOnDiscount(service.amount, Number(value), isDiscountPercentage)
  }

  const updateAmountOnDiscount = (
    amount: number,
    discount: number,
    isPercentage: boolean,
  ) => {
    const totalDiscount = discount || 0

    if (isPercentage) {
      const newTotalAmount = amount - (totalDiscount / 100) * amount
      handleServiceChange("total_amount", newTotalAmount)
    } else {
      const newTotalAmount = amount - totalDiscount
      handleServiceChange("total_amount", newTotalAmount)
    }
  }

  const handleAdd = () => {
    if (discount) {
      if (isDiscountPercentage) {
        service.discount = `${discount}%`
      } else {
        service.discount = `${discount}`
      }
    }

    onAddService(service)
  }

  useEffect(() => {
    if (isEditing) {
      setService(prevService)
      setDiscount(prevDiscount)
      setIsDiscountPercentage(prevIsDiscountPercentage)
    } else {
      setService(newService)
      setDiscount(NaN)
      setIsDiscountPercentage(true)
    }
  }, [isOpen, isEditing, prevService, prevDiscount, prevIsDiscountPercentage])

  return (
    <Modal size="xl" isOpen={isOpen} onClose={onClose} isCentered>
      <ModalBackgroundBlur />

      <ModalContent>
        <ModalHeader>New Service</ModalHeader>
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
                value={service.name}
                onChange={(e) => {
                  const value = e.target.value
                  handleServiceChange("name", value)
                }}
                isInvalid={isNameInvalid}
              />
            </InputGroup>

            {/* Initial Amount & Discount */}
            <Flex gap={2}>
              {/* Initial Amount */}
              <InputGroup>
                <InputLeftElement color="gray">
                  <FiDollarSign />
                </InputLeftElement>

                <Input
                  placeholder="Initial Amount"
                  value={service.amount}
                  type="number"
                  onChange={(e) => {
                    const value = e.target.valueAsNumber
                    handleServiceChange("amount", value)
                  }}
                  isInvalid={isAmountInvalid}
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

            {/* Total Amount */}
            <InputGroup>
              <InputLeftElement color="gray">
                <FiDollarSign />
              </InputLeftElement>

              <Input
                placeholder="Total Amount"
                value={service.total_amount}
                type="number"
                isReadOnly
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
