import {
  Button,
  Card,
  CardFooter,
  CardHeader,
  Flex,
  Heading,
  ListItem,
  Text,
  UnorderedList,
  useDisclosure,
} from "@chakra-ui/react"
import { RoleCardMenu } from "component/role/RoleCardMenu"
import { RoleDeleteModal } from "component/role/RoleDeleteModal"
import { RoleModal } from "component/role/RoleModal"
import { TablesAccessModal } from "component/tableAccess/TablesAccessModal"
import { ADMIN_ROLE } from "constant/roles"
import { FC } from "react"
import { RoleWithPermissions } from "type/role/role"

interface RoleCardProps {
  role: RoleWithPermissions
}

export const RoleCard: FC<RoleCardProps> = (props) => {
  const { role } = props

  const isAdminRole = role.name.toLowerCase().includes(ADMIN_ROLE)

  const permissions = role.permissions

  // Edit
  const {
    isOpen: isRoleEditModalOpen,
    onOpen: onRoleEditModalOpen,
    onClose: onRoleEditModalClose,
  } = useDisclosure()

  // Delete
  const {
    isOpen: isRoleDeleteModalOpen,
    onOpen: onRoleDeleteModalOpen,
    onClose: onRoleDeleteModalClose,
  } = useDisclosure()

  // Accesses
  const {
    isOpen: isTablesAccessModalOpen,
    onOpen: onTablesAccessModalOpen,
    onClose: onTablesAccessModalClose,
  } = useDisclosure()

  // const { comment } = useCommentInput({
  //   objectName: "role",
  //   objectId: roleId,
  // })
  // const isCommentExists = !!comment.trim()

  if (isAdminRole) {
    return <></>
  }

  return (
    <>
      <Card h="full" w="full" minH={250} borderRadius={20}>
        <CardHeader>
          <Flex direction="column" gap={2}>
            {/* Name */}
            <Heading size="md">{role.name}</Heading>

            {/* Comment */}
            {/* {isCommentExists && (
              <Text color="gray" fontSize="sm">
                {comment}
              </Text>
            )} */}

            {/* Permissions */}
            <UnorderedList colorScheme="gray">
              {permissions.map((permission, index) => (
                <ListItem key={index}>
                  <Text color="gray">{permission.description}</Text>
                </ListItem>
              ))}
            </UnorderedList>
          </Flex>

          {/* Actions Menu Button */}
          <RoleCardMenu
            onEdit={onRoleEditModalOpen}
            onDelete={onRoleDeleteModalOpen}
          />
        </CardHeader>

        <CardFooter mt="auto">
          <Flex w="full">
            <Button
              w="full"
              variant="ghost"
              colorScheme="blue"
              onClick={onTablesAccessModalOpen}
            >
              Edit access to tables data
            </Button>
          </Flex>
        </CardFooter>
      </Card>

      {/* Modals */}
      <>
        <RoleModal
          prevRole={role}
          prevPermissions={permissions}
          isOpen={isRoleEditModalOpen}
          onClose={onRoleEditModalClose}
        />

        <RoleDeleteModal
          role={role}
          isOpen={isRoleDeleteModalOpen}
          onClose={onRoleDeleteModalClose}
        />

        <TablesAccessModal
          role={role}
          isOpen={isTablesAccessModalOpen}
          onClose={onTablesAccessModalClose}
        />
      </>
    </>
  )
}
