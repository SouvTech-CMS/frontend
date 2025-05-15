import {
  Flex,
  Modal,
  ModalBody,
  ModalCloseButton,
  ModalContent,
  ModalFooter,
  ModalHeader,
  Text,
} from "@chakra-ui/react"
import { getStorageGoodsPopularity } from "api/analytics/storageGoods"
import { DatesFilter } from "component/filter/DatesFilter"
import { ModalBackgroundBlur } from "component/ModalBackgroundBlur"
import { LoadingPage } from "component/page/LoadingPage"
import { ShopsSelect } from "component/select/ShopsSelect"
import { StorageGoodPopularityCard } from "component/storageGood/analytics/popularity/StorageGoodPopularityCard"
import { useTableContext } from "context/table"
import { FC, useEffect, useState } from "react"
import { useQuery } from "react-query"
import { StorageGoodPopularity } from "type/analytics/storageGood"
import { ModalProps } from "type/modalProps"
import { OrderSearchFilter } from "type/order/order"

interface PopularityModalProps extends ModalProps {}

export const PopularityModal: FC<PopularityModalProps> = (props) => {
  const { isOpen, onClose } = props

  const { searchFilter, setSearchFilter } = useTableContext<OrderSearchFilter>()

  const [shopsIds, setShopsIds] = useState<number[]>()

  const startDate = searchFilter?.start_date
  const endDate = searchFilter?.end_date

  const isRequestEnabled = !!startDate && !!endDate

  const {
    data: storageGoodsPopularity,
    isLoading,
    refetch,
  } = useQuery<StorageGoodPopularity[]>(
    "storageGoodsPopularity",
    () =>
      getStorageGoodsPopularity({
        shops: shopsIds,
        start_date: startDate!,
        end_date: endDate!,
      }),
    { enabled: isRequestEnabled },
  )
  const isStorageGoodsPopularityExist =
    !!storageGoodsPopularity && storageGoodsPopularity.length > 0

  useEffect(() => {
    if (isRequestEnabled) {
      refetch()
    }
  }, [refetch, startDate, endDate, shopsIds])

  useEffect(() => {
    setShopsIds(undefined)
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
        <ModalHeader>Storage Goods Popularity</ModalHeader>
        <ModalCloseButton />

        <ModalBody>
          <Flex w="full" direction="column" gap={5}>
            {/* Filters */}
            <Flex w="full" direction="row" alignItems="center" gap={2}>
              <ShopsSelect selectedShopsIds={shopsIds} onSelect={setShopsIds} />

              <DatesFilter />
            </Flex>

            {isLoading && <LoadingPage />}

            {!isStorageGoodsPopularityExist && !isLoading && (
              <Flex w="full" justifyContent="center" alignItems="center" py={5}>
                <Text color="hint" textAlign="center">
                  Select dates range to see analytics
                </Text>
              </Flex>
            )}

            {/* Storage Goods List */}
            {isStorageGoodsPopularityExist && !isLoading && (
              <Flex w="full" direction="column" gap={2}>
                {storageGoodsPopularity?.map((popularity, index) => (
                  <StorageGoodPopularityCard
                    key={index}
                    popularity={popularity}
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
