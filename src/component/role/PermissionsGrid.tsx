import {
  Checkbox,
  Flex,
  Table,
  TableContainer,
  Tbody,
  Td,
  Text,
  Th,
  Thead,
  Tr,
} from "@chakra-ui/react"
import { getAllPermissions } from "api/role/permission"
import { LoadingPage } from "component/page/LoadingPage"
import { Fragment, FC } from "react"
import { useQuery } from "react-query"
import { Permission } from "type/role/permission"
import { WithId } from "type/withId"
import { getPermissionSections } from "util/permissionGroups"

const ACTION_COLUMNS = ["view", "edit", "delete"] as const

interface PermissionsGridProps {
  checkedPermissionsIds: number[]
  isInvalid: boolean
  handlePermissionsUpdate: (permissionId: number) => void
}

export const PermissionsGrid: FC<PermissionsGridProps> = (props) => {
  const { checkedPermissionsIds, isInvalid, handlePermissionsUpdate } = props

  const { data: permissionsList, isLoading } = useQuery<WithId<Permission>[]>(
    "permissionsList",
    getAllPermissions,
  )

  if (isLoading || !permissionsList) {
    return <LoadingPage />
  }

  const permissionsIdsByName = new Map(
    permissionsList.map(({ id, name }) => [name, id]),
  )
  const sections = getPermissionSections(permissionsList)

  const renderCheckbox = (name?: string, label?: string) => {
    const permissionId = name ? permissionsIdsByName.get(name) : undefined
    if (permissionId === undefined) {
      return null
    }

    return (
      <Checkbox
        isChecked={checkedPermissionsIds.includes(permissionId)}
        isInvalid={isInvalid}
        onChange={() => handlePermissionsUpdate(permissionId)}
      >
        {label && <Text fontSize="sm">{label}</Text>}
      </Checkbox>
    )
  }

  return (
    <TableContainer>
      <Table size="sm">
        <Thead>
          <Tr>
            <Th>Section</Th>
            <Th textAlign="center">View</Th>
            <Th textAlign="center">Edit</Th>
            <Th textAlign="center">Delete</Th>
            <Th>Other</Th>
          </Tr>
        </Thead>

        <Tbody>
          {sections.map((section) => (
            <Fragment key={section.title}>
              <Tr>
                <Td colSpan={5} bgColor="appLayout" pt={4}>
                  <Text
                    fontSize="xs"
                    fontWeight="bold"
                    color="gray"
                    textTransform="uppercase"
                  >
                    {section.title}
                  </Text>
                </Td>
              </Tr>

              {section.rows.map((row) => (
                <Tr key={row.title}>
                  <Td whiteSpace="normal">
                    <Text>{row.title}</Text>
                  </Td>

                  {ACTION_COLUMNS.map((action) => (
                    <Td key={action} textAlign="center">
                      {renderCheckbox(row[action])}
                    </Td>
                  ))}

                  <Td>
                    <Flex gap={4} flexWrap="wrap">
                      {row.extra?.map(({ name, label }) => (
                        <Fragment key={name}>
                          {renderCheckbox(name, label)}
                        </Fragment>
                      ))}
                    </Flex>
                  </Td>
                </Tr>
              ))}
            </Fragment>
          ))}
        </Tbody>
      </Table>
    </TableContainer>
  )
}
