import { Tooltip } from "@chakra-ui/react"
import { FC } from "react"
import { FiInfo } from "react-icons/fi"

interface CommentTooltipProps {
  comment: string
}

export const CommentTooltip: FC<CommentTooltipProps> = (props) => {
  const { comment } = props

  return (
    <Tooltip label={comment}>
      <span>
        <FiInfo />
      </span>
    </Tooltip>
  )
}
