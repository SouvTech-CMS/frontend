import {
  Button,
  Flex,
  Modal,
  ModalBody,
  ModalCloseButton,
  ModalContent,
  ModalFooter,
  ModalHeader,
} from "@chakra-ui/react"
import { getRoleTablesAccess } from "api/tableAccess/tableAccess"
import { ModalBackgroundBlur } from "component/ModalBackgroundBlur"
import { TableAccessCard } from "component/tableAccess/TableAccessCard"
import { FC, useState } from "react"
import { useQuery } from "react-query"
import { useRoleTableAccessUpdateMutation } from "service/tableAccess/tableAccess"
import { titleCase } from "title-case"
import { ModalProps } from "type/modalProps"
import { Role } from "type/role/role"
import {
  RoleTableAccess,
  TableWithAccessList,
} from "type/tableAccess/tableAccess"
import { WithId } from "type/withId"
import { notify } from "util/toasts"

interface TablesAccessModalProps extends ModalProps {
  role: WithId<Role>
}

export const TablesAccessModal: FC<TablesAccessModalProps> = (props) => {
  const { role, isOpen, onClose } = props

  const roleId = role.id
  const roleName = role.name

  const [tableAccess, setTableAccess] = useState<RoleTableAccess | undefined>()
  const tables = tableAccess?.tables

  const { isLoading: isRoleAccessLoading } = useQuery<RoleTableAccess>(
    ["roleTableAccess", roleId],
    () => getRoleTablesAccess(roleId),
    {
      onSuccess: (roleTableAccess) => {
        setTableAccess(roleTableAccess)
      },
    },
  )

  const roleTableAccessUpdateMutation = useRoleTableAccessUpdateMutation()

  const isLoading =
    isRoleAccessLoading || roleTableAccessUpdateMutation.isLoading

  const isSaveBtnDisabled = isLoading

  const handleTableAccessChange = (newTableAccess: TableWithAccessList) => {
    setTableAccess(
      (prevTableAccess) =>
        ({
          role_id: prevTableAccess?.role_id,
          tables: [
            ...(prevTableAccess?.tables.filter(
              ({ table_name }) => table_name !== newTableAccess.table_name,
            ) as TableWithAccessList[]),
            newTableAccess,
          ],
        } as RoleTableAccess),
    )
  }

  const handleRoleTablesAccessUpdate = async () => {
    if (!tableAccess) {
      return
    }

    await roleTableAccessUpdateMutation.mutateAsync(tableAccess)

    notify(
      `${titleCase(roleName)}'s table access updated successfully`,
      "success",
    )

    onClose()
  }

  return (
    <Modal size="2xl" isOpen={isOpen} onClose={onClose} isCentered>
      <ModalBackgroundBlur />

      <ModalContent>
        <ModalHeader>Tables data access for {role.name}</ModalHeader>
        <ModalCloseButton />

        <ModalBody>
          <Flex w="full" direction="column" gap={5}>
            {tables?.map((tableAccess, index) => (
              <TableAccessCard
                key={index}
                prevTableAccess={tableAccess}
                onChange={handleTableAccessChange}
              />
            ))}
          </Flex>
        </ModalBody>

        <ModalFooter>
          <Flex gap={5}>
            <Button
              onClick={handleRoleTablesAccessUpdate}
              isLoading={isLoading}
              isDisabled={isSaveBtnDisabled}
            >
              Save
            </Button>

            <Button variant="secondary" onClick={onClose} isLoading={isLoading}>
              Cancel
            </Button>
          </Flex>
        </ModalFooter>
      </ModalContent>
    </Modal>
  )
}
