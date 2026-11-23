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
import { RoleCardMenu } from "component/role/RoleCardMenu"
import { RoleDeleteModal } from "component/role/RoleDeleteModal"
import { RoleModal } from "component/role/RoleModal"
import { TablesAccessModal } from "component/tableAccess/TablesAccessModal"
import { ADMIN_ROLE } from "constant/roles"
import { useUserPermissions } from "hook/useUserPermissions"
import { FC } from "react"
import { RoleWithPermissions } from "type/role/role"
import {
  getPermissionSections,
  getRowPermissionsLabels,
} from "util/permissionGroups"

interface RoleCardProps {
  role: RoleWithPermissions
}

export const RoleCard: FC<RoleCardProps> = (props) => {
  const { role } = props

  const { canEditRoles } = useUserPermissions()

  const isAdminRole = role.name.toLowerCase().includes(ADMIN_ROLE)

  const permissions = role.permissions
  const permissionsNames = new Set(permissions.map(({ name }) => name))
  const permissionsRows = getPermissionSections(permissions).flatMap(
    ({ rows }) => rows,
  )

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
            <Flex direction="column" gap={1}>
              {permissionsRows.map((row) => (
                <Text key={row.title} fontSize="sm">
                  <Text as="span" fontWeight="medium">
                    {row.title}
                  </Text>
                  <Text as="span" color="gray">
                    {": "}
                    {getRowPermissionsLabels(row, permissionsNames).join(", ")}
                  </Text>
                </Text>
              ))}
            </Flex>
          </Flex>

          {/* Actions Menu Button */}
          {canEditRoles && (
            <RoleCardMenu
              onEdit={onRoleEditModalOpen}
              onDelete={onRoleDeleteModalOpen}
            />
          )}
        </CardHeader>

        {canEditRoles && (
          <CardFooter mt="auto">
            <Flex w="full" gap={1}>
              <Button
                w="full"
                variant="ghost"
                colorScheme="blue"
                onClick={onRoleEditModalOpen}
              >
                Permissions
              </Button>

              <Button
                w="full"
                variant="ghost"
                colorScheme="blue"
                onClick={onTablesAccessModalOpen}
              >
                Tables Access
              </Button>
            </Flex>
          </CardFooter>
        )}
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
