import {
  Flex,
  Input,
  InputGroup,
  InputLeftElement,
  InputRightElement,
  Tooltip,
} from "@chakra-ui/react"
import { ShelfBadge } from "component/ShelfBadge"
import { ChangeEvent, FC, KeyboardEvent, useState } from "react"
import { FiCheck, FiHash } from "react-icons/fi"
import { combineShelfs, parseShelfs } from "util/shelf"

interface ShelfInputProps {
  prevShelf?: string
  onChange: (param: string, value: string) => void
}

export const ShelfInput: FC<ShelfInputProps> = (props) => {
  const { prevShelf = "", onChange } = props

  const [shelf, setShelf] = useState<string>("")
  const [shelfsList, setShelfsList] = useState<string[]>(parseShelfs(prevShelf))

  const isShelfExists = !!shelf.trim() && shelf.trim().length >= 2

  const handleShelfsListChange = (newShelfsList: string[]) => {
    setShelfsList(newShelfsList)
    onChange("shelf", combineShelfs(newShelfsList))
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

  return (
    <Flex w="full" direction="column" gap={2}>
      <Tooltip label="Press Enter to add shelf" placement="bottom-start">
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
            onRemove={handleShelfRemove}
            isCanRemove
          />
        ))}
      </Flex>
    </Flex>
  )
}
