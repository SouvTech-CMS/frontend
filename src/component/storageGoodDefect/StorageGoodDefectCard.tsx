import {
  Card,
  CardBody,
  CardHeader,
  Flex,
  Heading,
  Text,
} from "@chakra-ui/react"
import { getEngraverById } from "api/engraver/engraver"
import { getSupplierById } from "api/supplier/supplier"
import { FC } from "react"
import { useQuery } from "react-query"
import { Engraver } from "type/engraver/engraver"
import { StorageGoodDefect } from "type/storage/storageGoodDefect"
import { SupplierWithManagers } from "type/supplier/supplier"
import { WithId } from "type/withId"

interface StorageGoodDefectCardProps {
  defect?: WithId<StorageGoodDefect>
}

export const StorageGoodDefectCard: FC<StorageGoodDefectCardProps> = (
  props,
) => {
  const { defect } = props

  const supplierId = defect?.supplier_id
  const engraverId = defect?.engraver_id

  const isEngraverError = !!defect?.engraver_id

  const {
    data: supplier,
    // isLoading: isSupplierLoading,
  } = useQuery<SupplierWithManagers>(
    ["supplier", supplierId],
    () => getSupplierById(supplierId!),
    {
      enabled: !!supplierId,
    },
  )
  // const isSupplierExists = !!supplier

  const {
    data: engraver,
    // isLoading: isEngraverLoading,
  } = useQuery<WithId<Engraver>>(
    ["engraver", engraverId],
    () => getEngraverById(engraverId!),
    {
      enabled: !!engraverId,
    },
  )
  // const isEngraverExists = !!engraver

  // const isLoading = isSupplierLoading || isEngraverLoading

  return (
    <Card h="full" w="full" minH={150} size="sm">
      <CardHeader>
        <Flex direction="column" gap={2}>
          {/* Engraver Error or Supplier Defect */}
          <Heading size="md" fontWeight="medium">
            <Text>
              {isEngraverError ? "Engraver Error" : "Supplier Defect"}
            </Text>
          </Heading>
        </Flex>
      </CardHeader>

      <CardBody>
        <Flex direction="column" gap={2}>
          {/* Quantity */}
          <Flex alignItems="center" flexWrap="wrap" gap={2}>
            <Text fontWeight="light" color="gray">
              Quantity:
            </Text>

            <Text>{defect?.quantity}</Text>
          </Flex>

          {/* Engraver or Supplier */}
          {isEngraverError ? (
            <Flex alignItems="flex-start" flexWrap="wrap" gap={2}>
              <Text fontWeight="light" color="gray">
                Engraver:
              </Text>

              <Text>{engraver?.user.fio}</Text>
            </Flex>
          ) : (
            <Flex alignItems="flex-start" flexWrap="wrap" gap={2}>
              <Text fontWeight="light" color="gray">
                Supplier:
              </Text>

              <Text>{supplier?.name}</Text>
            </Flex>
          )}
        </Flex>
      </CardBody>
    </Card>
  )
}
