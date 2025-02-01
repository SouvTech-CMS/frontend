import { SimpleGrid } from "@chakra-ui/react"
import { getMonthTotalAnalytics } from "api/analytics/monthTotal"
import { ChartCard } from "component/chart/ChartCard"
import { LoadingPage } from "component/page/LoadingPage"
import { FC } from "react"
import { FiBarChart2, FiDollarSign, FiShoppingCart } from "react-icons/fi"
import { useQuery } from "react-query"
import { MonthTotalAnalyticsResponse } from "type/analytics/monthTotal"

export const MonthTotalCharts: FC = () => {
  const { data: monthTotalAnalytics, isLoading } =
    useQuery<MonthTotalAnalyticsResponse>("monthTotalAnalytics", () =>
      getMonthTotalAnalytics({}),
    )
  const totalAnalytics = monthTotalAnalytics?.total

  const currentMonthTotal = totalAnalytics?.current_month
  // const isCurrentMonthTotalExists = !!currentMonthTotal
  const currentMonthTotalIncome = currentMonthTotal?.income
  const currentMonthTotalProfit = currentMonthTotal?.profit
  const currentMonthTotalExpenses = currentMonthTotal?.expenses
  const currentMonthTotalOrdersCount = currentMonthTotal?.order_count

  const prevMonthTotal = totalAnalytics?.previous_month
  // const isPrevMonthTotalExists = !!prevMonthTotal
  const prevMonthTotalIncome = prevMonthTotal?.income
  const prevMonthTotalProfit = prevMonthTotal?.profit
  const prevMonthTotalExpenses = prevMonthTotal?.expenses
  const prevMonthTotalOrdersCount = prevMonthTotal?.order_count

  if (isLoading) {
    return <LoadingPage />
  }

  return (
    <SimpleGrid
      columns={{
        base: 1,
        sm: 1,
        md: 2,
        lg: 2,
      }}
      spacing={5}
    >
      <ChartCard
        icon={FiBarChart2}
        color="teal"
        title="Total Income"
        value={currentMonthTotalIncome}
        prevValue={prevMonthTotalIncome}
      />

      <ChartCard
        icon={FiDollarSign}
        color="green"
        title="Profit"
        value={currentMonthTotalProfit}
        prevValue={prevMonthTotalProfit}
      />

      <ChartCard
        icon={FiDollarSign}
        color="orange"
        title="Expenses"
        value={currentMonthTotalExpenses?.total}
        prevValue={prevMonthTotalExpenses?.total}
      />

      <ChartCard
        icon={FiShoppingCart}
        color="blue"
        title="Completed"
        value={currentMonthTotalOrdersCount}
        prevValue={prevMonthTotalOrdersCount}
        postfix="orders"
      />
    </SimpleGrid>
  )
}
