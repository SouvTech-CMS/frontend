import { Divider, Flex, Grid, GridItem, Heading } from "@chakra-ui/react"
import { getGoodWithStoragesById } from "api/storage/storageGood"
import { LoadingPage } from "component/page/LoadingPage"
import { Page } from "component/page/Page"
import { PageHeading } from "component/page/PageHeading"
import { GoodStorageCard } from "component/storageGood/GoodStorageCard"
import { StorageGoodProperties } from "component/storageGood/StorageGoodProperties"
import { Role } from "constant/roles"
import { withAuthAndRoles } from "hook/withAuthAndRoles"
import { useQuery } from "react-query"
import { useParams } from "react-router-dom"
import { GoodWithStorages } from "type/storage/storageGood"

type StorageGoodDetailsParams = {
  id: string
}

const StorageGoodDetails = () => {
  const { id } = useParams<StorageGoodDetailsParams>()
  const storageGoodId = Number(id)

  const { data: storageGood, isLoading } = useQuery<GoodWithStorages>(
    ["goodWithStorages", storageGoodId],
    () => getGoodWithStoragesById(storageGoodId),
    {
      enabled: storageGoodId > 0,
    },
  )
  const storagesList = storageGood?.storage
  const isGoodWithStoragesExists =
    storageGood !== undefined && storageGood !== undefined

  return (
    <Page>
      <PageHeading title={`Storage Good #${storageGoodId}`} isSearchHidden />

      {isLoading && <LoadingPage />}

      {isGoodWithStoragesExists && (
        <Flex direction="column" justifyContent="flex-start" gap={10}>
          {/* StorageGood Properties */}
          <StorageGoodProperties storageGood={storageGood} />

          <Divider borderWidth={1} />

          <Flex direction="column" gap={5}>
            <Heading size="lg">Purchases of Good</Heading>

            <Grid templateColumns="repeat(3, 1fr)" gap={5}>
              {storagesList?.map((storage, index) => (
                <GridItem key={index}>
                  <GoodStorageCard storage={storage} />
                </GridItem>
              ))}
            </Grid>
          </Flex>
        </Flex>
      )}
    </Page>
  )
}

export default withAuthAndRoles([Role.MANAGER])(StorageGoodDetails)
