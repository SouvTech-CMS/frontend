import { Flex, Heading, Text } from "@chakra-ui/react"
import { TakeBreakBtn } from "component/orderProcessing/buttons/TakeBreakBtn"
import { OrdersColumns } from "component/orderProcessing/OrdersColumns"
import { LoadingPage } from "component/page/LoadingPage"
import { Page } from "component/page/Page"
import { PageHeading } from "component/page/PageHeading"
import { WorkShiftFinishBtn } from "component/workShift/WorkShiftFinishBtn"
import { useUserContext } from "context/user"
import { useAuthorizedDevice } from "hook/useAuthorizedDevice"
import { Navigate } from "react-router-dom"

export const OrdersForEngraving = () => {
  const { isUserEngraver, isLoadingCurrentUser } = useUserContext()
  const { isDeviceAuthorized, isCheckingDevice } = useAuthorizedDevice()

  const isLoading = isLoadingCurrentUser || isCheckingDevice

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

      <Flex direction="column" flexGrow={1} flexShrink={1} flexBasis={0}>
        <Flex flexGrow={1} flexShrink={1} flexBasis={0} minH={0}>
          <OrdersColumns />
        </Flex>

        <Flex
          w="full"
          direction="row"
          justifyContent="flex-end"
          mt="auto"
          pt={5}
          gap={2}
        >
          <TakeBreakBtn />

          <WorkShiftFinishBtn />
        </Flex>
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
