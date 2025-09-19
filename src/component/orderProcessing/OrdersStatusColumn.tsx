import { Flex, Heading, Text } from "@chakra-ui/react"
import { getProcessingOrdersByEngraverId } from "api/engraver/processingOrder"
import { Container } from "component/Container"
import { OrderToEngravingCard } from "component/orderProcessing/OrderToEngravingCard"
import { LoadingPage } from "component/page/LoadingPage"
import { ProcessingOrderStatus } from "constant/orderStatus"
import { usePaginationContext } from "context/pagination"
import { useUserContext } from "context/user"
import { usePagination } from "hook/usePagination"
import { FC, useEffect, useState } from "react"
import { useQuery } from "react-query"
import { ProcessingOrder } from "type/engraver/processingOrder"
import { WithId } from "type/withId"

interface OrdersStatusColumnProps {
  title?: string
  status: ProcessingOrderStatus
  isReadOnly?: boolean
}

export const OrdersStatusColumn: FC<OrdersStatusColumnProps> = (props) => {
  const { title, status, isReadOnly } = props

  const { currentEngraverId } = useUserContext()

  const { currentPage, setCurrentPage, resetCurrentPage, offset, setOffset } =
    usePagination()
  const { rowsPerPageCount } = usePaginationContext()

  const [ordersList, setOrdersList] = useState<WithId<ProcessingOrder>[]>([])
  const [totalCount, setTotalCount] = useState<number>(0)

  const isOrdersExist = ordersList.length > 0

  const { isLoading, isRefetching, refetch } = useQuery(
    ["processingOrdersList", currentEngraverId, status],
    () =>
      getProcessingOrdersByEngraverId({
        limit: rowsPerPageCount,
        offset,
        searchFilter: {
          status,
          engraver_id: currentEngraverId,
        } as WithId<ProcessingOrder>,
      }),
    {
      enabled: !!currentEngraverId,
      onSuccess: (response) => {
        setTotalCount(response.count)
        setOrdersList((prevOrders) => [...prevOrders, ...response.result])
      },
    },
  )

  const isPaused = status === ProcessingOrderStatus.PAUSED
  const isCompleted = status === ProcessingOrderStatus.FINISHED

  const handleScroll = (e: React.UIEvent<HTMLDivElement>) => {
    const target = e.currentTarget
    const isAtBottom =
      target.scrollHeight === target.scrollTop + target.clientHeight

    const isHasMore = totalCount > ordersList.length
    if (isAtBottom && isHasMore && !isLoading) {
      setCurrentPage((prevPage) => prevPage + 1)
    }
  }

  useEffect(() => {
    const newOffset = currentPage * rowsPerPageCount
    setOffset(newOffset)
  }, [setOffset, currentPage, rowsPerPageCount])

  useEffect(() => {
    refetch()
  }, [refetch, offset, rowsPerPageCount])

  return (
    <Container h="full" w="full">
      <Heading size="lg">{title}</Heading>

      {!isLoading && !isOrdersExist && isPaused && (
        <Flex
          w="full"
          justifyContent="center"
          alignItems="center"
          textAlign="center"
        >
          <Text fontSize="lg" color="hint">
            Here will be the orders that
            <br />
            you started but not finished,
            <br />
            and you can continue them
          </Text>
        </Flex>
      )}

      {!isLoading && !isOrdersExist && isCompleted && (
        <Flex
          w="full"
          justifyContent="center"
          alignItems="center"
          textAlign="center"
        >
          <Text fontSize="lg" color="hint">
            Here will be the orders that you
            <br />
            finished, but you can redo them
          </Text>
        </Flex>
      )}

      {!isLoading && isOrdersExist && (
        <Flex
          maxH="full"
          w="full"
          direction="column"
          gap={3}
          overflowY="auto"
          onScroll={handleScroll}
        >
          {ordersList.map(({ order, ...processingOrder }, index) => (
            <OrderToEngravingCard
              key={index}
              order={order}
              processingOrder={processingOrder}
              isReadOnly={isReadOnly}
            />
          ))}
        </Flex>
      )}

      {isLoading || (isRefetching && <LoadingPage />)}
    </Container>
  )
}
