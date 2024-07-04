import {
  Button,
  Card,
  CardFooter,
  CardHeader,
  Flex,
  Heading,
  Text,
  useDisclosure,
} from "@chakra-ui/react"
import { SupplierManagersModal } from "component/manager/ManagersListModal"
import { SupplierCardMenu } from "component/suppliers/SupplierCardMenu"
import { SupplierDeleteModal } from "component/suppliers/SupplierDeleteModal"
import { SupplierModal } from "component/suppliers/SupplierModal"
import { FC } from "react"
import { Supplier } from "type/supplier"
import { WithId } from "type/withId"

interface SupplierCardProps {
  supplier: WithId<Supplier>
}

export const SupplierCard: FC<SupplierCardProps> = (props) => {
  const { supplier } = props

  const {
    isOpen: isSupplierDeleteModalOpen,
    onOpen: onSupplierDeleteModalOpen,
    onClose: onSupplierDeleteModalClose,
  } = useDisclosure()

  const {
    isOpen: isSupplierEditModalOpen,
    onOpen: onSupplierEditModalOpen,
    onClose: onSupplierEditModalClose,
  } = useDisclosure()

  const {
    isOpen: isManagersModalOpen,
    onOpen: onManagersModalOpen,
    onClose: onManagersModalClose,
  } = useDisclosure()

  const isAddressExists = !!supplier.address

  return (
    <>
      <Card minH={250} maxW={250} boxShadow="lg" borderRadius={20}>
        <CardHeader>
          <Flex direction="column" gap={2}>
            <Heading size="md">{supplier.name}</Heading>

            {isAddressExists && (
              <Text color="gray" fontSize="sm">
                {supplier.address}
              </Text>
            )}
          </Flex>

          {/* Actions Menu Button */}
          <SupplierCardMenu
            onManagers={onManagersModalOpen}
            onEdit={onSupplierEditModalOpen}
            onDelete={onSupplierDeleteModalOpen}
          />
        </CardHeader>

        <CardFooter mt="auto">
          <Button
            w="full"
            variant="ghost"
            colorScheme="blue"
            onClick={onManagersModalOpen}
          >
            Managers
          </Button>
        </CardFooter>
      </Card>

      {/* Delete supplier modal */}
      <SupplierDeleteModal
        supplier={supplier}
        isOpen={isSupplierDeleteModalOpen}
        onClose={onSupplierDeleteModalClose}
      />

      {/* Edit supplier modal */}
      <SupplierModal
        prevSupplier={supplier}
        isOpen={isSupplierEditModalOpen}
        onClose={onSupplierEditModalClose}
      />

      {/* Edit supplier modal */}
      <SupplierManagersModal
        supplierId={supplier.id}
        isOpen={isManagersModalOpen}
        onClose={onManagersModalClose}
      />
    </>
  )
}
