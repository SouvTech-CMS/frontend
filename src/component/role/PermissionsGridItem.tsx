import { Checkbox, Flex, GridItem, Text } from "@chakra-ui/react"
import { FC } from "react"
import { Permission } from "type/role/permission"
import { WithId } from "type/withId"

interface PermissionsGridItemProps {
  permission: WithId<Permission>
  checkedPermissionsIds: number[]
  handlePermissionsUpdate: (permissionId: number) => void
}

export const PermissionsGridItem: FC<PermissionsGridItemProps> = (props) => {
  const { permission, checkedPermissionsIds, handlePermissionsUpdate } = props

  const permissionId = permission.id
  const isChecked = checkedPermissionsIds.includes(permissionId)

  const handlePermissionChange = () => {
    handlePermissionsUpdate(permissionId)
  }

  return (
    <GridItem>
      <Flex
        alignItems="center"
        onClick={handlePermissionChange}
        cursor="pointer"
        gap={3}
      >
        <Checkbox isChecked={isChecked} />

        <Text>{permission.description}</Text>
      </Flex>
    </GridItem>
  )
}
