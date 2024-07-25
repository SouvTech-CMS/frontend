import { Flex, Tab, TabList, TabPanel, TabPanels, Tabs } from "@chakra-ui/react"
import { Container } from "component/Container"
import { Page } from "component/page/Page"
import { PageHeading } from "component/page/PageHeading"
import { NewPurchaseBtn } from "component/purchase/NewPurchaseBtn"
import { PurchasesTable } from "component/purchase/PurchasesTable"
import { NewPurchaseDeliveryBtn } from "component/purchaseDelivery/NewPurchaseDeliveryBtn"
import { PurchaseDeliveriesTable } from "component/purchaseDelivery/PurchaseDeliveriesTable"
import { Role } from "constant/roles"
import { usePurchaseTabsContext } from "context/purchaseTabs"
import { useSearchContext } from "context/search"
import { withAuthAndRoles } from "hook/withAuthAndRoles"

const Purchases = () => {
  const { setQuery } = useSearchContext()
  const { tabIndex, setTabIndex } = usePurchaseTabsContext()

  const handleTabChange = (index: number) => {
    setQuery("")
    setTabIndex(index)
  }

  return (
    <Page>
      <PageHeading title="Purchases" isSearchHidden />

      <Tabs
        index={tabIndex}
        onChange={handleTabChange}
        w="full"
        size="lg"
        variant="enclosed-colored"
        isFitted
        isLazy
      >
        <TabList border="none">
          <Tab fontWeight="bold" border="none" borderRadius={20}>
            Purchases
          </Tab>
          <Tab fontWeight="bold" border="none" borderRadius={20}>
            Deliveries
          </Tab>
        </TabList>

        <TabPanels>
          {/* Purchases */}
          <TabPanel>
            <Flex w="full" direction="column" gap={5}>
              <NewPurchaseBtn />

              <Container>
                <PurchasesTable />
              </Container>
            </Flex>
          </TabPanel>

          {/* Purchases in Delivery */}
          <TabPanel>
            <Flex w="full" direction="column" gap={5}>
              <NewPurchaseDeliveryBtn />

              <Container>
                <PurchaseDeliveriesTable />
              </Container>
            </Flex>
          </TabPanel>
        </TabPanels>
      </Tabs>
    </Page>
  )
}

export default withAuthAndRoles([Role.STORAGER])(Purchases)
