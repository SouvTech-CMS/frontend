import {
  Button,
  Checkbox,
  Flex,
  FormControl,
  Input,
  Modal,
  ModalBody,
  ModalCloseButton,
  ModalContent,
  ModalFooter,
  ModalHeader,
  ModalOverlay,
  Text,
} from "@chakra-ui/react"
import { getAllRoles } from "api/role"
import { getAllShops } from "api/shop"
import { AxiosError } from "axios"
import { ADMIN_ROLE } from "constant/roles"
import { useUserContext } from "context/user"
import { ChangeEvent, FC, useEffect, useState } from "react"
import {
  FiAtSign,
  FiCornerDownRight,
  FiDollarSign,
  FiPhone,
  FiUser,
} from "react-icons/fi"
import { useQuery } from "react-query"
import { useUserCreateMutation, useUserUpdateMutation } from "service/user"
import { Role } from "type/role"
import { Shop } from "type/shop"
import { RoleWithPermissions, User, UserCreateOrUpdate } from "type/user"
import { WithId } from "type/withId"
import { notify } from "util/toasts"
import { isPasswordValid, isUsernameValid } from "util/validation"

interface UserModalProps {
  prevUser?: WithId<User>
  shops?: WithId<Shop>[]
  roles?: RoleWithPermissions[]
  isOpen: boolean
  onClose: () => void
}

const newUser: User = {
  username: "",
  fio: "",
  salary: 0,
  email: "",
  phone: "",
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

  const userCreateMutation = useUserCreateMutation()
  const userUpdateMutation = useUserUpdateMutation()

  const isUsernameInvalid = !user.username
  const isPasswordInvalid = (isNewUser && !newPassword) || isUsernameInvalid
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
        prevShops.filter((prevShopId) => prevShopId !== shopId)
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
        prevRoles.filter((prevRoleId) => prevRoleId !== roleId)
      )
    }
  }

  const onUserUpdate = async () => {
    const body: UserCreateOrUpdate = {
      user: {
        ...user,
        id: prevUser?.id,
      },
      roles_list: selectedRoles,
      shops_list: selectedShops,
    }

    const isInvalidUsername = !isUsernameValid(user.username)
    if (isInvalidUsername) {
      notify("Логин должен содержать минимум 5 символов", "error")
      return
    }

    if (isNewUser || !!newPassword) {
      const isInvalidPassword = !isPasswordValid(newPassword)
      if (isInvalidPassword) {
        notify(
          "Пароль должен содержать буквы разных регистров и цифры и быть длиной минимум 8 символов",
          "error"
        )
        return
      }
    }

    try {
      if (isNewUser) {
        user.password = newPassword

        await userCreateMutation.mutateAsync(body)

        notify(`Сотрудник ${user.fio} успешно добавлен`, "success")
      } else {
        user.password = undefined

        await userUpdateMutation.mutateAsync(body)

        notify(`Сотрудник ${user.fio} успешно изменён`, "success")
      }
      onClose()
    } catch (e) {
      if (e instanceof AxiosError) {
        if (e.response?.status === 400) {
          notify("Пользователь с таким логином уже существует", "error")
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
      const rolesIds = roles?.map((role) => role.role.id)
      setSelectedRoles(rolesIds || [])
    }
  }, [prevUser, shopsList, rolesList, shops, roles, isOpen])

  return (
    <Modal size="2xl" isOpen={isOpen} onClose={onClose} isCentered>
      <ModalOverlay backdropFilter="blur(10px)" />

      <ModalContent>
        <ModalHeader>
          {isNewUser ? "Новый сотрудник" : "Cотрудник"}{" "}
        </ModalHeader>
        <ModalCloseButton />

        <ModalBody>
          <Flex w="full" direction="row" gap={10}>
            <Flex w="full" direction="column" gap={5}>
              {/* Username */}
              <Flex alignItems="center" gap={2}>
                <FiCornerDownRight color="gray" />

                <FormControl isInvalid={isUsernameInvalid}>
                  <Input
                    placeholder="Логин"
                    value={user.username}
                    type="text"
                    onChange={(e) => {
                      const value = e.target.value.trim()
                      handleUserUpdate("username", value)
                    }}
                  />
                </FormControl>
              </Flex>

              {/* Password */}
              <Flex alignItems="center" gap={2}>
                <FiCornerDownRight color="gray" />

                <FormControl isInvalid={isPasswordInvalid}>
                  <Input
                    placeholder="Новый пароль"
                    value={newPassword}
                    type="text"
                    onChange={(e) => {
                      const value = e.target.value.trim()
                      setNewPassword(value)
                    }}
                  />
                </FormControl>
              </Flex>

              {/* FIO */}
              <Flex alignItems="center" gap={2}>
                <FiUser color="gray" />

                <FormControl isInvalid={isFioInvalid}>
                  <Input
                    placeholder="ФИО"
                    value={user.fio}
                    type="text"
                    onChange={(e) => {
                      const value = e.target.value
                      handleUserUpdate("fio", value)
                    }}
                  />
                </FormControl>
              </Flex>

              {/* Email */}
              <Flex alignItems="center" gap={2}>
                <FiAtSign color="gray" />

                <Input
                  placeholder="Email"
                  value={user.email}
                  type="email"
                  onChange={(e) => {
                    const value = e.target.value.trim()
                    handleUserUpdate("email", value)
                  }}
                />
              </Flex>

              {/* Phone */}
              <Flex alignItems="center" gap={2}>
                <FiPhone color="gray" />

                <Input
                  placeholder="Телефон"
                  value={user.phone}
                  type="number"
                  onChange={(e) => {
                    const value = e.target.value
                    handleUserUpdate("phone", value)
                  }}
                />
              </Flex>

              {/* Salary */}
              <Flex alignItems="center">
                <FiDollarSign color="gray" />

                <Input
                  placeholder="Зарплата"
                  value={user.salary}
                  type="number"
                  onChange={(e) => {
                    const value = e.target.value
                    handleUserUpdate("salary", value)
                  }}
                />
              </Flex>
            </Flex>

            <Flex w="full" direction="column" gap={5}>
              {/* Shops badges */}
              <Flex direction="column">
                <Text fontWeight="bold">Магазины:</Text>

                <FormControl isInvalid={isSelectedShopsInvalid}>
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
                <Text fontWeight="bold">Роли:</Text>

                <FormControl isInvalid={isSelectedRolesInvalid}>
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
                          isDisabled={isAdminRoleCheckboxDisabled}
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
              variant="solid"
              colorScheme="blue"
              onClick={onUserUpdate}
              isDisabled={isSaveBtnDisabled}
            >
              Сохранить
            </Button>

            <Button variant="solid" colorScheme="gray" onClick={onClose}>
              Отмена
            </Button>
          </Flex>
        </ModalFooter>
      </ModalContent>
    </Modal>
  )
}
