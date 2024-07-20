import {
  Card,
  CardBody,
  Flex,
  Input,
  InputGroup,
  InputLeftElement,
  InputRightElement,
} from "@chakra-ui/react"
import { ActionMeta, ChakraStylesConfig, Select } from "chakra-react-select"
import { ShelfBadge } from "component/storageGood/ShelfBadge"
import { ChangeEvent, FC, KeyboardEvent, useState } from "react"
import {
  FiArrowRight,
  FiCheck,
  FiHash,
  FiInbox,
  FiPackage,
} from "react-icons/fi"
import { PurchaseGood } from "type/purchaseGood"
import { SelectOption } from "type/selectOption"
import { DeliveryToStorageGood } from "type/storage"
import { StorageGood } from "type/storageGood"
import { WithId } from "type/withId"

interface GoodToStorageCardProps {
  goodsPair: DeliveryToStorageGood
  purchaseGoods?: WithId<PurchaseGood>[]
  storageGoods?: WithId<StorageGood>[]
  handleGoodsPairUpdate: (
    param: string,
    value: number | string,
    purchaseGoodId: number,
  ) => void
}

export const GoodToStorageCard: FC<GoodToStorageCardProps> = (props) => {
  const { goodsPair, purchaseGoods, storageGoods, handleGoodsPairUpdate } =
    props

  const isStorageGoodsLoading = !storageGoods

  const purchaseGood = purchaseGoods?.find(
    (good) => good.id === goodsPair.purchase_good_id,
  )

  const [shelf, setShelf] = useState<string>("")
  const [shelfsList, setShelfsList] = useState<string[]>([])

  const isShelfExists = !!shelf.trim() && shelf.trim().length >= 2

  const isSelectedStorageGoodInvalid = !goodsPair.storage_good_id

  const handleGoodChange = (param: string, value: number | string) => {
    handleGoodsPairUpdate(param, value, purchaseGood!.id)
  }

  const handleShelfChange = (e: ChangeEvent<HTMLInputElement>) => {
    const value = e.target.value.toUpperCase().trim()
    setShelf(value)
  }

  const handleShelfEnterPress = (e: KeyboardEvent<HTMLInputElement>) => {
    if (e.key === "Enter" && isShelfExists) {
      const newShelfsList = [...shelfsList, shelf.trim()]
      setShelfsList(newShelfsList)
      handleGoodChange("shelf", newShelfsList.join(";"))
      setShelf("")
    }
  }

  const handleShelfRemove = (shelfCode: string) => {
    const newShelfsList = shelfsList.filter((shelf) => shelf !== shelfCode)
    setShelfsList(newShelfsList)
    handleGoodChange("shelf", newShelfsList.join(";"))
    setShelf("")
  }

  const handleStorageGoodSelect = (
    newValue: unknown,
    actionMeta: ActionMeta<unknown>,
  ) => {
    const selectedOption = newValue as SelectOption
    const storageGoodId = Number(selectedOption.value as number)
    handleGoodChange("storage_good_id", storageGoodId)
  }

  const storageGoodSelectStyles: ChakraStylesConfig = {
    container: (provided) => ({
      ...provided,
      width: "full",
    }),
  }

  return (
    <Card>
      <CardBody>
        <Flex direction="column" gap={5}>
          {/* Goods Pair */}
          <Flex alignItems="center" gap={5}>
            {/* Delivery Good */}
            <Input defaultValue={purchaseGood?.name} isDisabled />

            {/* Arrow Icon */}
            <Flex>
              <FiArrowRight />
            </Flex>

            {/* Storage Good Select */}
            <Select
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
        </Flex>
      </CardBody>
    </Card>
  )
}
