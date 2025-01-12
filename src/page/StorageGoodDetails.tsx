import { Divider, Flex } from "@chakra-ui/react"
import { getGoodWithStoragesById } from "api/storage/storageGood"
import { CollapsibleCardsGrid } from "component/CollapsibleCardsGrid"
import { LoadingPage } from "component/page/LoadingPage"
import { Page } from "component/page/Page"
import { PageHeading } from "component/page/PageHeading"
import { NewStorageCard } from "component/storage/NewStorageCard"
import { StorageCard } from "component/storage/StorageCard"
import { StorageGoodProperties } from "component/storageGood/StorageGoodProperties"
import { StorageGoodDefectCard } from "component/storageGoodDefect/StorageGoodDefectCard"
import { useQuery } from "react-query"
import { useParams } from "react-router-dom"
import { PageProps } from "type/page/page"
import { FullStorageGood } from "type/storage/storageGood"

type StorageGoodDetailsParams = {
  id: string
}

export const StorageGoodDetails = (props: PageProps) => {
  const { guideNotionPageId } = props

  const { id } = useParams<StorageGoodDetailsParams>()
  const storageGoodId = Number(id)

  const { data: storageGood, isLoading } = useQuery<FullStorageGood>(
    ["goodWithStorages", storageGoodId],
    () => getGoodWithStoragesById(storageGoodId),
    {
      enabled: storageGoodId > 0,
    },
  )
  const isStorageGoodExists = !!storageGood

  const storagesList = storageGood?.storages
  const defectsList = storageGood?.defects

  return (
    <Page guideNotionPageId={guideNotionPageId}>
      <PageHeading title={`Storage Good #${storageGoodId}`} isSearchHidden />

      {isLoading && <LoadingPage />}

      {isStorageGoodExists && (
        <Flex direction="column" justifyContent="flex-start" gap={10}>
          {/* StorageGood Properties */}
          <StorageGoodProperties storageGood={storageGood} />

          <Divider borderWidth={1} />

          {/* Storages Cards Grid */}
          <CollapsibleCardsGrid
            heading="Storage Records"
            defaultExpanded
            isDisabled={isLoading}
          >
            <NewStorageCard storageGoodId={storageGoodId} />

            {storagesList?.map((storage, index) => (
              <StorageCard key={index} storage={storage} />
            ))}
          </CollapsibleCardsGrid>

          {/* Defects Cards Grid */}
          <CollapsibleCardsGrid
            heading="Defects"
            defaultExpanded
            isDisabled={isLoading}
          >
            {/* TODO: maybe add btn to create defects */}
            {/* <NewStorageCard storageGoodId={storageGoodId} /> */}

            {defectsList?.map((defect, index) => (
              <StorageGoodDefectCard key={index} defect={defect} />
            ))}
          </CollapsibleCardsGrid>
        </Flex>
      )}
    </Page>
  )
}
