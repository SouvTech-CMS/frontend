import {
  Card,
  CardBody,
  Flex,
  Input,
  InputGroup,
  InputLeftElement,
  InputRightElement,
  Tooltip,
} from "@chakra-ui/react"
import {
  ActionMeta,
  ChakraStylesConfig,
  GroupBase,
  Select,
  SingleValue,
} from "chakra-react-select"
import { DeliveryToStorageShopsSelect } from "component/purchaseDelivery/DeliveryToStorageShopsSelect"
import { ShelfBadge } from "component/storageGood/ShelfBadge"
import { ChangeEvent, FC, KeyboardEvent, useEffect, useState } from "react"
import {
  FiArrowRight,
  FiCheck,
  FiHash,
  FiInbox,
  FiPackage,
} from "react-icons/fi"
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

  const deliveryGoodId = goodsPair.delivery_good_id
  const purchaseGood = deliveryGoods?.find(
    (good) => good.id === deliveryGoodId,
  )?.purchase_good

  const [shelf, setShelf] = useState<string>("")
  const [shelfsList, setShelfsList] = useState<string[]>([])

  const isShelfExists = !!shelf.trim() && shelf.trim().length >= 2

  const isSelectedStorageGoodInvalid = !goodsPair.storage_good_id

  const handleGoodChange = (
    param: string,
    value: number | string | number[],
  ) => {
    setGoodsPair((prevGood) => ({
      ...prevGood,
      [param]: value,
    }))
  }

  const handleStorageGoodSelect = (
    newValue: SingleValue<SelectOption>,
    _: ActionMeta<SelectOption>,
  ) => {
    const selectedOption = newValue as SelectOption
    const storageGoodId = Number(selectedOption.value)
    handleGoodChange("storage_good_id", storageGoodId)
  }

  const handleShelfsListChange = (newShelfsList: string[]) => {
    setShelfsList(newShelfsList)
    handleGoodChange("shelf", newShelfsList.join(";"))
    setShelf("")
  }

  const handleShelfEnterPress = (e: KeyboardEvent<HTMLInputElement>) => {
    if (e.key === "Enter" && isShelfExists) {
      const newShelfsList = [...shelfsList, shelf.trim()]
      handleShelfsListChange(newShelfsList)
    }
  }

  const handleShelfRemove = (shelfCode: string) => {
    const newShelfsList = shelfsList.filter((shelf) => shelf !== shelfCode)
    handleShelfsListChange(newShelfsList)
  }

  const handleShelfChange = (e: ChangeEvent<HTMLInputElement>) => {
    const value = e.target.value.toUpperCase().trim()
    setShelf(value)
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
            <Flex w="full" direction="column" gap={2}>
              <Tooltip label="Press Enter to add shelf">
                <InputGroup>
                  <InputLeftElement color="gray">
                    <FiHash />
                  </InputLeftElement>

                  <Input
                    placeholder="Shelf"
                    type="text"
                    value={shelf}
                    onChange={handleShelfChange}
                    onKeyDown={handleShelfEnterPress}
                  />

                  {isShelfExists && (
                    <InputRightElement color="green">
                      <FiCheck />
                    </InputRightElement>
                  )}
                </InputGroup>
              </Tooltip>

              {/* Shelfs List */}
              <Flex alignItems="center" flexWrap="wrap" gap={2}>
                {shelfsList.map((shelfCode, index) => (
                  <ShelfBadge
                    key={index}
                    shelf={shelfCode}
                    onRemove={() => handleShelfRemove(shelfCode)}
                    isCanRemove
                  />
                ))}
              </Flex>
            </Flex>
          </Flex>

          <Flex w="full">
            <DeliveryToStorageShopsSelect handleGoodChange={handleGoodChange} />
          </Flex>
        </Flex>
      </CardBody>
    </Card>
  )
}
