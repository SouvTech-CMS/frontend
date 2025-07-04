import { Button } from "@chakra-ui/react"
import { FC } from "react"

interface PauseBtnProps {
  onClick: () => void
  isLoading: boolean
}

export const PauseBtn: FC<PauseBtnProps> = (props) => {
  const { onClick, isLoading } = props

  const handleClick = async () => {
    onClick()
  }

  return (
    <Button
      w="full"
      variant="secondary"
      size="lg"
      py={8}
      px={10}
      onClick={handleClick}
      isLoading={isLoading}
    >
      Pause
    </Button>
  )
}
