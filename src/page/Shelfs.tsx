import { getAllPlacements } from "api/shelf/shelfPlacement"
import { Container } from "component/Container"
import { LoadingPage } from "component/page/LoadingPage"
import { Page } from "component/page/Page"
import { PageHeading } from "component/page/PageHeading"
import { ShelfPlacementTable } from "component/shelfPlacement/ShelfPlacementTable"
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
        <Container>
          <ShelfPlacementTable placementsList={placements} />
        </Container>
      ) : (
        <LoadingPage />
      )}
    </Page>
  )
}
