import { Flex, Heading, Text } from "@chakra-ui/react"
import { getOrderByMarketplaceId } from "api/engraver/processingOrder"
import { AxiosError } from "axios"
import { OrderIdSearchInput } from "component/orderProcessing/OrderIdSearchInput"
import { OrderToEngravingCard } from "component/orderProcessing/OrderToEngravingCard"
import { LoadingPage } from "component/page/LoadingPage"
import { Page } from "component/page/Page"
import { PageHeading } from "component/page/PageHeading"
import { WorkShiftFinishBtn } from "component/workShift/WorkShiftFinishBtn"
import { useEngravingContext } from "context/engraving"
import { useUserContext } from "context/user"
import { useAuthorizedDevice } from "hook/useAuthorizedDevice"
import { useEffect, useState } from "react"
import { useQuery } from "react-query"
import { Navigate } from "react-router-dom"
import { Order } from "type/order/order"
import { WithId } from "type/withId"
import { notify } from "util/toasts"

export const OrdersForEngraving = () => {
  const { isProcessingOrdersListLoading } = useEngravingContext()
  const { isUserEngraver, isLoadingCurrentUser } = useUserContext()
  const { isDeviceAuthorized, isCheckingDevice } = useAuthorizedDevice()

  const [marketplaceOrderId, setMarketplaceOrderId] = useState<string>("")
  const [order, setOrder] = useState<WithId<Order>>()

  const isInvalid = !marketplaceOrderId || marketplaceOrderId.length < 10

  const { isLoading: isOrderLoading, refetch } = useQuery<WithId<Order>>(
    ["order", marketplaceOrderId],
    () => getOrderByMarketplaceId(marketplaceOrderId!),
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
  const isOrderExists = !!order

  const isLoading =
    isLoadingCurrentUser || isCheckingDevice || isProcessingOrdersListLoading

  useEffect(() => {
    if (!isInvalid) {
      refetch()
    }
  }, [refetch, isInvalid])

  if (isLoading) {
    return <LoadingPage />
  }

  if (!isUserEngraver) {
    return <Navigate to="/noaccess" />
  }

  if (!isDeviceAuthorized) {
    return <DeviceNotAuthorized />
  }

  return (
    <Page>
      <PageHeading title="Order Processing" isSearchHidden />

      <Flex
        h="full"
        w="full"
        direction="column"
        justifyContent="center"
        alignItems="center"
        mt={20}
        gap={10}
      >
        {/* Order ID Search Input */}
        <Flex>
          <OrderIdSearchInput
            orderId={marketplaceOrderId}
            setOrderId={setMarketplaceOrderId}
            isInvalid={isInvalid}
          />
        </Flex>

        {/* Invalid Order ID text */}
        {isInvalid && (
          <Flex
            w="full"
            justifyContent="center"
            alignItems="center"
            py={20}
            textAlign="center"
          >
            <Text fontSize="xl">
              Enter full Order ID in search field
              <br />
              and the Order will shown here
            </Text>
          </Flex>
        )}

        {/* Order Loading */}
        {isOrderLoading && <LoadingPage />}

        {/* Order not found */}
        {!isOrderLoading && !isInvalid && !isOrderExists && (
          <Flex
            w="full"
            justifyContent="center"
            alignItems="center"
            py={20}
            textAlign="center"
          >
            <Text fontSize="xl">
              Order with ID {marketplaceOrderId} not found
            </Text>
          </Flex>
        )}

        {/* Order found by entered ID */}
        {isOrderExists && <OrderToEngravingCard order={order} />}

        <WorkShiftFinishBtn />
      </Flex>
    </Page>
  )
}

const DeviceNotAuthorized = () => {
  return (
    <Flex w="full" justifyContent="center" alignItems="center">
      <Flex
        direction="column"
        justifyContent="center"
        alignItems="center"
        textAlign="center"
        gap={5}
      >
        <Heading size="lg">You cannot process orders from this device</Heading>

        <Text fontSize="lg">
          Please, try again on authorized device or contact
          <br />
          your administrator to authorize this device
        </Text>
      </Flex>
    </Flex>
  )
}
