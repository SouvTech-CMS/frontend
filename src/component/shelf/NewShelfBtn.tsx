import { Button, useDisclosure } from "@chakra-ui/react"
import { ShelfModal } from "component/shelf/ShelfModal"
import { FC } from "react"
import { FiPlus } from "react-icons/fi"
import { ShelfPlacement } from "type/shelf/shelfPlacement"
import { WithId } from "type/withId"

interface NewShelfBtnProps {
  placement: WithId<ShelfPlacement>
}

export const NewShelfBtn: FC<NewShelfBtnProps> = (props) => {
  const { placement } = props

  const {
    isOpen: isShelfCreateModalOpen,
    onOpen: onShelfCreateModalOpen,
    onClose: onShelfCreateModalClose,
  } = useDisclosure()

  return (
    <>
      <Button
        w="full"
        bgColor="gray.100"
        variant="newCard"
        fontSize="lg"
        fontWeight="bold"
        borderRadius={10}
        py={7}
        leftIcon={<FiPlus />}
        onClick={onShelfCreateModalOpen}
      >
        New shelf
      </Button>

      <ShelfModal
        placement={placement}
        isOpen={isShelfCreateModalOpen}
        onClose={onShelfCreateModalClose}
      />
    </>
  )
}
