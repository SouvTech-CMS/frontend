// Styles for Notion Pages
import "prismjs/themes/prism-tomorrow.css"
import "react-notion/src/styles.css"
import "util/notion/notion.css"

import { getNotionGuideById } from "api/guide/guide"
import { Container } from "component/Container"
import { LoadingPage } from "component/page/LoadingPage"
import { Page } from "component/page/Page"
import { PageHeading } from "component/page/PageHeading"
import { NotionRenderer } from "react-notion"
import { useQuery } from "react-query"
import { useParams } from "react-router-dom"
import { parseGuideId } from "util/guide"
import { getPageTitle } from "util/notion/notion"

type GuideParams = {
  id: string
}

export const Guides = () => {
  const { id } = useParams<GuideParams>()

  const guideId = parseGuideId(id)

  const isGuideIdExists = guideId?.trim !== undefined

  const { data: guideContent, isLoading } = useQuery(
    ["guide", guideId],
    () => getNotionGuideById(guideId!),
    {
      enabled: isGuideIdExists,
    },
  )
  const isGuideContentExists = isGuideIdExists && guideContent !== undefined

  const notionPageTitle = isGuideContentExists
    ? getPageTitle(guideId, guideContent)
    : ""

  // TODO: set darkMode to NotionRenderer when we add dakr mode for all frontend

  return (
    <Page>
      <PageHeading title={notionPageTitle} isSearchHidden />

      {isLoading && !isGuideContentExists && <LoadingPage />}

      {!isLoading && isGuideContentExists && (
        <Container w="60%" alignSelf="center">
          <NotionRenderer blockMap={guideContent} />
        </Container>
      )}
    </Page>
  )
}
