import { IconButton, useDisclosure } from "@chakra-ui/react"
import { PlacementModal } from "component/shelfPlacement/PlacementModal"
import { FC } from "react"
import { FiPlus } from "react-icons/fi"

export const NewPlacementBtn: FC = () => {
  const {
    isOpen: isPlacementCreateModalOpen,
    onOpen: onPlacementCreateModalOpen,
    onClose: onPlacementCreateModalClose,
  } = useDisclosure()

  return (
    <>
      <IconButton
        aria-label="create-shelf-placement-btn"
        variant="newCard"
        size="lg"
        fontSize="x-large"
        icon={<FiPlus />}
        onClick={onPlacementCreateModalOpen}
      />

      <PlacementModal
        isOpen={isPlacementCreateModalOpen}
        onClose={onPlacementCreateModalClose}
      />
    </>
  )
}
