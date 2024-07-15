import { Badge } from "@chakra-ui/react"
import { FC } from "react"

interface ShelfBadgeProps {
  shelf: string
}

export const ShelfBadge: FC<ShelfBadgeProps> = (props) => {
  const { shelf } = props

  return (
    <Badge fontSize="sm" colorScheme="purple">
      {shelf}
    </Badge>
  )
}
