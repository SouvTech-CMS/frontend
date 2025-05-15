import {
  Flex,
  Input,
  Modal,
  ModalBody,
  ModalCloseButton,
  ModalContent,
  ModalFooter,
  ModalHeader,
  Text,
} from "@chakra-ui/react"
import { getBulkStorageGoods } from "api/analytics/storageGoods"
import { DatesFilter } from "component/filter/DatesFilter"
import { ModalBackgroundBlur } from "component/ModalBackgroundBlur"
import { LoadingPage } from "component/page/LoadingPage"
import { ShopsSelect } from "component/select/ShopsSelect"
import { BulkStorageGoodCard } from "component/storageGood/analytics/bulk/BulkStorageGoodCard"
import { useTableContext } from "context/table"
import { ChangeEvent, FC, useEffect, useState } from "react"
import { useQuery } from "react-query"
import { BulkStorageGoodsResponse } from "type/analytics/storageGood"
import { ModalProps } from "type/modalProps"
import { OrderSearchFilter } from "type/order/order"

interface BulkStorageGoodsModalProps extends ModalProps {}

export const BulkStorageGoodsModal: FC<BulkStorageGoodsModalProps> = (
  props,
) => {
  const { isOpen, onClose } = props

  const { searchFilter, setSearchFilter } = useTableContext<OrderSearchFilter>()

  const [shopsIds, setShopsIds] = useState<number[]>()
  const [minQuantity, setMinQuantity] = useState<number>()
  const [maxQuantity, setMaxQuantity] = useState<number>()

  const startDate = searchFilter?.start_date
  const endDate = searchFilter?.end_date

  const isBothQuantitiesExist = !!minQuantity && !!maxQuantity
  const isQuantityValid = isBothQuantitiesExist
    ? maxQuantity >= minQuantity
    : !!minQuantity || !!maxQuantity

  const isRequestEnabled = !!startDate && !!endDate && isQuantityValid

  const {
    data: bulkStorageGoodsResponse,
    isLoading: isBulkStorageGoodsLoading,
    refetch,
    isRefetching: isBulkStorageGoodsRefetching,
  } = useQuery<BulkStorageGoodsResponse>(
    "bulkStorageGoods",
    () =>
      getBulkStorageGoods({
        shops: shopsIds,
        start_date: startDate!,
        end_date: endDate!,
        min_quantity: minQuantity,
        max_quantity: maxQuantity,
      }),
    { enabled: isRequestEnabled },
  )
  const storageGoodsList = bulkStorageGoodsResponse?.results
  const isStorageGoodsListExists =
    !!storageGoodsList && storageGoodsList.length > 0

  const isLoading = isBulkStorageGoodsLoading || isBulkStorageGoodsRefetching

  const handleMinQuantityChange = (e: ChangeEvent<HTMLInputElement>) => {
    const value = e.target.valueAsNumber
    setMinQuantity(value)
  }

  const handleMaxQuantityChange = (e: ChangeEvent<HTMLInputElement>) => {
    const value = e.target.valueAsNumber
    setMaxQuantity(value)
  }

  useEffect(() => {
    if (isRequestEnabled) {
      refetch()
    }
  }, [refetch, startDate, endDate, shopsIds, minQuantity, maxQuantity])

  useEffect(() => {
    setShopsIds(undefined)
    setMinQuantity(undefined)
    setMaxQuantity(undefined)
    setSearchFilter(
      (prevFilters) =>
        ({
          ...prevFilters,
          start_date: undefined,
          end_date: undefined,
        }) as OrderSearchFilter,
    )
  }, [isOpen])

  return (
    <Modal size="xl" isOpen={isOpen} onClose={onClose} isCentered>
      <ModalBackgroundBlur />

      <ModalContent>
        <ModalHeader>Bulk Storage Goods</ModalHeader>
        <ModalCloseButton />

        <ModalBody>
          <Flex w="full" direction="column" gap={5}>
            {/* Filters */}
            <Flex w="full" direction="column" gap={3}>
              <ShopsSelect
                selectedShopsIds={shopsIds}
                onSelect={setShopsIds}
                isFullWidth
              />

              <Flex w="full" direction="row" alignItems="center" gap={2}>
                <Input
                  placeholder="Min quantity"
                  type="number"
                  value={minQuantity}
                  onChange={handleMinQuantityChange}
                  isInvalid={!isQuantityValid}
                />

                <Input
                  placeholder="Max quantity"
                  type="number"
                  value={maxQuantity}
                  onChange={handleMaxQuantityChange}
                  isInvalid={!isQuantityValid}
                />

                <DatesFilter isFullWidth />
              </Flex>
            </Flex>

            {isLoading && <LoadingPage />}

            {!isRequestEnabled && !isLoading && (
              <Flex w="full" justifyContent="center" alignItems="center" py={5}>
                <Text color="hint" textAlign="center">
                  Select dates range and enter min or max quantity in orders to
                  see Storage Goods
                </Text>
              </Flex>
            )}

            {/* Storage Goods List */}
            {isStorageGoodsListExists && isRequestEnabled && !isLoading && (
              <Flex w="full" direction="column" gap={2}>
                {storageGoodsList?.map(({ storage_good, orders }, index) => (
                  <BulkStorageGoodCard
                    key={index}
                    storageGood={storage_good}
                    ordersList={orders}
                  />
                ))}
              </Flex>
            )}
          </Flex>
        </ModalBody>

        <ModalFooter></ModalFooter>
      </ModalContent>
    </Modal>
  )
}
