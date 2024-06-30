import {
  Flex,
  Heading,
  Input,
  InputGroup,
  InputRightElement,
  SimpleGrid,
  Spinner,
} from "@chakra-ui/react"
import { getAllSuppliers } from "api/supplier"
import { NewSupplierCard } from "component/suppliers/NewSupplierCard"
import { SupplierCard } from "component/suppliers/SupplierCard"
import { ChangeEvent, useState } from "react"
import { FiSearch } from "react-icons/fi"
import { useQuery } from "react-query"
import { Supplier } from "type/supplier"
import { WithId } from "type/withId"

export const Suppliers = () => {
  const [query, setQuery] = useState<string>("")

  const { data: suppliersList, isLoading } = useQuery<WithId<Supplier>[]>(
    "suppliersList",
    getAllSuppliers
  )

  const isQueryExists = !!query.trim()

  const filteredSuppliersList = suppliersList?.filter(({ name, address }) =>
    isQueryExists
      ? name.toLowerCase().includes(query.toLowerCase()) ||
        address?.toLowerCase().includes(query.toLowerCase())
      : suppliersList
  )

  const handleChangeSearchQuery = (e: ChangeEvent<HTMLInputElement>) => {
    setQuery(e.target.value)
  }

  return (
    <Flex w="full" direction="column" py={5} px={10}>
      <Flex justifyContent="space-between" pb={10}>
        <Heading>Suppliers</Heading>

        {/* Search */}
        <Flex justifyContent="flex-end" gap={2}>
          <InputGroup maxW={360}>
            {/* Search Query */}
            <Input
              placeholder="Search.."
              value={query}
              onChange={handleChangeSearchQuery}
              isDisabled={isLoading}
            />

            {/* Search Icon */}
            <InputRightElement>
              <FiSearch color="gray" />
            </InputRightElement>
          </InputGroup>
        </Flex>
      </Flex>

      <Flex direction="column" gap={10}>
        {!isLoading ? (
          <SimpleGrid columns={{ base: 1, md: 2, lg: 3, xl: 4 }} spacing={10}>
            <NewSupplierCard />

            {filteredSuppliersList?.map((supplier, index) => (
              <SupplierCard key={index} supplier={supplier} />
            ))}
          </SimpleGrid>
        ) : (
          <Spinner />
        )}
      </Flex>
    </Flex>
  )
}
