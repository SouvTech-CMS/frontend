import { Input, InputGroup, InputLeftElement, Textarea } from "@chakra-ui/react"
import { ChangeEvent, FC } from "react"
import { FiMessageSquare } from "react-icons/fi"

interface CommentInputProps {
  comment: string
  handleCommentChange: (event: ChangeEvent<HTMLInputElement>) => void
  isDisabled: boolean
}

export const CommentInput: FC<CommentInputProps> = (props) => {
  const { comment, handleCommentChange, isDisabled } = props

  return (
    <InputGroup>
      <InputLeftElement color="gray">
        <FiMessageSquare />
      </InputLeftElement>

      <Input
        as={Textarea}
        placeholder="Comment"
        value={comment}
        onChange={handleCommentChange}
        isDisabled={isDisabled}
      />
    </InputGroup>
  )
}
