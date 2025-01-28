import { Flex, Heading } from "@chakra-ui/react"
import {
  CategoryScale,
  Chart as ChartJS,
  Legend,
  LinearScale,
  LineElement,
  PointElement,
  Title,
  Tooltip,
} from "chart.js"
import { Container } from "component/Container"
import { OrdersPerDayChart } from "component/chart/OrdersPerDayChart"
import { DatesFilter } from "component/filter/DatesFilter"
import { Page } from "component/page/Page"
import { PageHeading } from "component/page/PageHeading"

ChartJS.register(
  CategoryScale,
  LinearScale,
  PointElement,
  LineElement,
  Title,
  Tooltip,
  Legend,
)

export const Dashboard = () => {
  return (
    <Page>
      <PageHeading title="Dashboard" isSearchHidden />

      <Flex w="full" direction="column" gap={10}>
        {/* <Flex direction="column" gap={3}>
          <Heading size="lg" fontWeight={300}>
            Monthly Statistics
          </Heading>

          <Flex w="full" direction="row" alignItems="center" gap={5}>
            <ChartCard
              icon={FiBarChart2}
              color="green"
              title="Total Income"
              value="$7256.95"
            />
            <ChartCard
              icon={FiDollarSign}
              color="orange"
              title="Expenses"
              value="$33.95"
            />
            <ChartCard
              icon={FiShoppingCart}
              color="blue"
              title="Completed"
              value="512 orders"
            />
          </Flex>
        </Flex> */}

        {/* Orders Chart */}
        <Container>
          {/* Chart Header */}
          <Flex
            w="full"
            direction="row"
            justifyContent="space-between"
            alignItems="center"
            gap={3}
          >
            {/* Heading */}
            <Flex>
              <Heading size="lg" fontWeight="medium">
                Orders per Day
              </Heading>
            </Flex>

            {/* Filters */}
            <Flex justifyContent="flex-start" alignItems="center" gap={2}>
              {/* Date Range Select */}
              <DatesFilter />
            </Flex>
          </Flex>

          <Flex w="full">
            <OrdersPerDayChart />
          </Flex>
        </Container>
      </Flex>
    </Page>
  )
}
