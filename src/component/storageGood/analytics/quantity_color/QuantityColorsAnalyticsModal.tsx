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
import { getQuantityColorsAnalytics } from "api/analytics/quantityColors"
import { ModalBackgroundBlur } from "component/ModalBackgroundBlur"
import { LoadingPage } from "component/page/LoadingPage"
import { QuantityColorSelect } from "component/select/QuantityColorSelect"
import { ShopsSelect } from "component/select/ShopsSelect"
import { StorageGoodsTable } from "component/storageGood/StorageGoodsTable"
import { FC, useEffect, useState } from "react"
import { useQuery } from "react-query"
import { QuantityColorAnalyticsResponse } from "type/analytics/quantityColor"
import { ModalProps } from "type/modalProps"
import { QuantityColor } from "type/storage/quantityColor/quantityColor"
import { FullStorageGood } from "type/storage/storageGood"
import { WithId } from "type/withId"

interface QuantityColorsAnalyticsModalProps extends ModalProps {}

export const QuantityColorsAnalyticsModal: FC<
  QuantityColorsAnalyticsModalProps
> = (props) => {
  const { isOpen, onClose } = props

  const [quantityColor, setQuantityColor] = useState<WithId<QuantityColor>>()
  const [shopsIds, setShopsIds] = useState<number[]>()

  const quantityColorId = quantityColor?.id
  const isRequestEnabled = !!quantityColorId

  const {
    data: quantityColorsAnalytics,
    isLoading,
    refetch,
  } = useQuery<QuantityColorAnalyticsResponse>(
    "quantityColorsAnalytics",
    () =>
      getQuantityColorsAnalytics({
        shops: shopsIds,
        quantity_color_id: quantityColorId!,
      }),
    { enabled: isRequestEnabled },
  )
  const isQuantityColorsAnalyticsExists = !!quantityColorsAnalytics

  const storageGoodsList = quantityColorsAnalytics?.storage_goods
  const isStorageGoodsExist = !!storageGoodsList && storageGoodsList.length > 0

  useEffect(() => {
    if (isRequestEnabled) {
      refetch()
    }
  }, [refetch, quantityColorId, shopsIds])

  useEffect(() => {
    setQuantityColor(undefined)
    setShopsIds(undefined)
  }, [isOpen])

  return (
    <Modal size="full" isOpen={isOpen} onClose={onClose} isCentered>
      <ModalBackgroundBlur />

      <ModalContent>
        <ModalHeader>Quantity Colors Analytics</ModalHeader>
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

              <Flex direction="row" alignItems="center" gap={2}>
                <Text fontWeight="medium">Show Storage Goods with</Text>

                <QuantityColorSelect
                  selectedValue={quantityColor}
                  onSelect={setQuantityColor}
                  isDisabled={isLoading}
                  isRequired
                />
              </Flex>
            </Flex>

            {isLoading && <LoadingPage />}

            {!isRequestEnabled && !isLoading && (
              <Flex w="full" justifyContent="center" alignItems="center" py={5}>
                <Text color="hint" textAlign="center">
                  Select Quantity Color to see its Storage Goods list
                </Text>
              </Flex>
            )}

            {isQuantityColorsAnalyticsExists &&
              !isStorageGoodsExist &&
              isRequestEnabled &&
              !isLoading && (
                <Flex
                  w="full"
                  justifyContent="center"
                  alignItems="center"
                  py={5}
                >
                  <Text color="hint">
                    No Storage Goods with this Quantity Color
                  </Text>
                </Flex>
              )}

            {/* Storage Goods List */}
            {/* {isQuantityColorsAnalyticsExists &&
              isRequestEnabled &&
              !isLoading && (
                <Flex w="full" direction="column" gap={2}>
                  {storageGoodsList?.map((storageGood, index) => (
                    <StorageGoodQuantityColorCard
                      key={index}
                      storageGood={storageGood}
                      quantityColor={quantityColor}
                    />
                  ))}
                </Flex>
              )} */}
            {isQuantityColorsAnalyticsExists &&
              isStorageGoodsExist &&
              isRequestEnabled &&
              !isLoading && (
                <StorageGoodsTable
                  storageGoodsList={
                    storageGoodsList as WithId<FullStorageGood>[]
                  }
                />
              )}
          </Flex>
        </ModalBody>

        <ModalFooter></ModalFooter>
      </ModalContent>
    </Modal>
  )
}
