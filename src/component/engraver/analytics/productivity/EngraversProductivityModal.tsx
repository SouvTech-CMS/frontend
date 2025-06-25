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
import { getEngraversProductivityAnalytics } from "api/analytics/engraver"
import { EngraversProductivityTable } from "component/engraver/analytics/productivity/EngraversProductivityTable"
import { DatesFilter } from "component/filter/DatesFilter"
import { ModalBackgroundBlur } from "component/ModalBackgroundBlur"
import { LoadingPage } from "component/page/LoadingPage"
import { ShopsSelect } from "component/select/ShopsSelect"
import { useTableContext } from "context/table"
import { FC, useEffect, useState } from "react"
import { useQuery } from "react-query"
import { EngraverProductivityAnalyticsResponse } from "type/analytics/engraver"
import { ModalProps } from "type/modalProps"
import { OrderSearchFilter } from "type/order/order"

interface EngraversProductivityModalProps extends ModalProps {
  engraverId: number
}

export const EngraversProductivityModal: FC<EngraversProductivityModalProps> = (
  props,
) => {
  const { engraverId, isOpen, onClose } = props

  const { searchFilter, setSearchFilter } = useTableContext<OrderSearchFilter>()

  const [shopsIds, setShopsIds] = useState<number[]>()
  const prevEngraversList = [engraverId]
  const [engraversIds, setEngraversIds] = useState<number[]>(prevEngraversList)

  const startDate = searchFilter?.start_date
  const endDate = searchFilter?.end_date

  const isRequestEnabled = !!startDate && !!endDate && !!engraversIds

  const {
    data: productivityAnalytics,
    isLoading: isProductivityAnalyticsLoading,
    refetch,
    isRefetching: isProductivityAnalyticsRefetching,
  } = useQuery<EngraverProductivityAnalyticsResponse>(
    ["productivityAnalytics", engraversIds],
    () =>
      getEngraversProductivityAnalytics({
        shops: shopsIds,
        start_date: startDate,
        end_date: endDate,
        engravers_ids: engraversIds,
      }),
    {
      enabled: !!isRequestEnabled,
    },
  )
  const isAnalyticsExists = !!productivityAnalytics

  const isLoading =
    isProductivityAnalyticsLoading || isProductivityAnalyticsRefetching

  // Analytics refetching
  useEffect(() => {
    if (isRequestEnabled) {
      refetch()
    }
  }, [refetch, startDate, endDate, shopsIds, engraversIds])

  // Clear states
  useEffect(() => {
    // Dates Clearing
    setSearchFilter(
      (prevSearchFilter) =>
        ({
          ...(prevSearchFilter || {}),
          start_date: undefined,
          end_date: undefined,
        }) as OrderSearchFilter,
    )

    // Update Engravers IDs
    setEngraversIds(prevEngraversList)
  }, [isOpen])

  return (
    <Modal size="full" isOpen={isOpen} onClose={onClose} isCentered>
      <ModalBackgroundBlur />

      <ModalContent>
        <ModalHeader>Engravers Productivity Analytics</ModalHeader>
        <ModalCloseButton />

        <ModalBody>
          <Flex w="full" direction="column" gap={5}>
            {/* Filters */}
            <Flex w="full" direction="column" gap={2}>
              <ShopsSelect selectedShopsIds={shopsIds} onSelect={setShopsIds} />

              <DatesFilter />
            </Flex>

            {isLoading && <LoadingPage />}

            {/* Hint */}
            {!isLoading && !isRequestEnabled && (
              <Text color="hint" textAlign="center">
                Select dates range to see Engravers productivity analytics
              </Text>
            )}

            {/* Analytics */}
            {!isLoading && isAnalyticsExists && isRequestEnabled && (
              <EngraversProductivityTable
                productivityAnalytics={productivityAnalytics}
                selectedEngraversIds={engraversIds}
                setEngraversIds={setEngraversIds}
              />
            )}
          </Flex>
        </ModalBody>

        <ModalFooter></ModalFooter>
      </ModalContent>
    </Modal>
  )
}
