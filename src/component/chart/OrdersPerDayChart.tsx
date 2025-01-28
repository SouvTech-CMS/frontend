import { getOrdersAnalytics } from "api/analytics/analytics"
import { ChartData, ChartOptions } from "chart.js"
import { LoadingPage } from "component/page/LoadingPage"
import { useTableContext } from "context/table"
import { FC, useEffect } from "react"
import { Line } from "react-chartjs-2"
import { useQuery } from "react-query"
import { useCustomTheme } from "theme"
import { OrdersAnalyticsResponse } from "type/analytics/analytics"
import { OrderSearchFilter } from "type/order/order"
import {
  getFirstCurrentYearDateString,
  getLastCurrentYearDateString,
} from "util/dates"
import { getShopColor } from "util/shops"

interface OrdersPerDayChartProps {}

type LineChartData = ChartData<"line">
type LineChartOptions = ChartOptions<"line">

const options: LineChartOptions = {
  responsive: true,
  interaction: {
    mode: "nearest",
    intersect: false,
  },
  plugins: {
    legend: {
      position: "right",
      align: "center",
      labels: {
        pointStyleWidth: 18,
        usePointStyle: true,
      },
    },
  },
  spanGaps: true,
}

export const OrdersPerDayChart: FC<OrdersPerDayChartProps> = (props) => {
  const { colors } = useCustomTheme()

  const { searchFilter, setSearchFilter } = useTableContext<OrderSearchFilter>()

  const {
    data: ordersAnalytics,
    isLoading,
    isRefetching,
    refetch,
  } = useQuery<OrdersAnalyticsResponse>("ordersAnalytics", () =>
    getOrdersAnalytics({
      start_date: searchFilter?.start_date,
      end_date: searchFilter?.end_date,
    }),
  )

  const data: LineChartData = {
    labels: ordersAnalytics?.labels,
    datasets:
      ordersAnalytics?.data?.map(({ shop, report }) => {
        const [bgColor, borderColor] = getShopColor(colors, shop.id)

        return {
          label: `${shop?.name}`,
          data: report.map((report) => report.count),

          backgroundColor: `${bgColor}`,
          borderColor: `${borderColor}`,
        }
      }) || [],
  }

  useEffect(
    () => {
      // Update Start Date
      if (!searchFilter?.start_date) {
        const firstDate = getFirstCurrentYearDateString()

        setSearchFilter(
          (prevFilters) =>
            ({
              ...prevFilters,
              start_date: firstDate,
            } as OrderSearchFilter),
        )
      }

      // Update End Date
      if (!searchFilter?.end_date) {
        const lastDate = getLastCurrentYearDateString()

        setSearchFilter(
          (prevFilters) =>
            ({
              ...prevFilters,
              end_date: lastDate,
            } as OrderSearchFilter),
        )
      }

      refetch()
    },
    // eslint-disable-next-line react-hooks/exhaustive-deps
    [],
  )

  if (isLoading || isRefetching) {
    return <LoadingPage />
  }

  return <Line options={options} data={data} />
}
