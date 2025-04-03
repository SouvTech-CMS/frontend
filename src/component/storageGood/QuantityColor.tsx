import { Circle } from "@chakra-ui/react"
import { FC } from "react"

interface QuantityColorProps {
  color?: string
}

export const QuantityColor: FC<QuantityColorProps> = (props) => {
  const { color } = props

  return <Circle size="20px" borderRadius="50%" bgColor={color} />
}
