import {
  Card,
  CardHeader,
  Flex,
  Heading,
  IconButton,
  Text,
} from "@chakra-ui/react"
import { FC } from "react"
import { FiAtSign, FiPhone, FiTrash2 } from "react-icons/fi"
import { useSupplierManagerDeleteMutation } from "service/supplierManager"
import { SupplierManager } from "type/supplierManager"
import { WithId } from "type/withId"
import { notify } from "util/toasts"

interface ManagerCardProps {
  manager: WithId<SupplierManager>
}

export const ManagerCard: FC<ManagerCardProps> = (props) => {
  const { manager } = props

  const isEmailExists = !!manager.email
  const isPhoneExists = !!manager.phone_number

  const managerDeleteMutation = useSupplierManagerDeleteMutation()

  const onDeleteManager = async () => {
    await managerDeleteMutation.mutateAsync(manager.id)

    notify(`Manager ${manager.name} deleted successfully`, "success")
  }

  return (
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

          {/* Delete btn */}
          <IconButton
            position="absolute"
            top={0}
            right={0}
            aria-label="delete-manager"
            variant="ghost"
            colorScheme="red"
            icon={<FiTrash2 />}
            onClick={onDeleteManager}
          />
        </Flex>
      </CardHeader>
    </Card>
  )
}
