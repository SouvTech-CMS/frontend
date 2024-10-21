import { Divider, Flex, Grid, GridItem, Heading } from "@chakra-ui/react"
import { getGoodWithStoragesById } from "api/storage/storageGood"
import { LoadingPage } from "component/page/LoadingPage"
import { Page } from "component/page/Page"
import { PageHeading } from "component/page/PageHeading"
import { NewStorageCard } from "component/storage/NewStorageCard"
import { StorageCard } from "component/storage/StorageCard"
import { StorageGoodProperties } from "component/storageGood/StorageGoodProperties"
import { useQuery } from "react-query"
import { useParams } from "react-router-dom"
import { PageProps } from "type/page/page"
import { GoodWithStorages } from "type/storage/storageGood"

type StorageGoodDetailsParams = {
  id: string
}

export const StorageGoodDetails = (props: PageProps) => {
  const { guideNotionPageId } = props

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
    <Page guideNotionPageId={guideNotionPageId}>
      <PageHeading title={`Storage Good #${storageGoodId}`} isSearchHidden />

      {isLoading && <LoadingPage />}

      {isGoodWithStoragesExists && (
        <Flex direction="column" justifyContent="flex-start" gap={10}>
          {/* StorageGood Properties */}
          <StorageGoodProperties storageGood={storageGood} />

          <Divider borderWidth={1} />

          <Flex direction="column" gap={5}>
            <Heading size="lg">Storage Records</Heading>

            <Grid templateColumns="repeat(4, 1fr)" gap={5}>
              <GridItem>
                <NewStorageCard storageGoodId={storageGoodId} />
              </GridItem>

              {storagesList?.map((storage, index) => (
                <GridItem key={index}>
                  <StorageCard storage={storage} />
                </GridItem>
              ))}
            </Grid>
          </Flex>
        </Flex>
      )}
    </Page>
  )
}
