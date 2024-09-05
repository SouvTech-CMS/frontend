import {
  Card,
  CardHeader,
  Flex,
  Heading,
  Text,
  useDisclosure,
} from "@chakra-ui/react"
import { ManagerCardMenu } from "component/supplierManager/ManagerCardMenu"
import { ManagerModal } from "component/supplierManager/ManagerModal"
import { useCommentInput } from "hook/useCommentInput"
import { FC } from "react"
import { FiAtSign, FiMessageSquare, FiPhone } from "react-icons/fi"
import { useSupplierManagerDeleteMutation } from "service/supplier/supplierManager"
import { SupplierManager } from "type/supplier/supplierManager"
import { WithId } from "type/withId"
import { notify } from "util/toasts"

interface ManagerCardProps {
  manager: WithId<SupplierManager>
}

export const ManagerCard: FC<ManagerCardProps> = (props) => {
  const { manager } = props

  const supplierId = manager.supplier_id
  const managerId = manager.id
  const isEmailExists = !!manager.email.trim()
  const isPhoneExists = !!manager.phone_number.trim()

  const managerDeleteMutation = useSupplierManagerDeleteMutation()

  const { comment } = useCommentInput({
    objectName: "supplier_manager",
    objectId: managerId,
  })
  const isCommentExists = !!comment.trim()

  const {
    isOpen: isManagerUpdateModalOpen,
    onOpen: onManagerUpdateModalOpen,
    onClose: onManagerUpdateModalClose,
  } = useDisclosure()

  const onDeleteManager = async () => {
    await managerDeleteMutation.mutateAsync(managerId)

    notify(`Manager ${manager.name} deleted successfully`, "success")
  }

  return (
    <>
      <Card boxShadow="md" borderRadius={10}>
        <CardHeader>
          <Flex w="full" direction="column" gap={2}>
            {/* Name */}
            <Heading size="md">{manager.name}</Heading>

            {/* Email */}
            {isEmailExists && (
              <Flex alignItems="center" gap={2}>
                <FiAtSign color="gray" />

                <Text color="gray">{manager.email}</Text>
              </Flex>
            )}

            {/* Phone Number */}
            {isPhoneExists && (
              <Flex alignItems="center" gap={2}>
                <FiPhone color="gray" />

                <Text color="gray">{manager.phone_number}</Text>
              </Flex>
            )}

            {/* Comment */}
            {isCommentExists && (
              <Flex alignItems="center" gap={2}>
                <FiMessageSquare color="gray" />

                <Text color="gray">{comment}</Text>
              </Flex>
            )}

            <ManagerCardMenu
              onEdit={onManagerUpdateModalOpen}
              onDelete={onDeleteManager}
            />
          </Flex>
        </CardHeader>
      </Card>

      <ManagerModal
        supplierId={supplierId}
        managerId={managerId}
        prevManager={manager}
        isOpen={isManagerUpdateModalOpen}
        onClose={onManagerUpdateModalClose}
      />
    </>
  )
}
