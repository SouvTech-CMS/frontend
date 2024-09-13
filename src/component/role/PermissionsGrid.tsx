import { Grid } from "@chakra-ui/react"
import { getAllPermissions } from "api/role/permission"
import { LoadingPage } from "component/page/LoadingPage"
import { PermissionsGridItem } from "component/role/PermissionsGridItem"
import { FC } from "react"
import { useQuery } from "react-query"
import { Permission } from "type/role/permission"
import { WithId } from "type/withId"

interface PermissionsGridProps {
  checkedPermissionsIds: number[]
  handlePermissionsUpdate: (permissionId: number) => void
}

export const PermissionsGrid: FC<PermissionsGridProps> = (props) => {
  const { checkedPermissionsIds, handlePermissionsUpdate } = props

  const { data: permissionsList, isLoading } = useQuery<WithId<Permission>[]>(
    "permissionsList",
    getAllPermissions,
  )

  if (isLoading) {
    return <LoadingPage />
  }

  return (
    <Grid templateColumns="repeat(2, 1fr)" gap={4}>
      {permissionsList?.map((permission, index) => (
        <PermissionsGridItem
          key={index}
          permission={permission}
          checkedPermissionsIds={checkedPermissionsIds}
          handlePermissionsUpdate={handlePermissionsUpdate}
        />
      ))}
    </Grid>
  )
}
