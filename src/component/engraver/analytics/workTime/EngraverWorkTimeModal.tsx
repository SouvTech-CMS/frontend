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
import { getEngraverWorkTimeAnalytics } from "api/analytics/engraver"
import { EngraverWorkTimeTable } from "component/engraver/analytics/workTime/EngraverWorkTimeTable"
import { DatesFilter } from "component/filter/DatesFilter"
import { ModalBackgroundBlur } from "component/ModalBackgroundBlur"
import { LoadingPage } from "component/page/LoadingPage"
import { ShopsSelect } from "component/select/ShopsSelect"
import { useTableContext } from "context/table"
import { FC, useEffect, useState } from "react"
import { useQuery } from "react-query"
import { EngraverWorkTimeAnalyticsResponse } from "type/analytics/engraver"
import { Engraver } from "type/engraver/engraver"
import { ModalProps } from "type/modalProps"
import { OrderSearchFilter } from "type/order/order"
import { WithId } from "type/withId"
interface EngraverWorkTimeModalProps extends ModalProps {
  engraver: WithId<Engraver>
}

export const EngraverWorkTimeModal: FC<EngraverWorkTimeModalProps> = (
  props,
) => {
  const { engraver, isOpen, onClose } = props

  const { searchFilter, setSearchFilter } = useTableContext<OrderSearchFilter>()

  const [shopsIds, setShopsIds] = useState<number[]>([])

  const engraverId = engraver.id

  const startDate = searchFilter?.start_date
  const endDate = searchFilter?.end_date

  const isRequestEnabled = !!startDate && !!endDate && !!engraverId

  const {
    data: workTimeAnalytics,
    isLoading,
    refetch,
  } = useQuery<EngraverWorkTimeAnalyticsResponse>(
    "quantityColorsAnalytics",
    () =>
      getEngraverWorkTimeAnalytics({
        engraver_id: engraverId,
        shops: shopsIds,
        start_date: startDate,
        end_date: endDate,
      }),
    {
      enabled: !!isRequestEnabled,
    },
  )
  const isAnalyticsExists = !!workTimeAnalytics && workTimeAnalytics.length > 0

  // Analytics refetching
  useEffect(() => {
    if (isRequestEnabled) {
      refetch()
    }
  }, [refetch, isRequestEnabled])

  // Dates Clearing
  useEffect(() => {
    setSearchFilter(
      (prevSearchFilter) =>
        ({
          ...(prevSearchFilter || {}),
          start_date: undefined,
          end_date: undefined,
        }) as OrderSearchFilter,
    )
  }, [isOpen])

  return (
    <Modal size="full" isOpen={isOpen} onClose={onClose} isCentered>
      <ModalBackgroundBlur />

      <ModalContent>
        <ModalHeader>Engraver #{engraverId} Work Time</ModalHeader>
        <ModalCloseButton />

        <ModalBody>
          <Flex w="full" direction="column" gap={5}>
            {/* Filters */}
            <Flex w="full" direction="column" gap={2}>
              <ShopsSelect
                selectedShopsIds={shopsIds}
                onSelect={setShopsIds}
                isDisabled={isLoading}
                isFullWidth
              />

              <DatesFilter />
            </Flex>

            {isLoading && <LoadingPage />}

            {/* Hint */}
            {!isLoading && !isAnalyticsExists && isRequestEnabled && (
              <Text color="hint" textAlign="center">
                Cannot find Engraver for these filters
                <br />
                Try to change them
              </Text>
            )}

            {/* Analytics */}
            {!isLoading && isAnalyticsExists && isRequestEnabled && (
              <EngraverWorkTimeTable workTimeAnalytics={workTimeAnalytics} />
            )}
          </Flex>
        </ModalBody>

        <ModalFooter></ModalFooter>
      </ModalContent>
    </Modal>
  )
}
