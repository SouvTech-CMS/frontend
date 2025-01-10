import { Button } from "@chakra-ui/react"
import { Dispatch, FC, SetStateAction } from "react"
import { FiPlus } from "react-icons/fi"
import { ScheduledBreak } from "type/engraver/scheduledBreak"

interface AddScheduledBreakBtnProps {
  setScheduledBreaksList: Dispatch<SetStateAction<ScheduledBreak[]>>
  isLoading?: boolean
  isDisabled?: boolean
}

export const AddScheduledBreakBtn: FC<AddScheduledBreakBtnProps> = (props) => {
  const { setScheduledBreaksList, isLoading, isDisabled } = props

  const handleAdd = () => {
    setScheduledBreaksList((prevBreaks) => {
      const prevMaxIndex =
        prevBreaks
          .map((scheduledBreak) => scheduledBreak.index)
          .sort((index1, index2) => (index2 || 0) - (index1 || 0))[0] || 0

      return [...prevBreaks, { index: prevMaxIndex + 1 } as ScheduledBreak]
    })
  }

  return (
    <Button
      variant="secondary"
      size="sm"
      leftIcon={<FiPlus />}
      onClick={handleAdd}
      isLoading={isLoading}
      isDisabled={isDisabled}
    >
      Add
    </Button>
  )
}
