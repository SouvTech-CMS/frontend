import { IconButton } from "@chakra-ui/react"
import { Dispatch, FC, SetStateAction } from "react"
import { FiChevronDown, FiChevronUp } from "react-icons/fi"

interface CollapseBtnProps {
  isExpanded: boolean
  setIsExpanded: Dispatch<SetStateAction<boolean>>
  isDisabled?: boolean
}

export const CollapseBtn: FC<CollapseBtnProps> = (props) => {
  const { isExpanded, setIsExpanded, isDisabled } = props

  const handleIsExpandedChange = () => {
    setIsExpanded((prevIsExpanded) => !prevIsExpanded)
  }

  const btnIcon = isExpanded ? <FiChevronUp /> : <FiChevronDown />

  return (
    <IconButton
      aria-label="expand-row-btn"
      size="sm"
      variant="ghost"
      icon={btnIcon}
      onClick={handleIsExpandedChange}
      isDisabled={isDisabled}
    />
  )
}
