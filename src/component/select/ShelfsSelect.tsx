import { Button, Flex, Text } from "@chakra-ui/react"
import { getAllShelfs } from "api/shelf/shelf"
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

interface ShelfsSelectProps {
  selectedShelfsIds: number[]
  onSelect: (shelfsIds: number[]) => void
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

export const ShelfsSelect: FC<ShelfsSelectProps> = (props) => {
  const { selectedShelfsIds, onSelect, isCreatable } = props

  const [shelfInputValue, setShelfInputValue] = useState<string>()

  const { data: shelfsList, isLoading: isShelfsListLoading } = useQuery<
    ShelfWithPlacement[]
  >("shelfsList", getAllShelfs)

  const shelfCreateMutation = useShelfCreateMutation()

  const isLoading = isShelfsListLoading || shelfCreateMutation.isLoading

  const uniquePlacementsList: WithId<ShelfPlacement>[] = Array.from(
    new Set(shelfsList?.map((shelf) => JSON.stringify(shelf.shelf_placement))),
  )
    .map((placement) => JSON.parse(placement))
    .filter(Boolean)

  const selectedShelfs = shelfsList?.filter((shelf) =>
    selectedShelfsIds.includes(shelf.id),
  )

  const isShelfInputValueExists =
    shelfInputValue?.trim() !== undefined && !!shelfInputValue?.trim()

  const handleSelectChange = (
    newValue: MultiValue<SelectOption>,
    _: ActionMeta<SelectOption>,
  ) => {
    const shelfsIds = newValue.map((selectedShelf) => selectedShelf.value)
    onSelect(shelfsIds)
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

    const newShelfsIds = [...selectedShelfsIds, shelfId]
    onSelect(newShelfsIds)

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
      placeholder="Select shelfs"
      options={shelfsList?.map((shelf) => ({
        value: shelf.id,
        label: getShelfFullCode(shelf),
      }))}
      value={selectedShelfs?.map((shelf) => ({
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
