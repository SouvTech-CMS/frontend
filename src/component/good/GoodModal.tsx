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
  Textarea,
} from "@chakra-ui/react"
import { ActionMeta, GroupBase, Select, SingleValue } from "chakra-react-select"
import { useUserContext } from "context/user"
import { FC, useEffect, useState } from "react"
import { FiAlignLeft, FiDollarSign, FiHash, FiType } from "react-icons/fi"
import { useGoodCreateMutation, useGoodUpdateMutation } from "service/good"
import { Good } from "type/good"
import { ModalProps } from "type/modalProps"
import { SelectOption } from "type/selectOption"
import { WithId } from "type/withId"
import { notify } from "util/toasts"

interface GoodModalProps extends ModalProps {
  prevGood?: WithId<Good>
}

const newGood: Good = {
  shop_id: 0,
  uniquename: "",
  price: 0,
  name: "",
}

export const GoodModal: FC<GoodModalProps> = (props) => {
  const { prevGood, isOpen, onClose } = props

  const isNewGood = !prevGood

  const { userShops, isLoadingCurrentUser } = useUserContext()

  const [good, setGood] = useState<Good>(prevGood || newGood)

  const goodCreateMutation = useGoodCreateMutation()
  const goodUpdateMutation = useGoodUpdateMutation()

  const isLoading =
    goodCreateMutation.isLoading ||
    goodUpdateMutation.isLoading ||
    isLoadingCurrentUser

  const isShopInvalid = !good.shop_id
  const isUniqueNameInvalid = !good.uniquename.trim()
  const isNameInvalid = !good.name.trim()
  const isPriceInvalid = !good.price

  const isSaveBtnDisabled =
    isLoading ||
    isShopInvalid ||
    isUniqueNameInvalid ||
    isNameInvalid ||
    isPriceInvalid

  const selectedShop = userShops?.find((shop) => shop.id === good.shop_id)

  const handleGoodChange = (param: string, value: number | string) => {
    setGood((prevGood) => ({
      ...prevGood,
      [param]: value,
    }))
  }

  const handleShopSelect = (
    newValue: SingleValue<SelectOption>,
    _: ActionMeta<SelectOption>,
  ) => {
    const shopId = Number(newValue?.value)
    handleGoodChange("shop_id", shopId)
  }

  const onGoodUpdate = async () => {
    if (isNewGood) {
      await goodCreateMutation.mutateAsync(good)

      notify(`Good #${good?.name} was created successfully`, "success")
    } else {
      const body: WithId<Good> = {
        ...good,
        id: prevGood.id,
      }

      await goodUpdateMutation.mutateAsync(body)

      notify(`Good #${prevGood?.id} was updated successfully`, "success")
    }

    onClose()
  }

  useEffect(() => {
    if (isNewGood) {
      setGood(newGood)
    } else {
      setGood(prevGood)
    }
  }, [isNewGood, prevGood, isOpen])

  return (
    <Modal size="2xl" isOpen={isOpen} onClose={onClose}>
      <ModalOverlay backdropFilter="blur(10px)" />

      <ModalContent>
        <ModalHeader>
          {isNewGood ? "Create Good" : `Good #${prevGood.id}`}
        </ModalHeader>
        <ModalCloseButton />

        <ModalBody>
          <Flex direction="column" gap={5}>
            {/* Shop Select */}
            <Select<SelectOption, false, GroupBase<SelectOption>>
              placeholder="Shop"
              options={userShops?.map((shop) => ({
                value: shop.id,
                label: shop.name,
              }))}
              value={
                selectedShop
                  ? {
                      value: selectedShop.id,
                      label: selectedShop.name,
                    }
                  : null
              }
              useBasicStyles
              onChange={handleShopSelect}
              isInvalid={isShopInvalid}
              isLoading={isLoading}
              isDisabled={isLoading}
            />

            {/* SKU segment Input */}
            <InputGroup>
              <InputLeftElement color="gray">
                <FiHash />
              </InputLeftElement>

              <Input
                placeholder="SKU segment"
                value={good.uniquename}
                type="text"
                onChange={(e) => {
                  const value = e.target.value
                  handleGoodChange("uniquename", value)
                }}
                isInvalid={isUniqueNameInvalid}
                isDisabled={isLoading}
              />
            </InputGroup>

            {/* Name Input */}
            <InputGroup>
              <InputLeftElement color="gray">
                <FiType />
              </InputLeftElement>

              <Input
                placeholder="Name"
                value={good.name}
                type="text"
                onChange={(e) => {
                  const value = e.target.value
                  handleGoodChange("name", value)
                }}
                isInvalid={isNameInvalid}
                isDisabled={isLoading}
              />
            </InputGroup>

            {/* Price Input */}
            <InputGroup>
              <InputLeftElement color="gray">
                <FiDollarSign />
              </InputLeftElement>

              <Input
                placeholder="Price"
                value={good.price}
                type="number"
                onChange={(e) => {
                  const value = e.target.valueAsNumber
                  handleGoodChange("price", value)
                }}
                isInvalid={isPriceInvalid}
                isDisabled={isLoading}
              />
            </InputGroup>

            {/* Description Input */}
            <InputGroup>
              <InputLeftElement color="gray">
                <FiAlignLeft />
              </InputLeftElement>

              <Input
                as={Textarea}
                placeholder="Description"
                value={good.description}
                type="text"
                onChange={(e) => {
                  const value = e.target.value
                  handleGoodChange("description", value)
                }}
                isDisabled={isLoading}
              />
            </InputGroup>
          </Flex>
        </ModalBody>

        <ModalFooter>
          <Flex gap={5}>
            <Button
              variant="solid"
              colorScheme="blue"
              onClick={onGoodUpdate}
              isLoading={isLoading}
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
