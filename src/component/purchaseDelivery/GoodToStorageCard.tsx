import {
  Card,
  CardBody,
  Flex,
  Input,
  InputGroup,
  InputLeftElement,
} from "@chakra-ui/react"
import {
  ActionMeta,
  ChakraStylesConfig,
  GroupBase,
  Select,
  SingleValue,
} from "chakra-react-select"
import { DeliveryToStorageShopsSelect } from "component/purchaseDelivery/DeliveryToStorageShopsSelect"
import { ShelfInput } from "component/ShelfInput"
import { ChangeEvent, FC, useCallback, useEffect, useState } from "react"
import { FiArrowRight, FiDollarSign, FiInbox, FiPackage } from "react-icons/fi"
import { PurchaseDeliveryGood } from "type/purchaseDelivery/purchaseDeliveryGood"
import { SelectOption } from "type/selectOption"
import { DeliveryToStorage } from "type/storage/storage"
import { StorageGood } from "type/storage/storageGood"
import { WithId } from "type/withId"

interface GoodToStorageCardProps {
  prevGoodsPair: DeliveryToStorage
  deliveryGoods?: WithId<PurchaseDeliveryGood>[]
  storageGoods?: WithId<StorageGood>[]
  handleGoodsPairUpdate: (goodsPair: DeliveryToStorage) => void
}

export const GoodToStorageCard: FC<GoodToStorageCardProps> = (props) => {
  const { prevGoodsPair, deliveryGoods, storageGoods, handleGoodsPairUpdate } =
    props

  const [goodsPair, setGoodsPair] = useState<DeliveryToStorage>(prevGoodsPair)

  const isStorageGoodsLoading = !storageGoods

  const storageGoodId = goodsPair.storage_good_id
  const isStorageGoodIdExists = !!storageGoodId

  const deliveryGoodId = goodsPair.delivery_good_id
  const deliveryGood = deliveryGoods?.find((good) => good.id === deliveryGoodId)
  const purchaseGood = deliveryGood?.purchase_good
  const goodSKU = purchaseGood?.sku?.trim().toLowerCase()
  const isSKUExists = !!goodSKU

  const selectedStorageGood = storageGoods?.find((good) =>
    isStorageGoodIdExists
      ? good.id === storageGoodId
      : good.uniquename.trim().toLowerCase() === goodSKU,
  )
  const isStorageGoodExists = selectedStorageGood !== undefined

  const isSelectedStorageGoodInvalid = !goodsPair.storage_good_id

  const handleGoodChange = useCallback(
    (param: string, value: number | string | number[]) => {
      setGoodsPair((prevGood) => ({
        ...prevGood,
        [param]: value,
      }))
    },
    [],
  )

  const handleStorageGoodSelect = (
    newValue: SingleValue<SelectOption>,
    _: ActionMeta<SelectOption>,
  ) => {
    const selectedOption = newValue as SelectOption
    const storageGoodId = Number(selectedOption.value)
    handleGoodChange("storage_good_id", storageGoodId)
  }

  const storageGoodSelectStyles: ChakraStylesConfig<
    SelectOption,
    false,
    GroupBase<SelectOption>
  > = {
    container: (provided) => ({
      ...provided,
      width: "full",
    }),
  }

  useEffect(() => {
    // Prevent infinite rerendering
    if (prevGoodsPair !== goodsPair) {
      // Update goods pair in list
      handleGoodsPairUpdate(goodsPair)
    }
  }, [handleGoodsPairUpdate, prevGoodsPair, goodsPair])

  useEffect(() => {
    if (isStorageGoodExists && isSKUExists) {
      handleGoodChange("storage_good_id", selectedStorageGood.id)
    }
  }, [handleGoodChange, isStorageGoodExists, isSKUExists, selectedStorageGood])

  return (
    <Card boxShadow="md">
      <CardBody>
        <Flex direction="column" gap={5}>
          {/* Goods Pair */}
          <Flex alignItems="center" gap={5}>
            {/* Delivery Good */}
            <Input defaultValue={purchaseGood?.name} isReadOnly />

            {/* Arrow Icon */}
            <Flex>
              <FiArrowRight />
            </Flex>

            {/* Storage Good Select */}
            <Select<SelectOption, false, GroupBase<SelectOption>>
              chakraStyles={storageGoodSelectStyles}
              placeholder="Select storage good"
              options={storageGoods?.map((storageGood) => ({
                value: storageGood.id,
                label: storageGood.name,
              }))}
              value={
                isStorageGoodExists
                  ? {
                      value: selectedStorageGood.id,
                      label: selectedStorageGood.name,
                    }
                  : undefined
              }
              onChange={handleStorageGoodSelect}
              isSearchable
              isInvalid={isSelectedStorageGoodInvalid}
              isDisabled={isStorageGoodsLoading}
            />
          </Flex>

          {/* Quantities and Shelf Inputs */}
          <Flex w="full" gap={5}>
            {/* Box Count Input */}
            <InputGroup w="full">
              <InputLeftElement color="gray">
                <FiPackage />
              </InputLeftElement>

              <Input
                placeholder="Box Quantity"
                type="number"
                value={goodsPair.box_quantity}
                onChange={(e: ChangeEvent<HTMLInputElement>) => {
                  const value = e.target.valueAsNumber
                  handleGoodChange("box_quantity", value)
                }}
              />
            </InputGroup>

            {/* In Box Count Input */}
            <InputGroup w="full">
              <InputLeftElement color="gray">
                <FiInbox />
              </InputLeftElement>

              <Input
                placeholder="Goods Quantity In Box"
                type="number"
                value={goodsPair.in_box_quantity}
                onChange={(e: ChangeEvent<HTMLInputElement>) => {
                  const value = e.target.valueAsNumber
                  handleGoodChange("in_box_quantity", value)
                }}
              />
            </InputGroup>

            {/* Shelf Input */}
            <ShelfInput
              prevShelf={goodsPair.shelf}
              onChange={handleGoodChange}
            />
          </Flex>

          {/* Prime Cost */}
          <InputGroup w="full">
            <InputLeftElement color="gray">
              <FiDollarSign />
            </InputLeftElement>

            <Input
              placeholder="Prime Cost"
              type="number"
              value={goodsPair.prime_cost}
              onChange={(e: ChangeEvent<HTMLInputElement>) => {
                const value = e.target.valueAsNumber
                handleGoodChange("prime_cost", value)
              }}
            />
          </InputGroup>

          <Flex w="full">
            <DeliveryToStorageShopsSelect handleGoodChange={handleGoodChange} />
          </Flex>
        </Flex>
      </CardBody>
    </Card>
  )
}
