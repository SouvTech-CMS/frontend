import { Flex, Grid, Heading } from "@chakra-ui/react"
import { ChartCard } from "component/dashboard/ChartCard"
import { Page } from "component/page/Page"
import { PageHeading } from "component/page/PageHeading"
import { Role } from "constant/roles"
import { withAuthAndRoles } from "hook/withAuthAndRoles"
import { FiBarChart2, FiDollarSign } from "react-icons/fi"

const Dashboard = () => {
  return (
    <Page>
      <PageHeading title="Dashboard" isSearchHidden />

      <Flex direction="column" gap={2}>
        <Heading size="lg" fontWeight={300}>
          Monthly Statistics
        </Heading>

        <Grid templateColumns="repeat(3, 1fr)" gap={5}>
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
            // icon={FiShoppingCart}
            color="blue"
            title="Orders"
            value="512"
            isIconHidden
          />
        </Grid>
      </Flex>
    </Page>
  )
}

export default withAuthAndRoles([Role.ADMIN])(Dashboard)
