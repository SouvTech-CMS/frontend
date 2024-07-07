import { SimpleGrid } from "@chakra-ui/react"
import { getAllSuppliers } from "api/supplier"
import { LoadingPage } from "component/LoadingPage"
import { Page } from "component/Page"
import { PageHeading } from "component/PageHeading"
import { NewSupplierCard } from "component/suppliers/NewSupplierCard"
import { SupplierCard } from "component/suppliers/SupplierCard"
import { Role } from "constant/roles"
import { useSearchContext } from "context/search"
import { useQuery } from "react-query"
import { Supplier } from "type/supplier"
import { WithId } from "type/withId"
import { withAuthAndRoles } from "hook/withAuthAndRoles"

const Suppliers = () => {
  const { query, isQueryExists } = useSearchContext()

  const { data: suppliersList, isLoading } = useQuery<WithId<Supplier>[]>(
    "suppliersList",
    getAllSuppliers
  )

  const filteredSuppliersList = suppliersList?.filter(({ name, address }) =>
    isQueryExists
      ? name.toLowerCase().includes(query.toLowerCase()) ||
        address?.toLowerCase().includes(query.toLowerCase())
      : suppliersList
  )

  return (
    <Page>
      <PageHeading title="Suppliers" isDisabled={isLoading} />

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

export default withAuthAndRoles([Role.STORAGER])(Suppliers)
