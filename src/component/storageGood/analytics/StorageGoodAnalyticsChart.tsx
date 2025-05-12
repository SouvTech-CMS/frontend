import { Flex, Text } from "@chakra-ui/react"
import { getStorageGoodAnalyticsById } from "api/analytics/storageGoods"
import { ChartData, ChartOptions } from "chart.js"
import { ChartSection } from "component/chart/ChartSection"
import { LoadingPage } from "component/page/LoadingPage"
import { useTableContext } from "context/table"
import { FC, useEffect } from "react"
import { Line } from "react-chartjs-2"
import { useQuery } from "react-query"
import { useCustomTheme } from "theme"
import { StorageGoodAnalyticsResponse } from "type/analytics/storageGood"
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
      display: false,
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

interface StorageGoodAnalyticsChartProps {
  storageGoodId: number
}

export const StorageGoodAnalyticsChart: FC<StorageGoodAnalyticsChartProps> = (
  props,
) => {
  const { storageGoodId } = props

  const { colors } = useCustomTheme()

  const { searchFilter, setSearchFilter } = useTableContext<OrderSearchFilter>()

  const shopId = searchFilter?.shop_id
  const startDate = searchFilter?.start_date
  const endDate = searchFilter?.end_date

  const isRequestEnabled = !!startDate && !!endDate && !!storageGoodId

  const {
    data: storageGoodAnalytics,
    isLoading,
    refetch,
  } = useQuery<StorageGoodAnalyticsResponse>(
    ["storageGoodAnalytics", storageGoodId],
    () =>
      getStorageGoodAnalyticsById({
        storage_good_id: storageGoodId,
        shops: !!shopId ? [shopId] : undefined,
        start_date: startDate!,
        end_date: endDate!,
      }),
    { enabled: isRequestEnabled },
  )
  const isAnalyticsExist = !!storageGoodAnalytics

  const storageGood = storageGoodAnalytics?.storage_good
  const sku = storageGood?.uniquename

  const totalCount = storageGoodAnalytics?.total_count

  const [bgColor, borderColor] = getColorsForItem(colors, 2)

  const data: LineChartData = {
    labels: storageGoodAnalytics?.labels?.map((label) =>
      formatDate(dateAsStringToDate(label), true, false),
    ),
    datasets: [
      {
        label: `${sku}`,
        data: storageGoodAnalytics?.data.map(({ count }) => count) || [],

        backgroundColor: `${bgColor}`,
        borderColor: `${borderColor}`,
      },
    ],
  }

  // Refetch Analytics
  useEffect(() => {
    if (isRequestEnabled) {
      refetch()
    }
  }, [refetch, shopId, startDate, endDate, storageGoodId])

  // Update Search Filter dates
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

  return (
    <ChartSection
      w="50%"
      direction="column"
      title="Sales Analytics"
      withShopFilter
      withDatesFilter
      gap={3}
    >
      {isLoading && <LoadingPage />}

      {!isAnalyticsExist && !isLoading && (
        <Flex w="full" justifyContent="center" alignItems="center" py={4}>
          <Text color="hint">Select dates period to see analytics</Text>
        </Flex>
      )}

      {/* Chart */}
      {isAnalyticsExist && !isLoading && <Line options={options} data={data} />}

      {/* Total */}
      <Flex
        w="full"
        direction="row"
        justifyContent="flex-end"
        alignItems="center"
      >
        <Text fontSize="xl" fontWeight="semibold">
          Total count: {totalCount}
        </Text>
      </Flex>
    </ChartSection>
  )
}
