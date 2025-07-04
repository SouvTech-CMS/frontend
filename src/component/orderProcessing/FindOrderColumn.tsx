import { Flex, Text } from "@chakra-ui/react"
import { getReadyToProcessingOrderByMarketplaceId } from "api/engraver/processingOrder"
import { getOrderInProcessingByMarketplaceOrderId } from "api/order/order"
import { AxiosError } from "axios"
import { Container } from "component/Container"
import { OrderIdSearchInput } from "component/orderProcessing/OrderIdSearchInput"
import { OrderToEngravingCard } from "component/orderProcessing/OrderToEngravingCard"
import { LoadingPage } from "component/page/LoadingPage"
import { FC, useEffect, useState } from "react"
import { useQuery } from "react-query"
import { Order } from "type/order/order"
import { WithId } from "type/withId"
import { notify } from "util/toasts"

interface FindOrderColumnProps {
  isReadyToProcessing?: boolean
  isReadOnly?: boolean
}

export const FindOrderColumn: FC<FindOrderColumnProps> = (props) => {
  const { isReadyToProcessing, isReadOnly } = props

  const [marketplaceOrderId, setMarketplaceOrderId] = useState<string>("")
  const [order, setOrder] = useState<WithId<Order>>()

  const isInvalid = !marketplaceOrderId || marketplaceOrderId.length < 10

  const processingOrder = order?.processing_order

  const getOrderFunc = isReadyToProcessing
    ? getReadyToProcessingOrderByMarketplaceId
    : getOrderInProcessingByMarketplaceOrderId

  const { isLoading: isOrderLoading, refetch } = useQuery<WithId<Order>>(
    ["order", marketplaceOrderId],
    () => getOrderFunc(marketplaceOrderId!),
    {
      enabled: false,
      retry: false,
      onSuccess: (response) => {
        setOrder(response)
      },
      onError: (error) => {
        if (error instanceof AxiosError) {
          const statusCode = error.response?.status

          if (statusCode === 404) {
            setOrder(undefined)
          } else {
            notify("Some error occurred", "error")
          }
        }
      },
    },
  )
  const isOrderExists = !!order && !isInvalid

  useEffect(() => {
    if (!isInvalid) {
      refetch()
    }
  }, [refetch, isInvalid])

  return (
    <Container h="full" w="full">
      {/* Order ID Input */}
      <OrderIdSearchInput
        orderId={marketplaceOrderId}
        setOrderId={setMarketplaceOrderId}
        isInvalid={isInvalid}
      />

      {/* Order Loading */}
      {isOrderLoading && <LoadingPage />}

      {/* Invalid Order ID text */}
      {isInvalid && (
        <Flex
          w="full"
          justifyContent="center"
          alignItems="center"
          py={10}
          textAlign="center"
        >
          <Text fontSize="lg" color="hint">
            Enter full Order ID in search field
            <br />
            and the Order will shown here
          </Text>
        </Flex>
      )}

      {/* Order not found */}
      {!isInvalid && !isOrderLoading && !isOrderExists && (
        <Flex
          w="full"
          justifyContent="center"
          alignItems="center"
          py={10}
          textAlign="center"
        >
          <Text fontSize="lg" color="hint">
            Order with ID {marketplaceOrderId} not found
          </Text>
        </Flex>
      )}

      {/* Order found by entered ID */}
      {!isInvalid && !isOrderLoading && isOrderExists && (
        <OrderToEngravingCard
          order={order}
          processingOrder={processingOrder}
          isReadOnly={isReadOnly}
        />
      )}
    </Container>
  )
}
