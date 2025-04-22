import {
  ActionMeta,
  ChakraStylesConfig,
  GroupBase,
  Select,
  SingleValue,
} from "chakra-react-select"
import { TICKET_STATUSES_LIST, TicketStatus } from "constant/ticketStatus"
import { FC } from "react"
import { titleCase } from "title-case"
import { SelectStringOption } from "type/selectOption"

type StatusSelectOption = SelectStringOption<TicketStatus | undefined>

interface TicketStatusSelectProps {
  selectedValue?: TicketStatus | undefined
  onSelect: (selectedValue: TicketStatus | undefined) => void
  isDisabled?: boolean
}

const selectStyles: ChakraStylesConfig<
  StatusSelectOption,
  false,
  GroupBase<StatusSelectOption>
> = {
  container: (provided) => ({
    ...provided,
    width: "fit-content",
  }),
  valueContainer: (provided) => ({
    ...provided,
    pl: 2,
  }),
}

export const TicketStatusSelect: FC<TicketStatusSelectProps> = (props) => {
  const { selectedValue, onSelect, isDisabled } = props

  const isSelected = !!selectedValue

  const handleSelect = (
    newValue: SingleValue<StatusSelectOption>,
    _: ActionMeta<StatusSelectOption>,
  ) => {
    const status = newValue?.value
    onSelect(status)
  }

  return (
    <Select<StatusSelectOption, false, GroupBase<StatusSelectOption>>
      chakraStyles={selectStyles}
      placeholder="Select status"
      size="sm"
      options={TICKET_STATUSES_LIST?.map((status) => ({
        value: status,
        label: titleCase(status),
      }))}
      value={
        isSelected
          ? {
              value: selectedValue,
              label: selectedValue,
            }
          : null
      }
      onChange={handleSelect}
      isInvalid={!isSelected}
      isDisabled={isDisabled}
    />
  )
}
