import {
  Button,
  Flex,
  Input,
  InputGroup,
  InputLeftElement,
  Modal,
  ModalBody,
  ModalCloseButton,
  ModalContent,
  ModalFooter,
  ModalHeader,
} from "@chakra-ui/react"
import { ModalBackgroundBlur } from "component/ModalBackgroundBlur"
import { PermissionsGrid } from "component/role/PermissionsGrid"
import { FC, useEffect, useMemo, useState } from "react"
import { FiAlignLeft, FiUser } from "react-icons/fi"
import { useRoleCreateMutation, useRoleUpdateMutation } from "service/role/role"
import { ModalProps } from "type/modalProps"
import { Permission } from "type/role/permission"
import {
  Role,
  RoleCreate,
  RoleUpdate,
  RoleWithPermissions,
} from "type/role/role"
import { WithId } from "type/withId"
import { notify } from "util/toasts"

interface RoleModalProps extends ModalProps {
  prevRole?: RoleWithPermissions
  prevPermissions?: WithId<Permission>[]
}

const newRole: Role = {
  name: "",
}

export const RoleModal: FC<RoleModalProps> = (props) => {
  const { prevRole, prevPermissions, isOpen, onClose } = props

  const roleId = prevRole?.id
  const isNewRole = !prevRole && !prevPermissions && !roleId

  const prevPermissionsIds = useMemo(
    () =>
      prevPermissions ? prevPermissions.map((permission) => permission.id) : [],
    [prevPermissions],
  )

  const [role, setRole] = useState<Role>(prevRole || newRole)
  const [permissions, setPermissions] = useState<number[]>(prevPermissionsIds)

  const roleCreateMutation = useRoleCreateMutation()
  const roleUpdateMutation = useRoleUpdateMutation()

  const isLoading = roleCreateMutation.isLoading || roleUpdateMutation.isLoading

  const isNameInvalid = !role.name.trim()
  const isPermissionsInvalid = permissions.length === 0
  const isSaveBtnDisabled = isNameInvalid || isPermissionsInvalid

  // const { comment, handleCommentChange, onCommentSubmit, isCommentLoading } =
  //   useCommentInput({
  //     objectName: "role",
  //     objectId: roleId,
  //   })

  const handleRoleUpdate = (param: string, value: number | string) => {
    setRole((prevRole) => ({
      ...prevRole,
      [param]: value,
    }))
  }

  const handlePermissionsUpdate = (permissionId: number) => {
    const isPermissionExists = permissions.includes(permissionId)

    if (isPermissionExists) {
      const filteredPermissions = permissions.filter(
        (checkedPermissionId) => checkedPermissionId !== permissionId,
      )
      setPermissions(filteredPermissions)
    } else {
      setPermissions((prevPermissions) => [...prevPermissions, permissionId])
    }
  }

  const onRoleUpdate = async () => {
    if (isNewRole) {
      const body: RoleCreate = {
        role,
        permissions_list: permissions,
      }

      // const { id: newRoleId } =
      await roleCreateMutation.mutateAsync(body)

      // await onCommentSubmit(newRoleId)

      notify(`Role ${role.name} created successfully`, "success")
    } else {
      const body: RoleUpdate = {
        role: {
          ...role,
          id: roleId!,
        },
        permissions_list: permissions,
      }

      await roleUpdateMutation.mutateAsync(body)

      // await onCommentSubmit()

      notify(`Role ${role.name} updated successfully`, "success")
    }

    onClose()
  }

  useEffect(() => {
    if (isNewRole) {
      setRole(newRole)
      setPermissions([])
    } else {
      //* Remove permissions from role data, to not sending it in update request
      const { permissions, ...roleData } = prevRole!
      setRole(roleData)
      setPermissions(prevPermissionsIds)
    }
  }, [isOpen, isNewRole, prevRole, prevPermissionsIds])

  return (
    <Modal size="xl" isOpen={isOpen} onClose={onClose} isCentered>
      <ModalBackgroundBlur />

      <ModalContent>
        <ModalHeader>{isNewRole ? "New role" : "Role"}</ModalHeader>
        <ModalCloseButton />

        <ModalBody>
          <Flex w="full" direction="column" gap={5}>
            {/* Name */}
            <InputGroup>
              <InputLeftElement color="gray">
                <FiUser />
              </InputLeftElement>

              <Input
                placeholder="Name"
                value={role.name}
                type="text"
                onChange={(e) => {
                  const value = e.target.value
                  handleRoleUpdate("name", value)
                }}
                isInvalid={isNameInvalid}
                isDisabled={isLoading}
              />
            </InputGroup>

            {/* Description */}
            <InputGroup>
              <InputLeftElement color="gray">
                <FiAlignLeft />
              </InputLeftElement>

              <Input
                placeholder="Description"
                value={role.description}
                type="text"
                onChange={(e) => {
                  const value = e.target.value
                  handleRoleUpdate("description", value)
                }}
                isDisabled={isLoading}
              />
            </InputGroup>

            {/* Permissions */}
            <PermissionsGrid
              checkedPermissionsIds={permissions}
              handlePermissionsUpdate={handlePermissionsUpdate}
            />

            {/* Comment */}
            {/* <CommentInput
              comment={comment}
              handleCommentChange={handleCommentChange}
              isDisabled={isCommentLoading}
            /> */}
          </Flex>
        </ModalBody>

        <ModalFooter>
          <Flex gap={5}>
            <Button
              onClick={onRoleUpdate}
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
