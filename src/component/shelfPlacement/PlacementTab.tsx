import { Flex, Tab, Text, useDisclosure } from "@chakra-ui/react"
import { PlacementDeleteModal } from "component/shelfPlacement/PlacementDeleteModal"
import { PlacementModal } from "component/shelfPlacement/PlacementModal"
import { PlacementTabMenu } from "component/shelfPlacement/PlacementTabMenu"
import { FC } from "react"
import { PlacementWithShelfsWithStorageGoods } from "type/shelf/shelfPlacement"

interface PlacementTabProps {
  placement: PlacementWithShelfsWithStorageGoods
}

export const PlacementTab: FC<PlacementTabProps> = (props) => {
  const { placement } = props

  const { shelf, ...placementWithoutShelf } = placement

  const {
    isOpen: isPlacementUpdateModalOpen,
    onOpen: onPlacementUpdateModalOpen,
    onClose: onPlacementUpdateModalClose,
  } = useDisclosure()

  const {
    isOpen: isPlacementDeleteModalOpen,
    onOpen: onPlacementDeleteModalOpen,
    onClose: onPlacementDeleteModalClose,
  } = useDisclosure()

  return (
    <>
      <Tab
        w="full"
        fontWeight="bold"
        border="none"
        borderRadius={10}
        whiteSpace="nowrap"
        pr={1}
      >
        <Flex w="full" direction="row" alignItems="center" gap={2}>
          <Text fontSize="lg">
            {placement.name} ({placement.name_hash})
          </Text>

          <PlacementTabMenu
            onEdit={onPlacementUpdateModalOpen}
            onDelete={onPlacementDeleteModalOpen}
          />
        </Flex>
      </Tab>

      {/* Modals */}
      <>
        <PlacementModal
          prevPlacement={placementWithoutShelf}
          isOpen={isPlacementUpdateModalOpen}
          onClose={onPlacementUpdateModalClose}
        />

        <PlacementDeleteModal
          placement={placementWithoutShelf}
          isOpen={isPlacementDeleteModalOpen}
          onClose={onPlacementDeleteModalClose}
        />
      </>
    </>
  )
}
