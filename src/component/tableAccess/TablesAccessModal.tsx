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
import { FC } from "react"
import { useQuery } from "react-query"
import { ModalProps } from "type/modalProps"
import { Role } from "type/role/role"
import { RoleTableAccess } from "type/tableAccess/tableAccess"
import { WithId } from "type/withId"

interface TablesAccessModalProps extends ModalProps {
  role: WithId<Role>
}

const TABLES_LIST = ["Production Info"]

export const TablesAccessModal: FC<TablesAccessModalProps> = (props) => {
  const { role, isOpen, onClose } = props

  const roleId = role.id

  const { data: roleTableAccess, isLoading: isRoleAccessLoading } =
    useQuery<RoleTableAccess>(["roleTableAccess", roleId], () =>
      getRoleTablesAccess(roleId),
    )
  const tables = roleTableAccess?.tables

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
                roleId={roleId}
                tableAccess={tableAccess}
              />
            ))}
            {/* TODO: add Select with table */}
            {/* TODO: when table selected append it above table Select */}
            {/* TODO: add Select with table columns as tags */}
            {/* TODO: get role tables access */}
            {/* TODO: after all selected, update or create tables accesses */}
          </Flex>
        </ModalBody>

        <ModalFooter>
          <Flex gap={5}>
            <Button
            // onClick={onTablesAccessUpdate}
            // isLoading={isLoading}
            // isDisabled={isSaveBtnDisabled}
            >
              Save
            </Button>

            <Button
              variant="secondary"
              onClick={onClose}
              // isLoading={isLoading}
            >
              Cancel
            </Button>
          </Flex>
        </ModalFooter>
      </ModalContent>
    </Modal>
  )
}
