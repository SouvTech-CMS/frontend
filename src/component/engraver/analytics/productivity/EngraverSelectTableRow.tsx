import { Flex, Td, Tr } from "@chakra-ui/react"
import { EngraverSelect } from "component/select/EngraverSelect"
import { Dispatch, FC, SetStateAction, useState } from "react"

interface EngraverSelectTableRowProps {
  selectedEngraversIds?: number[]
  setEngraversIds: Dispatch<SetStateAction<number[]>>
}

export const EngraverSelectTableRow: FC<EngraverSelectTableRowProps> = (
  props,
) => {
  const { selectedEngraversIds, setEngraversIds } = props

  const [engraverId, _] = useState<number>()

  const handleSelect = (selectedId: number) => {
    setEngraversIds((prevEngraversIds) => [...prevEngraversIds, selectedId])
  }

  return (
    <Tr>
      <Td colSpan={2}>
        <Flex w="full" direction="column">
          <EngraverSelect
            selectedId={engraverId}
            excludedIds={selectedEngraversIds}
            onSelect={handleSelect}
          />
        </Flex>
      </Td>
    </Tr>
  )
}
