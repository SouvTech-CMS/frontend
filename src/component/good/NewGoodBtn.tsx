import { Button, useDisclosure } from "@chakra-ui/react"
import { GoodModal } from "component/good/GoodModal"
import { FC } from "react"

export const NewGoodBtn: FC = () => {
  const {
    isOpen: isGoodModalOpen,
    onOpen: onGoodModalOpen,
    onClose: onGoodModalClose,
  } = useDisclosure()

  return (
    <>
      <Button onClick={onGoodModalOpen}>Create Good</Button>

      <GoodModal isOpen={isGoodModalOpen} onClose={onGoodModalClose} />
    </>
  )
}
