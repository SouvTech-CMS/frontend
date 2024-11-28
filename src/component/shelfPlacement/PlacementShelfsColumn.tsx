import { Accordion, Flex, IconButton, Text } from "@chakra-ui/react"
import { ShelfWithGoodsCard } from "component/shelf/ShelfWithGoodsCard"
import { FC, useState } from "react"
import { FiChevronLeft, FiChevronRight } from "react-icons/fi"
import { PlacementWithShelfsWithStorageGoods } from "type/shelf/shelfPlacement"

interface PlacementShelfsColumnProps {
  placement: PlacementWithShelfsWithStorageGoods
}

export const PlacementShelfsColumn: FC<PlacementShelfsColumnProps> = (
  props,
) => {
  const { placement } = props

  const [isCollapsed, setIsCollapsed] = useState<boolean>(false)

  const name = placement.name
  const code = placement.name_hash

  const shelfsList = placement.shelf

  const collapseIcon = isCollapsed ? <FiChevronRight /> : <FiChevronLeft />

  const handleIsCollapsedToggle = () => {
    setIsCollapsed((prevIsCollapsed) => !prevIsCollapsed)
  }

  return (
    <Accordion w="full" allowMultiple>
      <Flex
        w={isCollapsed ? "fit-content" : "full"}
        direction="column"
        bgColor="gray.200"
        px={3}
        py={4}
        borderRadius={10}
        gap={5}
      >
        <Flex
          direction="row"
          justifyContent="space-between"
          alignItems="center"
          gap={5}
        >
          {/* Placement Name with Code */}
          <Text w="full" fontSize="2xl" fontWeight="bold" whiteSpace="nowrap">
            {isCollapsed ? `(${code})` : `${name} (${code})`}
          </Text>

          {/* Collapse Btn */}
          <IconButton
            aria-label="toggle-placement-column"
            icon={collapseIcon}
            variant="ghost"
            size="sm"
            fontSize="xl"
            onClick={handleIsCollapsedToggle}
          />
        </Flex>

        {/* Shelfs List with Storage Goods */}
        {!isCollapsed && (
          <Flex w="full" direction="column" gap={2}>
            {shelfsList?.map((shelf, index) => (
              <ShelfWithGoodsCard
                key={index}
                placement={placement}
                shelfWithGoods={shelf}
              />
            ))}
          </Flex>
        )}
      </Flex>
    </Accordion>
  )
}
