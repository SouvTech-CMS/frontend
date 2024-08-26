import { SimpleGrid } from "@chakra-ui/react"
import { getAllSuppliers } from "api/supplier/supplier"
import { LoadingPage } from "component/page/LoadingPage"
import { Page } from "component/page/Page"
import { PageHeading } from "component/page/PageHeading"
import { NewSupplierCard } from "component/supplier/NewSupplierCard"
import { SupplierCard } from "component/supplier/SupplierCard"
import { useSearchContext } from "context/search"
import { useQuery } from "react-query"
import { PageProps } from "type/page/page"
import { SupplierWithManagers } from "type/supplier/supplier"

export const Suppliers = (props: PageProps) => {
  const { guideNotionPageId } = props

  const { query, isQueryExists } = useSearchContext()

  const { data: suppliersList, isLoading } = useQuery<SupplierWithManagers[]>(
    "suppliersWithManagersList",
    getAllSuppliers,
  )

  const filteredSuppliersList = suppliersList?.filter(({ name, address }) =>
    isQueryExists
      ? name.toLowerCase().includes(query.toLowerCase()) ||
        address?.toLowerCase().includes(query.toLowerCase())
      : suppliersList,
  )

  return (
    <Page guideNotionPageId={guideNotionPageId}>
      <PageHeading title="Suppliers" isSearchDisabled={isLoading} />

      {!isLoading ? (
        <SimpleGrid
          columns={{ base: 1, sm: 2, md: 3, lg: 4, xl: 5 }}
          spacing={10}
        >
          <NewSupplierCard />

          {filteredSuppliersList?.map((supplier, index) => (
            <SupplierCard key={index} supplier={supplier} />
          ))}
        </SimpleGrid>
      ) : (
        <LoadingPage />
      )}
    </Page>
  )
}
