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
import { useTableContext } from "context/table"
import { FC, useEffect } from "react"
import { useQuery } from "react-query"
import { EngraverWorkTimeAnalyticsResponse } from "type/analytics/engraver"
import { Engraver } from "type/engraver/engraver"
import { ModalProps } from "type/modalProps"
import { OrderSearchFilter } from "type/order/order"
import { WithId } from "type/withId"
import {
  durationFromSeconds,
  numberWithCurrency,
  roundNumber,
} from "util/formatting"

interface EngraverWorkTimeModalProps extends ModalProps {
  engraver: WithId<Engraver>
}

export const EngraverWorkTimeModal: FC<EngraverWorkTimeModalProps> = (
  props,
) => {
  const { engraver, isOpen, onClose } = props

  const { searchFilter, setSearchFilter } = useTableContext<OrderSearchFilter>()

  const engraverId = engraver.id
  const engraverUser = engraver.user
  const salary = engraverUser.salary || 0

  const startDate = searchFilter?.start_date
  const endDate = searchFilter?.end_date

  const isRequestEnabled = !!startDate && !!endDate && !!engraverId

  const {
    data: workTimeAnalytics,
    isLoading,
    refetch,
  } = useQuery<EngraverWorkTimeAnalyticsResponse>(
    ["workTimeAnalytics", engraverId],
    () =>
      getEngraverWorkTimeAnalytics({
        engraver_id: engraverId,
        start_date: startDate,
        end_date: endDate,
      }),
    {
      enabled: !!isRequestEnabled,
    },
  )
  const isAnalyticsExists = !!workTimeAnalytics && workTimeAnalytics.length > 0

  const totalWorkTimeDurationInSec =
    workTimeAnalytics?.reduce(
      (sum, workShift) => sum + workShift.total_time,
      0,
    ) || 0
  const totalWorkTimeText = durationFromSeconds(totalWorkTimeDurationInSec)

  const totalWorkTimeInHours = totalWorkTimeDurationInSec / 60 / 60
  const totalSalary = salary * totalWorkTimeInHours

  // Analytics refetching
  useEffect(() => {
    if (isRequestEnabled) {
      refetch()
    }
  }, [refetch, startDate, endDate, engraverId])

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
          <Flex w="full" direction="column" gap={10}>
            {/* Filters */}
            <Flex w="full" direction="column" gap={2}>
              <DatesFilter />
            </Flex>

            {isLoading && <LoadingPage />}

            {/* Hint */}
            {!isLoading && !isRequestEnabled && (
              <Text color="hint" textAlign="center">
                Select dates range to see Engraver #{engraverId} Work Time
                Analytics
              </Text>
            )}

            {/* Analytics */}
            {!isLoading && isAnalyticsExists && isRequestEnabled && (
              <>
                <EngraverWorkTimeTable workTimeAnalytics={workTimeAnalytics} />

                <Flex w="full" direction="column" gap={2}>
                  <Text fontWeight="medium">
                    Total Work Time: {totalWorkTimeText}
                  </Text>

                  <Text fontWeight="medium">
                    Current Salary: {numberWithCurrency(salary)}
                  </Text>

                  <Text fontWeight="semibold">
                    Total Salary: {numberWithCurrency(roundNumber(totalSalary))}
                  </Text>
                </Flex>
              </>
            )}
          </Flex>
        </ModalBody>

        <ModalFooter></ModalFooter>
      </ModalContent>
    </Modal>
  )
}
