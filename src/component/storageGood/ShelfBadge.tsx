import { Badge, Tag, TagCloseButton, TagLabel } from "@chakra-ui/react"
import { FC } from "react"

interface ShelfBadgeProps {
  shelf: string
  onRemove?: () => void
  isCanRemove?: boolean
}

export const ShelfBadge: FC<ShelfBadgeProps> = (props) => {
  const { shelf, onRemove, isCanRemove } = props

  if (isCanRemove && onRemove) {
    return (
      <Tag size="md" fontWeight="bold" colorScheme="purple">
        <TagLabel>{shelf}</TagLabel>
        <TagCloseButton onClick={onRemove} />
      </Tag>
    )
  }

  return (
    <Badge fontSize="sm" colorScheme="purple">
      {shelf}
    </Badge>
  )
}
