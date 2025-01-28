import { SimpleGrid } from "@chakra-ui/react"
import { getAllDevices } from "api/authorizedDevice/authorizedDevice"
import { DeviceCard } from "component/authorizedDevice/DeviceCard"
import { NewDeviceCard } from "component/authorizedDevice/NewDeviceCard"
import { LoadingPage } from "component/page/LoadingPage"
import { Page } from "component/page/Page"
import { PageHeading } from "component/page/PageHeading"
import { useSearchContext } from "context/search"
import { useAuthorizedDevice } from "hook/useAuthorizedDevice"
import { FC } from "react"
import { useQuery } from "react-query"
import { AuthorizedDevice } from "type/authorizedDevice/authorizedDevice"
import { PageProps } from "type/page/page"
import { WithId } from "type/withId"

export const AuthorizedDevices: FC = (props: PageProps) => {
  const { guideNotionPageId } = props

  const { query, isQueryExists } = useSearchContext()
  const { isDeviceAuthorized } = useAuthorizedDevice()

  const { data: devicesList, isLoading } = useQuery<WithId<AuthorizedDevice>[]>(
    "devicesList",
    getAllDevices,
  )

  const filteredDevicesList = devicesList?.filter((device) =>
    isQueryExists
      ? device.name.toLowerCase().includes(query.toLowerCase())
      : devicesList,
  )

  return (
    <Page guideNotionPageId={guideNotionPageId}>
      <PageHeading title="Authorized Devices" isSearchDisabled={isLoading} />

      {!isLoading ? (
        <SimpleGrid
          columns={{ base: 1, sm: 2, md: 3, lg: 4, xl: 6 }}
          spacing={10}
        >
          {!isDeviceAuthorized && <NewDeviceCard />}

          {filteredDevicesList?.map((device, index) => (
            <DeviceCard key={index} device={device} />
          ))}
        </SimpleGrid>
      ) : (
        <LoadingPage />
      )}
    </Page>
  )
}
