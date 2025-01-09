import { getAllSuppliers } from "api/supplier/supplier"
import {
  ActionMeta,
  ChakraStylesConfig,
  GroupBase,
  Select,
  SingleValue,
} from "chakra-react-select"
import { FC } from "react"
import { useQuery } from "react-query"
import { SelectOption } from "type/selectOption"
import { SupplierWithManagers } from "type/supplier/supplier"

interface SupplierSelectProps {
  selectedId?: number
  onSelect: (selectedId: number) => void
  isRequired?: boolean
  isDisabled?: boolean
}

const selectStyles: ChakraStylesConfig<
  SelectOption,
  false,
  GroupBase<SelectOption>
> = {
  container: (provided) => ({
    ...provided,
    width: "full",
  }),
}

export const SupplierSelect: FC<SupplierSelectProps> = (props) => {
  const { selectedId, onSelect, isRequired, isDisabled } = props

  const { data: suppliersList, isLoading: isSuppliersLoading } = useQuery<
    SupplierWithManagers[]
  >("suppliersList", getAllSuppliers)

  const handleSelect = (
    newValue: SingleValue<SelectOption>,
    _: ActionMeta<SelectOption>,
  ) => {
    const selectedOption = newValue as SelectOption
    const supplierId = Number(selectedOption.value)
    onSelect(supplierId)
  }

  const selectedSupplier = suppliersList?.find(
    (supplier) => supplier.id === selectedId,
  )
  const isSelectedSupplierExists = !!selectedSupplier

  const isSelectedSupplierInvalid = isRequired && !selectedId

  const isLoading = isDisabled || isSuppliersLoading

  return (
    <Select<SelectOption, false, GroupBase<SelectOption>>
      chakraStyles={selectStyles}
      placeholder="Select supplier"
      options={suppliersList?.map((supplier) => ({
        value: supplier.id,
        label: supplier.name,
      }))}
      value={
        isSelectedSupplierExists
          ? {
              value: selectedSupplier.id,
              label: selectedSupplier.name,
            }
          : null
      }
      onChange={handleSelect}
      isSearchable
      isInvalid={isSelectedSupplierInvalid}
      isDisabled={isLoading}
    />
  )
}
