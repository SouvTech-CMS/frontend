import { getAllPlacements } from "api/shelf/shelfPlacement"
import { LoadingPage } from "component/page/LoadingPage"
import { Page } from "component/page/Page"
import { PageHeading } from "component/page/PageHeading"
import { PlacementsTabsWithShelves } from "component/shelfPlacement/PlacementsTabsWithShelves"
import { useQuery } from "react-query"
import { ApiResponse } from "type/api/apiResponse"
import { PageProps } from "type/page/page"
import { PlacementWithShelvesWithStorageGoods } from "type/shelf/shelfPlacement"

export const Shelves = (props: PageProps) => {
  const { guideNotionPageId } = props

  const { data: placementsList, isLoading } = useQuery<
    ApiResponse<PlacementWithShelvesWithStorageGoods[]>
  >("placementsList", getAllPlacements)

  const placements = placementsList?.result

  return (
    <Page guideNotionPageId={guideNotionPageId}>
      <PageHeading title="Shelves" isSearchHidden />

      {!isLoading ? (
        <PlacementsTabsWithShelves placementsList={placements} />
      ) : (
        <LoadingPage />
      )}
    </Page>
  )
}
