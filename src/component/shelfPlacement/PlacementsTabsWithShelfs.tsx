import { Flex, TabList, TabPanel, TabPanels, Tabs } from "@chakra-ui/react"
import { Container } from "component/Container"
import { NewPlacementBtn } from "component/shelfPlacement/NewPlacementBtn"
import { PlacementTab } from "component/shelfPlacement/PlacementTab"
import { PlacementTabContent } from "component/shelfPlacement/PlacementTabContent"
import { FC } from "react"
import { PlacementWithShelfsWithStorageGoods } from "type/shelf/shelfPlacement"

interface PlacementsTabsWithShelfsProps {
  placementsList?: PlacementWithShelfsWithStorageGoods[]
}

export const PlacementsTabsWithShelfs: FC<PlacementsTabsWithShelfsProps> = (
  props,
) => {
  const { placementsList } = props

  // TODO: useSearchContext for shelfs searching

  return (
    <Tabs w="full" variant="enclosed-colored" isFitted isLazy>
      {/* Tabs Heading */}
      <TabList w="full" border="none">
        <Flex
          w="full"
          direction="row"
          alignItems="center"
          overflowY="hidden"
          overflowX="auto"
          gap={2}
        >
          <NewPlacementBtn />

          {placementsList?.map((placement, index) => (
            <PlacementTab key={index} placement={placement} />
          ))}
        </Flex>
      </TabList>

      {/* Tabs Content */}
      <TabPanels>
        {placementsList?.map((placement, index) => (
          <TabPanel key={index} px={0}>
            <Container>
              <PlacementTabContent placement={placement} />
            </Container>
          </TabPanel>
        ))}
      </TabPanels>
    </Tabs>
  )
}
