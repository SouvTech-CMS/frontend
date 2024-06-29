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
    isOpen: isSupplierDeleteOpenModal,
    onOpen: onSupplierDeleteOpenModal,
    onClose: onSupplierDeleteCloseModal,
  } = useDisclosure()

  const {
    isOpen: isSupplierEditOpenModal,
    onOpen: onSupplierEditOpenModal,
    onClose: onSupplierEditCloseModal,
  } = useDisclosure()

  const {
    isOpen: isManagersOpenModal,
    onOpen: onManagersOpenModal,
    onClose: onManagersCloseModal,
  } = useDisclosure()

  const isAddressExists = !!supplier.address

  return (
    <>
      <Card maxW={400} boxShadow="lg" borderRadius={20}>
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
            onManagers={onManagersOpenModal}
            onEdit={onSupplierEditOpenModal}
            onDelete={onSupplierDeleteOpenModal}
          />
        </CardHeader>

        <CardFooter mt="auto">
          <Button
            w="full"
            variant="ghost"
            colorScheme="blue"
            onClick={onManagersOpenModal}
          >
            Managers
          </Button>
        </CardFooter>
      </Card>

      {/* Delete supplier modal */}
      <SupplierDeleteModal
        supplier={supplier}
        isOpen={isSupplierDeleteOpenModal}
        onClose={onSupplierDeleteCloseModal}
      />

      {/* Edit supplier modal */}
      <SupplierModal
        prevSupplier={supplier}
        isOpen={isSupplierEditOpenModal}
        onClose={onSupplierEditCloseModal}
      />

      {/* Edit supplier modal */}
      <SupplierManagersModal
        supplierId={supplier.id}
        isOpen={isManagersOpenModal}
        onClose={onManagersCloseModal}
      />
    </>
  )
}
