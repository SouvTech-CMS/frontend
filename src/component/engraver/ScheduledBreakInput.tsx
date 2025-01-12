import { CloseButton, Flex, Input, InputGroup } from "@chakra-ui/react"
import {
  Dispatch,
  FC,
  SetStateAction,
  useCallback,
  useEffect,
  useState,
} from "react"
import { ScheduledBreak } from "type/engraver/scheduledBreak"
import { getShortTime } from "util/formatting"

interface ScheduledBreakInputProps {
  prevScheduledBreak: ScheduledBreak
  setScheduledBreaksList: Dispatch<SetStateAction<ScheduledBreak[]>>
  isDisabled?: boolean
}

export const ScheduledBreakInput: FC<ScheduledBreakInputProps> = (props) => {
  const { prevScheduledBreak, setScheduledBreaksList, isDisabled } = props

  const [scheduledBreak, setScheduledBreak] =
    useState<ScheduledBreak>(prevScheduledBreak)

  const isStartedAtInvalid = !scheduledBreak.started_at
  const isFinishedAtInvalid = !scheduledBreak.finished_at

  const handleChange = (
    param: keyof ScheduledBreak,
    value: number | string,
  ) => {
    setScheduledBreak((prevBreak) => ({
      ...prevBreak,
      [param]: value,
    }))
  }

  const handleDelete = () => {
    setScheduledBreaksList((prevBreaksList) => {
      const newBreaksList = prevBreaksList.filter(
        (prevBreak) => prevBreak.index !== scheduledBreak.index,
      )

      return newBreaksList
    })
  }

  const handleScheduledBreaksChange = useCallback(() => {
    setScheduledBreaksList((prevBreaksList) => {
      const newBreaksList = prevBreaksList.map((prevBreak) =>
        prevBreak.index === scheduledBreak.index ? scheduledBreak : prevBreak,
      )

      return newBreaksList
    })
  }, [setScheduledBreaksList, scheduledBreak])

  useEffect(
    () => {
      if (prevScheduledBreak !== scheduledBreak) {
        handleScheduledBreaksChange()
      }
    },
    // eslint-disable-next-line react-hooks/exhaustive-deps
    [scheduledBreak],
  )

  useEffect(
    () => {
      if (prevScheduledBreak !== scheduledBreak) {
        setScheduledBreak(prevScheduledBreak)
      }
    },
    // eslint-disable-next-line react-hooks/exhaustive-deps
    [prevScheduledBreak],
  )

  return (
    <Flex w="full" direction="row" alignItems="center" gap={5}>
      {/* Start At */}
      <InputGroup>
        <Input
          placeholder="Set start time"
          value={getShortTime(scheduledBreak.started_at)}
          type="time"
          onChange={(e) => {
            const value = e.target.value
            handleChange("started_at", value)
          }}
          isInvalid={isStartedAtInvalid}
          isDisabled={isDisabled}
        />
      </InputGroup>

      {/* Finished At */}
      <InputGroup>
        <Input
          placeholder="Set end time"
          value={getShortTime(scheduledBreak.finished_at)}
          type="time"
          onChange={(e) => {
            const value = e.target.value
            handleChange("finished_at", value)
          }}
          isInvalid={isFinishedAtInvalid}
          isDisabled={isDisabled}
        />
      </InputGroup>

      {/* Delete Btn */}
      <CloseButton onClick={handleDelete} />
    </Flex>
  )
}
