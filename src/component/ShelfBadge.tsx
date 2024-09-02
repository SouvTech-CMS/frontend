import { Badge, Tag, TagCloseButton, TagLabel } from "@chakra-ui/react"
import { FC } from "react"

interface ShelfBadgeProps {
  shelf: string
  onRemove?: (shelfCode: string) => void
  isCanRemove?: boolean
}

export const ShelfBadge: FC<ShelfBadgeProps> = (props) => {
  const { shelf, onRemove, isCanRemove } = props

  if (isCanRemove && onRemove) {
    const handleRemove = () => {
      onRemove(shelf)
    }

    return (
      <Tag size="md" fontWeight="bold" colorScheme="purple">
        <TagLabel>{shelf}</TagLabel>
        <TagCloseButton onClick={handleRemove} />
      </Tag>
    )
  }

  return (
    <Badge fontSize="sm" colorScheme="purple">
      {shelf.trim()}
    </Badge>
  )
}
