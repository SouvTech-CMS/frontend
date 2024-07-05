import { Flex, Tab, TabList, TabPanel, TabPanels, Tabs } from "@chakra-ui/react"
import { Page } from "component/Page"
import { PageHeading } from "component/PageHeading"
import { NewPurchaseBtn } from "component/purchase/NewPurchaseBtn"
import { PurchasesTable } from "component/purchase/PurchasesTable"
import { NewPurchaseDeliveryBtn } from "component/purchaseDelivery/NewPurchaseDeliveryBtn"
import { PurchaseDeliveriesTable } from "component/purchaseDelivery/PurchaseDeliveriesTable"
import { Role } from "constant/roles"
import { withAuthAndRoles } from "util/withAuthAndRoles"

const Purchases = () => {
  return (
    <Page>
      <PageHeading title="Purchases" isLoading={true} />

      <Tabs w="full" size="lg" variant="enclosed-colored" isFitted isLazy>
        <TabList>
          <Tab fontWeight="bold">Purchases</Tab>
          <Tab fontWeight="bold">Purchases in Delivery</Tab>
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
