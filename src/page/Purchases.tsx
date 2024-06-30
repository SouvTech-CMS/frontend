import {
  Flex,
  Heading,
  Input,
  InputGroup,
  InputRightElement,
  Spinner,
} from "@chakra-ui/react"
import { getAllPurchases } from "api/purchase"
import { NewPurchaseBtn } from "component/purchase/NewPurchaseBtn"
import { PurchasesTable } from "component/purchase/PurchasesTable"
import { ChangeEvent, useState } from "react"
import { FiSearch } from "react-icons/fi"
import { useQuery } from "react-query"
import { FullPurchase } from "type/purchase"

export const Purchases = () => {
  const [query, setQuery] = useState<string>("")

  const { data: purchasesList, isLoading } = useQuery<FullPurchase[]>(
    "purchasesList",
    getAllPurchases
  )

  const isQueryExists = !!query.trim()

  const filteredPurchasesList = purchasesList?.filter(({ purchase }) =>
    isQueryExists
      ? String(purchase.id).toLowerCase().includes(query.toLowerCase())
      : purchasesList
  )

  const handleChangeSearchQuery = (e: ChangeEvent<HTMLInputElement>) => {
    setQuery(e.target.value)
  }

  return (
    <Flex w="full" direction="column" py={5} px={10}>
      <Flex justifyContent="space-between" pb={10}>
        <Heading>Purchases</Heading>

        {/* Search */}
        <Flex justifyContent="flex-end" gap={2}>
          <InputGroup maxW={360}>
            {/* Search Query */}
            <Input
              placeholder="Поиск.."
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
          <Flex w="full" direction="column" gap={5}>
            <NewPurchaseBtn />

            <PurchasesTable purchases={filteredPurchasesList} />
          </Flex>
        ) : (
          <Spinner />
        )}
      </Flex>
    </Flex>
  )
}
