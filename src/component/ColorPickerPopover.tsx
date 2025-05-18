import { Flex, Input } from "@chakra-ui/react"
import { ChangeEvent, FC, useEffect, useRef, useState } from "react"
import { HexColorPicker } from "react-colorful"

interface ColorPickerPopoverProps {
  color?: string
  onChange: (color: string) => void
}

export const ColorPickerPopover: FC<ColorPickerPopoverProps> = (props) => {
  const { color, onChange } = props

  const [isOpen, setIsOpen] = useState<boolean>(false)
  const popoverRef = useRef<HTMLDivElement>(null)

  const handleClick = () => {
    setIsOpen((prevIsOpen) => !prevIsOpen)
  }

  const handleColorTextChange = (e: ChangeEvent<HTMLInputElement>) => {
    const newColor = e.target.value
    onChange(newColor)
  }

  const handleClickOutside = (event: MouseEvent) => {
    if (
      popoverRef.current &&
      !popoverRef.current.contains(event.target as Node)
    ) {
      setIsOpen(false)
    }
  }

  useEffect(() => {
    if (isOpen) {
      document.addEventListener("mousedown", handleClickOutside)
    } else {
      document.removeEventListener("mousedown", handleClickOutside)
    }

    return () => {
      document.removeEventListener("mousedown", handleClickOutside)
    }
  }, [isOpen])

  return (
    <Flex direction="column">
      <Flex
        w="fit-content"
        direction="row"
        alignItems="center"
        onClick={handleClick}
        gap={2}
      >
        <Flex h="30px" w="30px" borderRadius="md" bgColor={color} />

        <Input
          w="min-content"
          placeholder="Hex Color"
          value={color}
          type="text"
          px={2}
          onChange={handleColorTextChange}
        />
      </Flex>

      {isOpen && (
        <Flex ref={popoverRef} position="absolute" mt="42px" zIndex={1}>
          <HexColorPicker color={color} onChange={onChange} />
        </Flex>
      )}
    </Flex>
  )
}
