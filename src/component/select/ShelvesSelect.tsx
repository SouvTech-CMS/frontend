import { Button, Flex, Text } from "@chakra-ui/react"
import { getAllShelves } from "api/shelf/shelf"
import {
  ActionMeta,
  ChakraStylesConfig,
  GroupBase,
  InputActionMeta,
  MultiValue,
  Select,
} from "chakra-react-select"
import { FC, MouseEvent, useState } from "react"
import { useQuery } from "react-query"
import { useShelfCreateMutation } from "service/shelf/shelf"
import { SelectOption } from "type/selectOption"
import { Shelf, ShelfWithPlacement } from "type/shelf/shelf"
import { ShelfPlacement } from "type/shelf/shelfPlacement"
import { WithId } from "type/withId"
import { getShelfFullCode } from "util/shelf"
import { notify } from "util/toasts"

interface ShelvesSelectProps {
  selectedShelvesIds: number[]
  onSelect: (shelvesIds: number[]) => void
  isCreatable?: boolean
}

const selectStyles: ChakraStylesConfig<
  SelectOption,
  true,
  GroupBase<SelectOption>
> = {
  container: (provided) => ({
    ...provided,
    width: "full",
  }),
}

export const ShelvesSelect: FC<ShelvesSelectProps> = (props) => {
  const { selectedShelvesIds, onSelect, isCreatable } = props

  const [shelfInputValue, setShelfInputValue] = useState<string>()

  const { data: shelvesList, isLoading: isShelvesListLoading } = useQuery<
    ShelfWithPlacement[]
  >("shelvesList", getAllShelves)

  const shelfCreateMutation = useShelfCreateMutation()

  const isLoading = isShelvesListLoading || shelfCreateMutation.isLoading

  const uniquePlacementsList: WithId<ShelfPlacement>[] = Array.from(
    new Set(shelvesList?.map((shelf) => JSON.stringify(shelf.shelf_placement))),
  )
    .map((placement) => JSON.parse(placement))
    .filter(Boolean)

  const selectedShelves = shelvesList?.filter((shelf) =>
    selectedShelvesIds.includes(shelf.id),
  )

  const isShelfInputValueExists =
    shelfInputValue?.trim() !== undefined && !!shelfInputValue?.trim()

  const handleSelectChange = (
    newValue: MultiValue<SelectOption>,
    _: ActionMeta<SelectOption>,
  ) => {
    const shelvesIds = newValue.map((selectedShelf) => selectedShelf.value)
    onSelect(shelvesIds)
  }

  const handleSelectInputChange = (newValue: string, _: InputActionMeta) => {
    setShelfInputValue(newValue)
  }

  const getPlacementByNameHash = (nameHash: string) => {
    return uniquePlacementsList.find(
      (placement) => placement.name_hash === nameHash,
    )
  }

  const getNameHashFromShelfInput = () => {
    if (!isShelfInputValueExists) {
      return undefined
    }

    const nameHash = shelfInputValue.split("-")[0]

    return nameHash
  }

  const nameHash = getNameHashFromShelfInput()

  const getPlacementByInputShelf = () => {
    if (!nameHash) {
      return
    }

    const placement = getPlacementByNameHash(nameHash)

    return placement
  }

  const inputPlacement = getPlacementByInputShelf()
  const isInputPlacementExists = isShelfInputValueExists && !!inputPlacement

  const isShowNoOptionComponent = isCreatable

  const handleShelfCreate = async (e: MouseEvent<HTMLButtonElement>) => {
    e.preventDefault()

    if (!isShelfInputValueExists || !isInputPlacementExists) {
      return
    }

    const shelfName = shelfInputValue.trim().split("-")[1]
    const body: Shelf = {
      name: shelfName,
      shelf_placement_id: inputPlacement.id,
    }

    const { id: shelfId } = await shelfCreateMutation.mutateAsync(body)

    const newShelvesIds = [...selectedShelvesIds, shelfId]
    onSelect(newShelvesIds)

    notify(
      `Shelf ${inputPlacement.name_hash}-${shelfName} created and selected successfully`,
      "success",
    )
  }

  const noOptionsMessage = () => {
    return (
      <Flex w="full" justifyContent="center" px={3}>
        {isInputPlacementExists ? (
          <Button w="full" variant="secondary" onClick={handleShelfCreate}>
            Create shelf {shelfInputValue} (in {inputPlacement.name})
          </Button>
        ) : (
          <Text>No Placement found with Hash "{nameHash}"</Text>
        )}
      </Flex>
    )
  }

  return (
    <Select<SelectOption, true, GroupBase<SelectOption>>
      chakraStyles={selectStyles}
      colorScheme="purple"
      placeholder="Select shelves"
      options={shelvesList?.map((shelf) => ({
        value: shelf.id,
        label: getShelfFullCode(shelf),
      }))}
      value={selectedShelves?.map((shelf) => ({
        value: shelf.id,
        label: getShelfFullCode(shelf),
      }))}
      isClearable
      useBasicStyles
      isMulti
      onChange={handleSelectChange}
      onInputChange={handleSelectInputChange}
      noOptionsMessage={isShowNoOptionComponent ? noOptionsMessage : undefined}
      isLoading={isLoading}
      isDisabled={isLoading}
    />
  )
}
