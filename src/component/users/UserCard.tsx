import {
  Badge,
  Card,
  CardBody,
  CardHeader,
  Flex,
  Heading,
  Text,
  Wrap,
  WrapItem,
  useDisclosure,
} from "@chakra-ui/react"
import { CardMenu } from "component/users/UserCardMenu"
import { UserDeleteModal } from "component/users/UserDeleteModal"
import { UserModal } from "component/users/UserModal"
import { FC } from "react"
import { FiAtSign, FiDollarSign, FiPhone } from "react-icons/fi"
import { Shop } from "type/shop"
import { RoleWithPermissions, User } from "type/user"

interface UserCardProps {
  user: User
  roles: RoleWithPermissions[]
  shops: Shop[]
}

export const UserCard: FC<UserCardProps> = (props) => {
  const { user, roles, shops } = props

  const {
    isOpen: isUserDeleteOpenModal,
    onOpen: onUserDeleteOpenModal,
    onClose: onUserDeleteCloseModal,
  } = useDisclosure()

  const {
    isOpen: isUserEditOpenModal,
    onOpen: onUserEditOpenModal,
    onClose: onUserEditCloseModal,
  } = useDisclosure()

  const isSalaryExists = user.salary && user.salary > 0

  const isShopsExists = shops.length > 0

  const rolesList = roles.map(
    (roleWithPermissions) => roleWithPermissions.role.name
  )
  const isRolesExists = roles.length > 0

  // If user fully filled
  const isUserReal = !!user.username && !!user.fio

  if (!isUserReal) {
    return <></>
  }

  return (
    <>
      <Card maxW={400} boxShadow="lg" borderRadius={20}>
        <CardHeader>
          <Flex direction="column" gap={2}>
            <Heading size="md">{user.fio}</Heading>

            {/* Email */}
            <Flex alignItems="center" gap={1}>
              <FiAtSign color="gray" />

              <Text color="gray" fontSize="xs">
                {user.email}
              </Text>
            </Flex>

            {/* Phone */}
            <Flex alignItems="center" gap={1}>
              <FiPhone color="gray" />

              <Text color="gray" fontSize="xs">
                {user.phone}
              </Text>
            </Flex>
          </Flex>

          {/* Actions Menu Button */}
          <CardMenu
            onEdit={onUserEditOpenModal}
            onDelete={onUserDeleteOpenModal}
          />
        </CardHeader>

        <CardBody>
          <Flex h="full" w="full" direction="column" gap={5}>
            {/* Salary */}
            {isSalaryExists && (
              <Flex alignItems="center">
                <FiDollarSign />

                <Text>{user.salary}</Text>
              </Flex>
            )}

            {/* Shops badges */}
            {isShopsExists && (
              <Flex direction="column">
                <Text fontWeight="bold">Магазины:</Text>
                <Wrap spacing={2}>
                  {shops.map((shop, index) => (
                    <WrapItem key={index}>
                      <Badge fontWeight="normal">{shop.name}</Badge>
                    </WrapItem>
                  ))}
                </Wrap>
              </Flex>
            )}

            {/* Roles badges */}
            {isRolesExists && (
              <Flex direction="column">
                <Text fontWeight="bold">Роли:</Text>
                <Wrap spacing={2}>
                  {rolesList.map((role, index) => (
                    <WrapItem key={index}>
                      <Badge fontWeight="normal">{role}</Badge>
                    </WrapItem>
                  ))}
                </Wrap>
              </Flex>
            )}
          </Flex>
        </CardBody>
      </Card>

      {/* Delete user modal */}
      <UserDeleteModal
        user={user}
        isOpen={isUserDeleteOpenModal}
        onClose={onUserDeleteCloseModal}
      />

      {/* Edit user modal */}
      <UserModal
        prevUser={user}
        roles={roles}
        shops={shops}
        isOpen={isUserEditOpenModal}
        onClose={onUserEditCloseModal}
      />
    </>
  )
}
