import { Flex, Tooltip } from "@chakra-ui/react"
import { FC } from "react"
import { FiMessageSquare } from "react-icons/fi"

interface CommentTooltipProps {
  comment: string
}

export const CommentTooltip: FC<CommentTooltipProps> = (props) => {
  const { comment } = props

  return (
    <Flex p={1}>
      <Tooltip label={comment}>
        <span>
          <FiMessageSquare />
        </span>
      </Tooltip>
    </Flex>
  )
}
