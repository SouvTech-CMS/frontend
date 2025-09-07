import { Flex, Text } from "@chakra-ui/react"
import { getOrdersAnalytics } from "api/analytics/orders"
import { ChartData, ChartOptions } from "chart.js"
import { LoadingPage } from "component/page/LoadingPage"
import { useTableContext } from "context/table"
import { FC, useEffect, useMemo } from "react"
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
    mode: "index",
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

  // Calculate per-shop and total order counts
  const { shopOrderCounts, totalOrders } = useMemo(() => {
    if (!ordersAnalytics?.data) {
      return { shopOrderCounts: [], totalOrders: 0 }
    }
    const shopOrderCounts = ordersAnalytics.data.map(({ shop, report }) => ({
      shop,
      count: report.reduce((sum, r) => sum + (r.count || 0), 0),
    }))
    const totalOrders = shopOrderCounts.reduce((sum, s) => sum + s.count, 0)
    return { shopOrderCounts, totalOrders }
  }, [ordersAnalytics])

  const data: LineChartData = {
    labels: ordersAnalytics?.labels?.map((label, idx) => {
      // Суммарное количество заказов за этот день
      const sumForDay =
        ordersAnalytics?.data?.reduce(
          (sum, { report }) => sum + (report[idx]?.count || 0),
          0,
        ) || 0
      return `${formatDate(dateAsStringToDate(label), true, false)} | Total: ${sumForDay}`
    }),
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

  return (
    <>
      <Line options={options} data={data} />

      <Flex w="full" direction="column" ml={5} gap={2}>
        {/* Title */}
        <Text fontSize="lg" fontWeight="semibold">
          By Shops for specified period
        </Text>

        {/* Shop Orders Counts */}
        <Flex w="full" direction="column" gap={2}>
          {shopOrderCounts.map(({ shop, count }, index) => (
            <Flex
              key={index}
              w="full"
              direction="row"
              alignItems="center"
              gap={2}
            >
              <Flex
                h={4}
                w={4}
                borderRadius="full"
                bg={getColorsForItem(colors, shop.id)[0]}
              />

              <Text fontWeight="medium">
                {shop.name}: {count}
              </Text>
            </Flex>
          ))}

          {/* Total Orders from All Shops */}
          <Flex w="full">
            <Text fontSize="lg" fontWeight="semibold">
              Total: {totalOrders}
            </Text>
          </Flex>
        </Flex>
      </Flex>
    </>
  )
}
