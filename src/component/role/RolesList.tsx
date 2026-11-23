import { Badge, Box, Button, useDisclosure } from "@chakra-ui/react"
import { Container } from "component/Container"
import { RoleModal } from "component/role/RoleModal"
import { useUserPermissions } from "hook/useUserPermissions"
import { FC } from "react"
import { FiPlus } from "react-icons/fi"
import { RoleWithPermissions } from "type/role/role"

interface RolesListProps {
  roles: RoleWithPermissions[]
  selectedRoleId?: number
  onSelect: (roleId: number) => void
  getEmployeesCount: (roleId: number) => number
}

export const RolesList: FC<RolesListProps> = (props) => {
  const { roles, selectedRoleId, onSelect, getEmployeesCount } = props

  const { canEditRoles } = useUserPermissions()

  const {
    isOpen: isNewRoleModalOpen,
    onOpen: onNewRoleModalOpen,
    onClose: onNewRoleModalClose,
  } = useDisclosure()

  return (
    <Container w={240} flexShrink={0} gap={1} p={3}>
      {roles.map((role) => {
        const isSelected = role.id === selectedRoleId

        return (
          <Button
            key={role.id}
            w="full"
            justifyContent="space-between"
            variant={isSelected ? "solid" : "ghost"}
            colorScheme={isSelected ? "blue" : "gray"}
            onClick={() => onSelect(role.id)}
          >
            {role.name}
            <Badge
              borderRadius="full"
              colorScheme={isSelected ? "whiteAlpha" : "gray"}
              title="Employees"
            >
              {getEmployeesCount(role.id)}
            </Badge>
          </Button>
        )
      })}

      {canEditRoles && (
        <Box w="full" pt={2}>
          <Button w="full" leftIcon={<FiPlus />} onClick={onNewRoleModalOpen}>
            New role
          </Button>
        </Box>
      )}

      <RoleModal isOpen={isNewRoleModalOpen} onClose={onNewRoleModalClose} />
    </Container>
  )
}
