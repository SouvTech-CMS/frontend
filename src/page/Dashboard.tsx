import { Flex, Heading } from "@chakra-ui/react"
import {
  ArcElement,
  CategoryScale,
  Chart as ChartJS,
  Legend,
  LinearScale,
  LineElement,
  PointElement,
  Title,
  Tooltip,
} from "chart.js"
import { ChartSection } from "component/chart/ChartSection"
import { MonthTotalCharts } from "component/chart/MonthTotalCharts"
import { OrdersPerDayChart } from "component/chart/OrdersPerDayChart"
import { SalesCitiesChart } from "component/chart/SalesCitiesChart"
import { SalesStatesChart } from "component/chart/SalesStatesChart"
import { Page } from "component/page/Page"
import { PageHeading } from "component/page/PageHeading"
import { TableContextProvider } from "context/table"
import { useUserContext } from "context/user"
import { SalesAnalyticsSeachFilter } from "type/analytics/sales"
import { OrderSearchFilter } from "type/order/order"

ChartJS.register(
  CategoryScale,
  LinearScale,
  PointElement,
  LineElement,
  ArcElement,
  Title,
  Tooltip,
  Legend,
)

export const Dashboard = () => {
  const { isUserAdmin } = useUserContext()

  if (!isUserAdmin) {
    return <></>
  }

  return (
    <Page>
      <PageHeading title="Dashboard" isSearchHidden />

      <Flex w="full" direction="column" gap={10}>
        {/* Totals Charts Cards */}
        <Flex direction="column" gap={3}>
          <Heading size="lg" fontWeight={300}>
            Monthly Statistics
          </Heading>

          <MonthTotalCharts />
        </Flex>

        {/* Orders per Days Chart */}
        <TableContextProvider<OrderSearchFilter>>
          <ChartSection title="Orders per Day" withDatesFilter>
            <OrdersPerDayChart />
          </ChartSection>
        </TableContextProvider>

        {/* States Sales Chart */}
        <Flex w="full" justifyContent="space-between" gap={10}>
          <Flex w="full">
            <TableContextProvider<SalesAnalyticsSeachFilter>>
              <ChartSection
                title="Sales - States"
                withShopFilter
                withCountryFilter
                withDatesFilter
              >
                <SalesStatesChart />
              </ChartSection>
            </TableContextProvider>
          </Flex>

          {/* Cities Sales Chart */}
          <Flex w="full">
            <TableContextProvider<SalesAnalyticsSeachFilter>>
              <ChartSection
                title="Sales - Cities"
                withShopFilter
                withDatesFilter
                withCountryFilter
                withStateFilter
              >
                <SalesCitiesChart />
              </ChartSection>
            </TableContextProvider>
          </Flex>
        </Flex>
      </Flex>
    </Page>
  )
}
