import { getOrdersAnalytics } from "api/analytics/orders"
import { ChartData, ChartOptions } from "chart.js"
import { LoadingPage } from "component/page/LoadingPage"
import { useTableContext } from "context/table"
import { FC, useEffect } from "react"
import { Line } from "react-chartjs-2"
import { useQuery } from "react-query"
import { useCustomTheme } from "theme"
import { OrdersAnalyticsResponse } from "type/analytics/orders"
import { OrderSearchFilter } from "type/order/order"
import { getColorsForItem } from "util/colors"
import {
  getFirstCurrentMonthDateString,
  getLastCurrentMonthDateString,
} from "util/dates"
import { dateAsStringToDate, formatDate } from "util/formatting"

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
  scales: {
    y: {
      ticks: {
        stepSize: 1,
      },
    },
  },
  spanGaps: true,
}

export const OrdersPerDayChart: FC = () => {
  const { colors } = useCustomTheme()

  const { searchFilter, setSearchFilter } = useTableContext<OrderSearchFilter>()

  const startDate = searchFilter?.start_date
  const endDate = searchFilter?.end_date

  const {
    data: ordersAnalytics,
    isLoading,
    isRefetching,
    refetch,
  } = useQuery<OrdersAnalyticsResponse>(
    ["ordersAnalytics", searchFilter],
    () =>
      getOrdersAnalytics({
        start_date: startDate,
        end_date: endDate,
      }),
    {
      enabled: !!startDate && !!endDate,
    },
  )

  const data: LineChartData = {
    labels: ordersAnalytics?.labels?.map((label) =>
      formatDate(dateAsStringToDate(label), true, false),
    ),
    datasets:
      ordersAnalytics?.data?.map(({ shop, report }) => {
        const [bgColor, borderColor] = getColorsForItem(colors, shop.id)

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
      if (!startDate) {
        const firstDate = getFirstCurrentMonthDateString()

        setSearchFilter(
          (prevFilters) =>
            ({
              ...prevFilters,
              start_date: firstDate,
            }) as OrderSearchFilter,
        )
      }

      // Update End Date
      if (!endDate) {
        const lastDate = getLastCurrentMonthDateString()

        setSearchFilter(
          (prevFilters) =>
            ({
              ...prevFilters,
              end_date: lastDate,
            }) as OrderSearchFilter,
        )
      }
    },
    // eslint-disable-next-line react-hooks/exhaustive-deps
    [],
  )

  useEffect(() => {
    refetch()
  }, [refetch, searchFilter])

  if (isLoading || isRefetching) {
    return <LoadingPage />
  }

  return <Line options={options} data={data} />
}
