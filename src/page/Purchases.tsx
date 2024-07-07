import { Flex, Tab, TabList, TabPanel, TabPanels, Tabs } from "@chakra-ui/react"
import { Page } from "component/Page"
import { PageHeading } from "component/PageHeading"
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
      <PageHeading title="Purchases" />

      <Tabs
        index={tabIndex}
        onChange={handleTabChange}
        w="full"
        size="lg"
        variant="enclosed-colored"
        isFitted
        isLazy
      >
        <TabList>
          <Tab fontWeight="bold">Purchases</Tab>
          <Tab fontWeight="bold">Deliveries</Tab>
        </TabList>

        <TabPanels>
          {/* Purchases */}
          <TabPanel>
            <Flex w="full" direction="column" gap={5}>
              <NewPurchaseBtn />

              <PurchasesTable />
            </Flex>
          </TabPanel>

          {/* Purchases in Delivery */}
          <TabPanel>
            <Flex w="full" direction="column" gap={5}>
              <NewPurchaseDeliveryBtn />

              <PurchaseDeliveriesTable />
            </Flex>
          </TabPanel>
        </TabPanels>
      </Tabs>
    </Page>
  )
}

export default withAuthAndRoles([Role.STORAGER])(Purchases)
