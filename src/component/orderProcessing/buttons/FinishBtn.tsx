import { Button } from "@chakra-ui/react"
import { FC } from "react"

interface FinishBtnProps {
  onClick: () => void
  isLoading: boolean
}

export const FinishBtn: FC<FinishBtnProps> = (props) => {
  const { onClick, isLoading } = props

  const handleClick = async () => {
    onClick()
  }

  return (
    <Button
      w="full"
      variant="success"
      size="lg"
      py={8}
      px={10}
      onClick={handleClick}
      isLoading={isLoading}
    >
      Finish
    </Button>
  )
}
