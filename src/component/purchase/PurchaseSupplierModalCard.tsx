import { Card, CardBody, Flex, Heading, Text } from "@chakra-ui/react"
import { useCommentInput } from "hook/useCommentInput"
import { FC } from "react"
import { FiAtSign, FiMessageSquare, FiPhone } from "react-icons/fi"
import { Supplier } from "type/supplier/supplier"
import { SupplierManager } from "type/supplier/supplierManager"
import { WithId } from "type/withId"

interface PurchaseSupplierModalCardProps {
  supplier: WithId<Supplier>
  manager: WithId<SupplierManager>
}

export const PurchaseSupplierModalCard: FC<PurchaseSupplierModalCardProps> = (
  props,
) => {
  const { supplier, manager } = props

  const { comment } = useCommentInput({
    objectName: "supplier_manager",
    objectId: manager.id,
  })

  const isEmailExists = !!manager.email.trim()
  const isPhoneExists = !!manager.phone_number.trim()
  const isCommentExists = !!comment.trim()

  return (
    <Card boxShadow="md">
      <CardBody>
        <Flex w="full" direction="column" gap={5}>
          {/* Supplier & Manager names */}
          <Heading size="md">
            {supplier.name} - {manager.name}
          </Heading>

          {/* Manager Info */}
          <Flex direction="column" gap={2}>
            {/* Email */}
            {isEmailExists && (
              <Flex alignItems="center" gap={2}>
                <FiAtSign color="gray" />

                <Text fontSize="md" color="gray">
                  {manager.email}
                </Text>
              </Flex>
            )}

            {/* Phone */}
            {isPhoneExists && (
              <Flex alignItems="center" gap={2}>
                <FiPhone color="gray" />

                <Text fontSize="md" color="gray">
                  {manager.phone_number}
                </Text>
              </Flex>
            )}

            {/* Comment */}
            {isCommentExists && (
              <Flex alignItems="center" gap={2}>
                <FiMessageSquare color="gray" />

                <Text color="gray">{comment}</Text>
              </Flex>
            )}
          </Flex>
        </Flex>
      </CardBody>
    </Card>
  )
}
