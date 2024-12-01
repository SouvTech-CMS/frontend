import { getAllPlacements } from "api/shelf/shelfPlacement"
import { LoadingPage } from "component/page/LoadingPage"
import { Page } from "component/page/Page"
import { PageHeading } from "component/page/PageHeading"
import { ShelfPlacementTabs } from "component/shelfPlacement/ShelfPlacementTabs"
import { useQuery } from "react-query"
import { ApiResponse } from "type/api/apiResponse"
import { PageProps } from "type/page/page"
import { PlacementWithShelfsWithStorageGoods } from "type/shelf/shelfPlacement"

export const Shelfs = (props: PageProps) => {
  const { guideNotionPageId } = props

  const { data: placementsList, isLoading } = useQuery<
    ApiResponse<PlacementWithShelfsWithStorageGoods[]>
  >("placementsList", getAllPlacements)

  const placements = placementsList?.result

  return (
    <Page guideNotionPageId={guideNotionPageId}>
      <PageHeading title="Shelfs" isSearchHidden />

      {!isLoading ? (
        <ShelfPlacementTabs placementsList={placements} />
      ) : (
        <LoadingPage />
      )}
    </Page>
  )
}
