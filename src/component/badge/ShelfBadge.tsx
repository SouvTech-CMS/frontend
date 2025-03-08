import { Badge } from "@chakra-ui/react"
import { FC } from "react"
import { ShelfWithPlacement } from "type/shelf/shelf"
import { getShelfFullCode } from "util/shelf"

interface ShelfBadgeProps {
  shelf: ShelfWithPlacement
}

export const ShelfBadge: FC<ShelfBadgeProps> = (props) => {
  const { shelf } = props

  const fullShelfCode = getShelfFullCode(shelf)

  return (
    <Badge h="fit-content" w="fit-content" fontSize="sm" colorScheme="purple">
      {fullShelfCode}
    </Badge>
  )
}
