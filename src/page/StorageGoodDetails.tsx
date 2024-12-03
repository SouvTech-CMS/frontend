import { Divider, Flex, Heading, SimpleGrid } from "@chakra-ui/react"
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

  const storagesList = storageGood?.storages
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

            <SimpleGrid
              columns={{ base: 1, sm: 2, md: 2, lg: 3, xl: 4 }}
              spacing={5}
            >
              <NewStorageCard storageGoodId={storageGoodId} />

              {storagesList?.map((storage, index) => (
                <StorageCard key={index} storage={storage} />
              ))}
            </SimpleGrid>
          </Flex>
        </Flex>
      )}
    </Page>
  )
}
