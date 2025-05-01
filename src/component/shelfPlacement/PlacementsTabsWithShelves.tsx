import { Flex, TabList, TabPanel, TabPanels, Tabs } from "@chakra-ui/react"
import { Container } from "component/Container"
import { NewPlacementBtn } from "component/shelfPlacement/NewPlacementBtn"
import { PlacementTab } from "component/shelfPlacement/PlacementTab"
import { PlacementTabContent } from "component/shelfPlacement/PlacementTabContent"
import { useUserPermissions } from "hook/useUserPermissions"
import { FC } from "react"
import { PlacementWithShelvesWithStorageGoods } from "type/shelf/shelfPlacement"

interface PlacementsTabsWithShelvesProps {
  placementsList?: PlacementWithShelvesWithStorageGoods[]
}

export const PlacementsTabsWithShelves: FC<PlacementsTabsWithShelvesProps> = (
  props,
) => {
  const { placementsList } = props

  const { canEditShelvesPlacements } = useUserPermissions()

  // TODO: useSearchContext for shelves searching

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
          {canEditShelvesPlacements && <NewPlacementBtn />}

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
              <Flex w="full" overflowX="auto">
                <PlacementTabContent placement={placement} />
              </Flex>
            </Container>
          </TabPanel>
        ))}
      </TabPanels>
    </Tabs>
  )
}
