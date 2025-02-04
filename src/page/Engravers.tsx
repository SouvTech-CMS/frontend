import { SimpleGrid } from "@chakra-ui/react"
import { getAllEngravers } from "api/engraver/engraver"
import { EngraverCard } from "component/engraver/EngraverCard"
import { NewEngraverCard } from "component/engraver/NewEngraverCard"
import { LoadingPage } from "component/page/LoadingPage"
import { Page } from "component/page/Page"
import { PageHeading } from "component/page/PageHeading"
import { useSearchContext } from "context/search"
import { useQuery } from "react-query"
import { Engraver } from "type/engraver/engraver"
import { PageProps } from "type/page/page"
import { WithId } from "type/withId"

export const Engravers = (props: PageProps) => {
  const { guideNotionPageId } = props

  const { query, isQueryExists } = useSearchContext()

  const { data: engraversList, isLoading } = useQuery<WithId<Engraver>[]>(
    "engraversList",
    getAllEngravers,
  )

  const filteredEngraversList = engraversList?.filter(({ user }) =>
    isQueryExists
      ? user.username.toLowerCase().includes(query.toLowerCase()) ||
        user.fio?.toLowerCase().includes(query.toLowerCase()) ||
        user.phone?.toLowerCase().includes(query.toLowerCase()) ||
        user.email?.toLowerCase().includes(query.toLowerCase())
      : engraversList,
  )

  return (
    <Page guideNotionPageId={guideNotionPageId}>
      <PageHeading title="Engravers" isSearchDisabled={isLoading} />

      {!isLoading ? (
        <SimpleGrid columns={{ base: 1, md: 2, lg: 3, xl: 4 }} spacing={10}>
          <NewEngraverCard />

          {filteredEngraversList?.map((engraver, index) => (
            <EngraverCard key={index} engraver={engraver} />
          ))}
        </SimpleGrid>
      ) : (
        <LoadingPage />
      )}
    </Page>
  )
}
