import { Flex, Text } from "@chakra-ui/react"
import { getSalesAnalytics } from "api/analytics/sales"
import { ChartData, ChartOptions, Color } from "chart.js"
import { LoadingPage } from "component/page/LoadingPage"
import { useTableContext } from "context/table"
import { FC, useEffect } from "react"
import { Pie } from "react-chartjs-2"
import { useQuery } from "react-query"
import { useCustomTheme } from "theme"
import {
  SalesAnalyticsRequest,
  SalesAnalyticsResponse,
  SalesAnalyticsSeachFilter,
} from "type/analytics/sales"
import { getColorsForItem } from "util/colors"
import {
  getFirstCurrentMonthDateString,
  getLastCurrentMonthDateString,
} from "util/dates"

type ChartDataType = ChartData<"pie">
type ChartOptionsType = ChartOptions<"pie">

const options: ChartOptionsType = {
  responsive: true,
  interaction: {
    mode: "nearest",
    intersect: false,
  },
  plugins: {
    legend: {
      position: "bottom",
      align: "center",
      labels: {
        pointStyleWidth: 18,
        usePointStyle: true,
      },
    },
  },
}

export const SalesStatesChart: FC = () => {
  const { colors } = useCustomTheme()

  const { searchFilter, setSearchFilter } =
    useTableContext<SalesAnalyticsSeachFilter>()

  const shopId = searchFilter?.shop_id
  const countryId = searchFilter?.country_id
  const startDate = searchFilter?.start_date
  const endDate = searchFilter?.end_date

  const isRequestEnabled = !!shopId && !!countryId && !!startDate && !!endDate

  const {
    data: salesAnalytics,
    isLoading,
    isRefetching,
    refetch,
  } = useQuery<SalesAnalyticsResponse>(
    ["salesAnalytics", searchFilter],
    () =>
      getSalesAnalytics({
        shop_id: shopId,
        start_date: startDate,
        end_date: endDate,
        country_id: countryId,
      } as SalesAnalyticsRequest),
    {
      enabled: isRequestEnabled,
    },
  )
  const salesAnalyticsResults = salesAnalytics?.state_sales.slice(0, 10)

  const getColor = (id: number, type: "bg" | "border") => {
    const [bgColor, borderColor] = getColorsForItem(colors, id)

    switch (type) {
      case "bg":
        return bgColor
      case "border":
        return borderColor
    }
  }

  const data: ChartDataType = {
    labels: salesAnalyticsResults?.map(({ state }) => state.name),
    datasets: [
      {
        label: "Orders Count",
        data:
          salesAnalyticsResults?.map((state) => state.total_orders_count) || [],

        backgroundColor:
          (salesAnalyticsResults?.map((_, index) =>
            getColor(index + 1, "bg"),
          ) as Color[]) || [],
        borderColor:
          (salesAnalyticsResults?.map((_, index) =>
            getColor(index + 1, "border"),
          ) as Color[]) || [],
        borderWidth: 1,
      },
    ],
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
            } as SalesAnalyticsRequest),
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
            } as SalesAnalyticsRequest),
        )
      }
    },
    // eslint-disable-next-line react-hooks/exhaustive-deps
    [],
  )

  useEffect(() => {
    if (isRequestEnabled) {
      refetch()
    }
  }, [refetch, isRequestEnabled])

  if (isLoading || isRefetching) {
    return <LoadingPage />
  }

  if (!isRequestEnabled || !salesAnalyticsResults?.length) {
    let message = "No data found to draw chart"

    if (!isRequestEnabled) {
      message = "Select Shop, Country and period to see chart"
    }

    return (
      <Flex w="full" justifyContent="center" py={10}>
        <Text>{message}</Text>
      </Flex>
    )
  }

  return <Pie options={options} data={data} />
}
