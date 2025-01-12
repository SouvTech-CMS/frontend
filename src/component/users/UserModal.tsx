import {
  Button,
  Checkbox,
  Flex,
  FormControl,
  Input,
  InputGroup,
  InputLeftElement,
  Modal,
  ModalBody,
  ModalCloseButton,
  ModalContent,
  ModalFooter,
  ModalHeader,
  Text,
} from "@chakra-ui/react"
import { getAllRoles } from "api/role/role"
import { getAllShops } from "api/shop"
import { AxiosError } from "axios"
import { ModalBackgroundBlur } from "component/ModalBackgroundBlur"
import { CommentInput } from "component/comment/Comment"
import { ADMIN_ROLE } from "constant/roles"
import { useUserContext } from "context/user"
import { useCommentInput } from "hook/useCommentInput"
import { ChangeEvent, FC, useEffect, useState } from "react"
import {
  FiAtSign,
  FiDollarSign,
  FiLock,
  FiLogIn,
  FiPhone,
  FiUser,
} from "react-icons/fi"
import { useQuery } from "react-query"
import { useUserCreateMutation, useUserUpdateMutation } from "service/user"
import { ModalProps } from "type/modalProps"
import { Role, RoleWithPermissions } from "type/role/role"
import { Shop } from "type/shop"
import { User, UserCreate, UserUpdate } from "type/user"
import { WithId } from "type/withId"
import { notify } from "util/toasts"
import { isPasswordValid, isUsernameValid } from "util/validation"

interface UserModalProps extends ModalProps {
  prevUser?: WithId<User>
  shops?: WithId<Shop>[]
  roles?: RoleWithPermissions[]
}

const newUser: User = {
  username: "",
}

export const UserModal: FC<UserModalProps> = (props) => {
  const { prevUser, shops, roles, isOpen, onClose } = props

  const { currentUser } = useUserContext()

  const isNewUser = !prevUser

  const [user, setUser] = useState<User>(prevUser || newUser)
  const [newPassword, setNewPassword] = useState<string>("")
  const [selectedShops, setSelectedShops] = useState<number[]>([])
  const [selectedRoles, setSelectedRoles] = useState<number[]>([])

  const { data: shopsList } = useQuery<WithId<Shop>[]>("shopsList", getAllShops)
  const { data: rolesList } = useQuery<WithId<Role>[]>("rolesList", getAllRoles)

  const { comment, handleCommentChange, onCommentSubmit, isCommentLoading } =
    useCommentInput({
      objectName: "user",
      objectId: prevUser?.id,
    })

  const userCreateMutation = useUserCreateMutation()
  const userUpdateMutation = useUserUpdateMutation()

  const isLoading = userCreateMutation.isLoading || userUpdateMutation.isLoading

  const isUsernameInvalid = !user.username
  const isPasswordInvalid =
    (isNewUser && !newPassword.trim()) || isUsernameInvalid
  const isFioInvalid = !user.fio
  const isSelectedShopsInvalid = selectedShops?.length === 0
  const isSelectedRolesInvalid = selectedRoles?.length === 0

  const isSaveBtnDisabled =
    isUsernameInvalid ||
    isPasswordInvalid ||
    isFioInvalid ||
    isSelectedShopsInvalid ||
    isSelectedRolesInvalid

  const isUserIsCurrent = user.username === currentUser?.username

  const handleUserUpdate = (param: string, value: number | string) => {
    setUser((prevUser) => ({
      ...prevUser,
      [param]: value,
    }))
  }

  const handleShopsUpdate = (e: ChangeEvent<HTMLInputElement>) => {
    const isChecked = e.target.checked
    const shopId = Number(e.target.value)

    if (isChecked) {
      setSelectedShops((prevShopsIds) => [...prevShopsIds, shopId])
    } else {
      setSelectedShops((prevShops) =>
        prevShops.filter((prevShopId) => prevShopId !== shopId),
      )
    }
  }

  const handleRolesUpdate = (e: ChangeEvent<HTMLInputElement>) => {
    const isChecked = e.target.checked
    const roleId = Number(e.target.value)

    if (isChecked) {
      setSelectedRoles((prevRolesIds) => [...prevRolesIds, roleId])
    } else {
      setSelectedRoles((prevRoles) =>
        prevRoles.filter((prevRoleId) => prevRoleId !== roleId),
      )
    }
  }

  const onUserUpdate = async () => {
    //* Remove user password param, to not change it if not needed
    delete user["password"]

    const isInvalidUsername = !isUsernameValid(user.username)
    if (isInvalidUsername) {
      notify("Username must contain at least 5 characters", "error")
      return
    }

    if (isNewUser || !!newPassword.trim()) {
      const isInvalidPassword = !isPasswordValid(newPassword)
      if (isInvalidPassword) {
        notify(
          "Password must contain upper and lower case letters and numbers and be at least 8 characters long",
          "error",
        )
        return
      }
    }

    try {
      if (isNewUser) {
        const body: UserCreate = {
          user: {
            ...user,
            password: newPassword,
          },
          roles_list: selectedRoles,
          shops_list: selectedShops,
        }

        const { id: newUserId } = await userCreateMutation.mutateAsync(body)

        await onCommentSubmit(newUserId)

        notify(`Employee ${user.fio} successfully added`, "success")
      } else {
        const body: UserUpdate = {
          user: {
            ...user,
            id: prevUser.id,
          },
          roles_list: selectedRoles,
          shops_list: selectedShops,
        }

        if (!!newPassword.trim()) {
          body.user.password = newPassword
        }

        await userUpdateMutation.mutateAsync(body)

        await onCommentSubmit()

        notify(`Employee ${user.fio} successfully updated`, "success")
      }
      onClose()
    } catch (e) {
      if (e instanceof AxiosError) {
        if (e.response?.status === 400) {
          notify("User with this username already exists", "error")
        }
      }
    }
  }

  useEffect(() => {
    if (prevUser) {
      setUser(prevUser)
    } else {
      setUser(newUser)
    }
    setNewPassword("")

    if (shopsList) {
      const shopsIds = shops?.map((shop) => shop.id)
      setSelectedShops(shopsIds || [])
    }

    if (rolesList) {
      const rolesIds = roles?.map((role) => role.id)
      setSelectedRoles(rolesIds || [])
    }
  }, [prevUser, shopsList, rolesList, shops, roles, isOpen])

  return (
    <Modal size="2xl" isOpen={isOpen} onClose={onClose} isCentered>
      <ModalBackgroundBlur />

      <ModalContent>
        <ModalHeader>{isNewUser ? "New Employee" : "Employee"}</ModalHeader>
        <ModalCloseButton />

        <ModalBody>
          <Flex w="full" direction="row" gap={10}>
            <Flex w="full" direction="column" gap={5}>
              {/* Username */}
              <InputGroup>
                <InputLeftElement color="gray">
                  <FiLogIn />
                </InputLeftElement>

                <Input
                  placeholder="Username"
                  value={user.username}
                  type="text"
                  onChange={(e) => {
                    const value = e.target.value.replaceAll(" ", "").trim()
                    handleUserUpdate("username", value)
                  }}
                  isDisabled={isLoading}
                  isInvalid={isUsernameInvalid}
                />
              </InputGroup>

              {/* Password */}
              <InputGroup>
                <InputLeftElement color="gray">
                  <FiLock />
                </InputLeftElement>

                <Input
                  placeholder="New Password"
                  value={newPassword}
                  type="text"
                  onChange={(e) => {
                    const value = e.target.value.replaceAll(" ", "").trim()
                    setNewPassword(value)
                  }}
                  isDisabled={isLoading}
                  isInvalid={isPasswordInvalid}
                />
              </InputGroup>

              {/* FIO */}
              <InputGroup>
                <InputLeftElement color="gray">
                  <FiUser />
                </InputLeftElement>

                <Input
                  placeholder="Full Name"
                  value={user.fio}
                  type="text"
                  onChange={(e) => {
                    const value = e.target.value
                    handleUserUpdate("fio", value)
                  }}
                  isDisabled={isLoading}
                  isInvalid={isFioInvalid}
                />
              </InputGroup>

              {/* Email */}
              <InputGroup>
                <InputLeftElement color="gray">
                  <FiAtSign />
                </InputLeftElement>

                <Input
                  placeholder="Email"
                  value={user.email}
                  type="email"
                  onChange={(e) => {
                    const value = e.target.value.replaceAll(" ", "").trim()
                    handleUserUpdate("email", value)
                  }}
                  isDisabled={isLoading}
                />
              </InputGroup>

              {/* Phone */}
              <InputGroup>
                <InputLeftElement color="gray">
                  <FiPhone />
                </InputLeftElement>

                <Input
                  placeholder="Phone"
                  value={user.phone}
                  type="number"
                  onChange={(e) => {
                    const value = e.target.valueAsNumber
                    handleUserUpdate("phone", value)
                  }}
                  isDisabled={isLoading}
                />
              </InputGroup>

              {/* Salary */}
              <InputGroup>
                <InputLeftElement color="gray">
                  <FiDollarSign />
                </InputLeftElement>

                <Input
                  placeholder="Salary"
                  value={user.salary}
                  type="number"
                  onChange={(e) => {
                    const value = e.target.valueAsNumber
                    handleUserUpdate("salary", value)
                  }}
                  isDisabled={isLoading}
                />
              </InputGroup>

              {/* Comment */}
              <CommentInput
                comment={comment}
                handleCommentChange={handleCommentChange}
                isDisabled={isCommentLoading}
              />
            </Flex>

            <Flex w="full" direction="column" gap={5}>
              {/* Shops badges */}
              <Flex direction="column">
                <Text fontWeight="bold">Shops:</Text>

                <FormControl
                  isInvalid={isSelectedShopsInvalid}
                  isDisabled={isLoading}
                >
                  <Flex direction={"column"}>
                    {shopsList?.map((shop) => (
                      <Checkbox
                        key={shop.id}
                        value={shop.id}
                        isChecked={selectedShops.includes(shop.id)}
                        onChange={handleShopsUpdate}
                      >
                        {shop.name}
                      </Checkbox>
                    ))}
                  </Flex>
                </FormControl>
              </Flex>

              {/* Roles badges */}
              <Flex direction="column">
                <Text fontWeight="bold">Roles:</Text>

                <FormControl
                  isInvalid={isSelectedRolesInvalid}
                  isDisabled={isLoading}
                >
                  <Flex direction={"column"}>
                    {rolesList?.map((role) => {
                      const isAdminRoleCheckboxDisabled =
                        isUserIsCurrent &&
                        role.name.toLowerCase() === ADMIN_ROLE.toLowerCase()

                      return (
                        <Checkbox
                          key={role.id}
                          value={role.id}
                          isChecked={selectedRoles.includes(role.id)}
                          onChange={handleRolesUpdate}
                          isDisabled={isAdminRoleCheckboxDisabled || isLoading}
                        >
                          {role.name}
                        </Checkbox>
                      )
                    })}
                  </Flex>
                </FormControl>
              </Flex>
            </Flex>
          </Flex>
        </ModalBody>

        <ModalFooter>
          <Flex gap={5}>
            <Button
              onClick={onUserUpdate}
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
