import {
  Button,
  Table,
  TableContainer,
  Tbody,
  Td,
  Th,
  Thead,
  Tr,
  useDisclosure,
} from "@chakra-ui/react"
import { NewPurchaseServiceModal } from "component/purchaseService/NewPurchaseServiceModal"
import { NewPurchaseServiceRow } from "component/purchaseService/NewPurchaseServiceRow"
import { Dispatch, FC, SetStateAction } from "react"
import { PurchaseService } from "type/purchase/purchaseService"

interface PurchaseServicesTableProps {
  services: PurchaseService[]
  setServices: Dispatch<SetStateAction<PurchaseService[]>>
}

const TABLE_COLUMNS = ["Name", "Total Amount", "Discount", ""]

export const PurchaseServicesTable: FC<PurchaseServicesTableProps> = (
  props,
) => {
  const { services, setServices } = props

  const {
    isOpen: isNewServiceModalOpen,
    onOpen: onNewServiceModalOpen,
    onClose: onNewServiceModalClose,
  } = useDisclosure()

  const handleAddService = (service: PurchaseService) => {
    setServices((prevServices) => [...prevServices, service])
    onNewServiceModalClose()
  }

  const handleUpdateService = (service: PurchaseService) => {
    setServices((prevServices) => [
      ...prevServices.filter(
        (prevService) =>
          prevService.name.toLowerCase() !== service.name.toLowerCase(),
      ),
      service,
    ])
    onNewServiceModalClose()
  }

  const handleRemoveService = (service: PurchaseService) => {
    setServices((prevServices) =>
      prevServices.filter((prevService) => prevService !== service),
    )
  }

  return (
    <>
      <TableContainer w="full">
        <Table w="full" variant="simple" bgColor="gray.200" borderRadius={10}>
          <Thead>
            <Tr>
              {TABLE_COLUMNS.map((columnName, index) => (
                <Th key={index} whiteSpace="break-spaces">{columnName}</Th>
              ))}
            </Tr>
          </Thead>

          <Tbody>
            {services.map((service, index) => (
              <NewPurchaseServiceRow
                key={index}
                service={service}
                onEdit={handleUpdateService}
                onRemove={handleRemoveService}
              />
            ))}

            <Tr>
              <Td colSpan={TABLE_COLUMNS.length} p={0}>
                <Button
                  w="full"
                  variant="ghost"
                  colorScheme="blue"
                  onClick={onNewServiceModalOpen}
                >
                  Add service
                </Button>
              </Td>
            </Tr>
          </Tbody>
        </Table>
      </TableContainer>

      <NewPurchaseServiceModal
        onAddService={handleAddService}
        isOpen={isNewServiceModalOpen}
        onClose={onNewServiceModalClose}
      />
    </>
  )
}
