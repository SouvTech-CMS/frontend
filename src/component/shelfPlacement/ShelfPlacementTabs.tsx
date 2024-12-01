import { Flex, Tab, TabList, TabPanel, TabPanels, Tabs } from "@chakra-ui/react"
import { Container } from "component/Container"
import { PlacementShelfsColumn } from "component/shelfPlacement/PlacementShelfsColumn"
import { FC } from "react"
import { PlacementWithShelfsWithStorageGoods } from "type/shelf/shelfPlacement"

interface ShelfPlacementTabsProps {
  placementsList?: PlacementWithShelfsWithStorageGoods[]
}

export const ShelfPlacementTabs: FC<ShelfPlacementTabsProps> = (props) => {
  const { placementsList } = props

  return (
    <Tabs w="full" size="lg" variant="enclosed-colored" isFitted isLazy>
      {/* Tabs Heading */}
      <TabList w="full" border="none">
        <Flex
          w="full"
          direction="row"
          overflowY="hidden"
          overflowX="auto"
          gap={2}
        >
          {placementsList?.map((placement, index) => (
            <Tab
              key={index}
              w="full"
              fontWeight="bold"
              border="none"
              borderRadius={10}
            >
              {placement.name} ({placement.name_hash})
            </Tab>
          ))}
        </Flex>
      </TabList>

      {/* Tabs Content */}
      <TabPanels>
        {placementsList?.map((placement, index) => (
          <TabPanel key={index} px={0}>
            <Container>
              <PlacementShelfsColumn placement={placement} />
            </Container>
          </TabPanel>
        ))}
      </TabPanels>
    </Tabs>
  )
}
