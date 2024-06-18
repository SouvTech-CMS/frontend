import {
  Button,
  Checkbox,
  Flex,
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
import { FC, useState } from "react"
import {
  FiAtSign,
  FiCornerDownRight,
  FiDollarSign,
  FiPhone,
  FiUser,
} from "react-icons/fi"
import { useQuery } from "react-query"
import { Role } from "type/role"
import { Shop } from "type/shop"
import { User, UserCreate } from "type/user"

interface UserModalProps {
  user?: User
  isOpen: boolean
  onClose: () => void
}

const newUser: UserCreate = {
  username: "",
  fio: "",
  salary: 0,
  email: "",
  phone: "",
}

export const UserModal: FC<UserModalProps> = (props) => {
  const { user = newUser, isOpen, onClose } = props

  const [selectedShops, setSelectedShops] = useState<Shop[]>([])
  const [selectedRoles, setSelectedRoles] = useState<Role[]>([])

  const { data: shopsList } = useQuery<Shop[]>("shopsList", getAllShops)
  const { data: rolesList } = useQuery<Role[]>("rolesList", getAllRoles)

  // const

  const onUserEdit = () => {}

  return (
    <Modal size="2xl" isOpen={isOpen} onClose={onClose} isCentered>
      <ModalOverlay backdropFilter="blur(10px)" />

      <ModalContent>
        <ModalHeader>Cотрудник</ModalHeader>
        <ModalCloseButton />

        <ModalBody>
          <Flex h="full" w="full" direction="row" gap={10}>
            <Flex h="full" w="full" direction="column" gap={5}>
              {/* Username */}
              <Flex alignItems="center" gap={2}>
                <FiCornerDownRight color="gray" />

                <Input placeholder="Логин" value={user.email} />
              </Flex>

              {/* Password */}
              <Flex alignItems="center" gap={2}>
                <FiCornerDownRight color="gray" />

                <Input placeholder="Новый пароль" value={user.password} />
              </Flex>

              {/* FIO */}
              <Flex alignItems="center" gap={2}>
                <FiUser color="gray" />

                <Input placeholder="ФИО" value={user.fio} />
              </Flex>

              {/* Email */}
              <Flex alignItems="center" gap={2}>
                <FiAtSign color="gray" />

                <Input placeholder="Email" value={user.email} />
              </Flex>

              {/* Phone */}
              <Flex alignItems="center" gap={2}>
                <FiPhone color="gray" />

                <Input placeholder="Телефон" value={user.phone} />
              </Flex>

              {/* Salary */}
              <Flex alignItems="center">
                <FiDollarSign color="gray" />

                <Input placeholder="Зарплата" value={user.salary} />
              </Flex>
            </Flex>

            <Flex h="full" w="full" direction="column" gap={5}>
              {/* Shops badges */}
              <Flex direction="column">
                <Text fontWeight="bold">Магазины:</Text>

                <Flex direction={"column"}>
                  {shopsList?.map((shop) => (
                    <Checkbox key={shop.id} value={shop.id}>
                      {shop.name}
                    </Checkbox>
                  ))}
                </Flex>
              </Flex>

              {/* Roles badges */}
              <Flex direction="column">
                <Text fontWeight="bold">Роли:</Text>

                <Flex direction={"column"}>
                  {rolesList?.map((role) => (
                    <Checkbox key={role.id} value={role.id}>
                      {role.name}
                    </Checkbox>
                  ))}
                </Flex>
              </Flex>
            </Flex>
          </Flex>
        </ModalBody>

        <ModalFooter>
          <Flex gap={5}>
            <Button variant="outline" colorScheme="green" onClick={onUserEdit}>
              Сохранить
            </Button>

            <Button variant="outline" colorScheme="blue" onClick={onClose}>
              Отмена
            </Button>
          </Flex>
        </ModalFooter>
      </ModalContent>
    </Modal>
  )
}
