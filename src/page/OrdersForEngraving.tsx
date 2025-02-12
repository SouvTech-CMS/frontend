import { Flex, Heading, Text } from "@chakra-ui/react"
import { getOrderByMarketplaceId } from "api/processingOrder/processingOrder"
import { OrderIdSearchInput } from "component/orderProcessing/OrderIdSearchInput"
import { OrderToEngravingCard } from "component/orderProcessing/OrderToEngravingCard"
import { LoadingPage } from "component/page/LoadingPage"
import { Page } from "component/page/Page"
import { PageHeading } from "component/page/PageHeading"
import { useUserContext } from "context/user"
import { useAuthorizedDevice } from "hook/useAuthorizedDevice"
import { useEffect, useState } from "react"
import { useQuery } from "react-query"
import { Navigate } from "react-router-dom"
import { OrderWithDetailedGoods } from "type/order/order"
import { WithId } from "type/withId"

export const OrdersForEngraving = () => {
  const { isUserEngraver, isLoadingCurrentUser } = useUserContext()
  const { isDeviceAuthorized, isCheckingDevice } = useAuthorizedDevice()

  const [marketplaceOrderId, setMarketplaceOrderId] = useState<string>("")

  const { data: order, refetch } = useQuery<WithId<OrderWithDetailedGoods>>(
    ["order", marketplaceOrderId],
    () => getOrderByMarketplaceId(marketplaceOrderId!),
    {
      enabled: false,
      retry: false,
    },
  )
  const isOrderExists = !!order

  const isInvalid = !marketplaceOrderId || marketplaceOrderId.length < 10

  useEffect(() => {
    if (!isInvalid) {
      refetch()
    }
  }, [refetch, isInvalid])

  if (isLoadingCurrentUser || isCheckingDevice) {
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

        {/* Not Found Order text */}
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

        {!isInvalid && !isOrderExists && (
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
