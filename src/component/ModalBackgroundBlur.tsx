import { ModalOverlay } from "@chakra-ui/react"
import { FC } from "react"

export const ModalBackgroundBlur: FC = () => {
  return <ModalOverlay backdropFilter="blur(10px)" />
}
