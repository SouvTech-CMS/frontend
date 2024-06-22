import {
  Card,
  CardBody,
  CardHeader,
  Flex,
  Heading,
  useDisclosure,
} from "@chakra-ui/react"
import { CardMenu } from "component/suppliers/SupplierCardMenu"
import { SupplierDeleteModal } from "component/suppliers/SupplierDeleteModal"
import { SupplierModal } from "component/suppliers/SupplierModal"
import { FC } from "react"
import { Supplier } from "type/supplier"

interface SupplierCardProps {
  supplier: Supplier
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

  return (
    <>
      <Card maxW={400} boxShadow="lg" borderRadius={20}>
        <CardHeader>
          <Flex direction="column" gap={2}>
            <Heading size="md">{supplier.name}</Heading>

            {/* <Flex alignItems="center" gap={1}>
              <FiAtSign color="gray" />

              <Text color="gray" fontSize="xs">
                {supplier.email}
              </Text>
            </Flex> */}
          </Flex>

          {/* Actions Menu Button */}
          <CardMenu
            onEdit={onSupplierEditOpenModal}
            onDelete={onSupplierDeleteOpenModal}
          />
        </CardHeader>

        <CardBody>
          <Flex h="full" w="full" direction="column" gap={5}>
            {/*  */}
          </Flex>
        </CardBody>
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
    </>
  )
}
