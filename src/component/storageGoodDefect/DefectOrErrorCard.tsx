import {
  Button,
  Flex,
  Input,
  InputGroup,
  InputLeftElement,
} from "@chakra-ui/react"
import { EngraverSelect } from "component/select/EngraverSelect"
import { StorageGoodSelect } from "component/select/StorageGoodSelect"
import { SupplierSelect } from "component/select/SupplierSelect"
import { FC, useEffect, useState } from "react"
import { FiLayers, FiTrash } from "react-icons/fi"
import { StorageGoodDefect } from "type/storage/storageGoodDefect"

interface DefectOrErrorCardProps {
  prevDefect: StorageGoodDefect
  onChange: (defect: StorageGoodDefect) => void
  onDelete: (defect: StorageGoodDefect) => void
  isEngraverErrorSelected: boolean
  isLoading?: boolean
}

export const DefectOrErrorCard: FC<DefectOrErrorCardProps> = (props) => {
  const { prevDefect, onChange, onDelete, isEngraverErrorSelected, isLoading } =
    props

  const [defect, setDefect] = useState<StorageGoodDefect>(prevDefect)

  const isQuantityInvalid = !defect?.quantity

  const handleDefectChange = (param: string, value: number | string) => {
    setDefect(
      (prevDefect) =>
        ({
          ...prevDefect,
          [param]: value,
        } as StorageGoodDefect),
    )
  }

  const handleDefectCardDelete = () => {
    onDelete(defect)
  }

  useEffect(
    () => {
      if (prevDefect !== defect) {
        onChange(defect)
      }
    },
    // eslint-disable-next-line react-hooks/exhaustive-deps
    [defect],
  )

  useEffect(
    () => {
      if (prevDefect !== defect) {
        setDefect(prevDefect)
      }
    },
    // eslint-disable-next-line react-hooks/exhaustive-deps
    [prevDefect],
  )

  return (
    <Flex
      w="full"
      bgColor="newCard"
      direction="column"
      p={3}
      borderWidth={1}
      borderColor="gray.200"
      borderRadius={10}
      gap={3}
    >
      {/* Storage Good Select */}
      <Flex w="full">
        <StorageGoodSelect
          selectedId={defect?.storage_good_id}
          onSelect={(selectedId) => {
            handleDefectChange("storage_good_id", selectedId)
          }}
          isDisabled={isLoading}
        />
      </Flex>

      {/* Quantity Input */}
      <InputGroup>
        <InputLeftElement color="gray">
          <FiLayers />
        </InputLeftElement>

        <Input
          placeholder="Quantity"
          value={defect?.quantity}
          type="number"
          onChange={(e) => {
            const value = e.target.valueAsNumber
            handleDefectChange("quantity", value)
          }}
          isInvalid={isQuantityInvalid}
          isDisabled={isLoading}
        />
      </InputGroup>

      {/* Engraver or Supplier Select */}
      <Flex w="full">
        {isEngraverErrorSelected ? (
          <EngraverSelect
            selectedId={defect?.engraver_id}
            onSelect={(selectedId) => {
              handleDefectChange("engraver_id", selectedId)
            }}
            isRequired
            isDisabled={isLoading}
          />
        ) : (
          <SupplierSelect
            selectedId={defect?.supplier_id}
            onSelect={(selectedId) => {
              handleDefectChange("supplier_id", selectedId)
            }}
            isDisabled={isLoading}
          />
        )}
      </Flex>

      {/* Remove Defect Btn */}
      <Flex w="full" justifyContent="flex-end">
        <Button
          variant="outline"
          colorScheme="red"
          size="xs"
          leftIcon={<FiTrash />}
          onClick={handleDefectCardDelete}
        >
          Remove
        </Button>
      </Flex>
    </Flex>
  )
}
