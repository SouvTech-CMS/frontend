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
import { FC, useState } from "react"
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

  const { searchFilter } = useTableContext<OrderSearchFilter>()

  const [shopsIds, setShopsIds] = useState<number[]>()
  const [engraversIds, setEngraversIds] = useState<number[]>([engraverId])

  const startDate = searchFilter?.start_date
  const endDate = searchFilter?.end_date

  const hasDateRange = !!startDate && !!endDate
  const hasSelectedEngravers = engraversIds.length > 0
  const isRequestEnabled = isOpen && hasDateRange && hasSelectedEngravers

  const {
    data: productivityAnalytics,
    isLoading: isProductivityAnalyticsLoading,
    isRefetching: isProductivityAnalyticsRefetching,
  } = useQuery<EngraverProductivityAnalyticsResponse>(
    ["productivityAnalytics", engraversIds, startDate, endDate, shopsIds],
    () =>
      getEngraversProductivityAnalytics({
        shops: shopsIds,
        start_date: startDate,
        end_date: endDate,
        engravers_ids: engraversIds,
      }),
    {
      enabled: isRequestEnabled,
    },
  )

  const isLoading =
    isProductivityAnalyticsLoading || isProductivityAnalyticsRefetching

  return (
    <Modal size="full" isOpen={isOpen} onClose={onClose}>
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
            {!isLoading && !hasDateRange && (
              <Text color="hint" textAlign="center">
                Select dates range to see Engravers productivity analytics
              </Text>
            )}

            {/* Analytics */}
            {!isLoading &&
              hasDateRange &&
              (productivityAnalytics || !hasSelectedEngravers) && (
                <EngraversProductivityTable
                  productivityAnalytics={productivityAnalytics ?? []}
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
