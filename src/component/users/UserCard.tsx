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
import { useCommentInput } from "hook/useCommentInput"
import { FC } from "react"
import {
  FiAtSign,
  FiDollarSign,
  FiMessageSquare,
  FiPhone,
} from "react-icons/fi"
import { Shop } from "type/shop"
import { RoleWithPermissions, User } from "type/user"
import { WithId } from "type/withId"

interface UserCardProps {
  user: WithId<User>
  roles: RoleWithPermissions[]
  shops: WithId<Shop>[]
}

export const UserCard: FC<UserCardProps> = (props) => {
  const { user, roles, shops } = props

  const {
    isOpen: isUserDeleteModalOpen,
    onOpen: onUserDeleteModalOpen,
    onClose: onUserDeleteModalClose,
  } = useDisclosure()

  const {
    isOpen: isUserEditModalOpen,
    onOpen: onUserEditModalOpen,
    onClose: onUserEditModalClose,
  } = useDisclosure()

  const { comment } = useCommentInput({
    objectName: "user",
    objectId: user.id,
  })

  const isEmailExists = !!user.email?.trim()
  const isPhoneExists = !!user.phone?.trim()
  const isSalaryExists = !!user.salary && user.salary > 0
  const isShopsExists = shops.length > 0
  const isCommentExists = !!comment.trim()

  const rolesList = roles.map(
    (roleWithPermissions) => roleWithPermissions.role.name,
  )
  const isRolesExists = roles.length > 0

  // If user fully filled
  const isUserReal = !!user.username && !!user.fio

  if (!isUserReal) {
    return <></>
  }

  return (
    <>
      <Card h="full" w="full" minH={360} variant="card" borderRadius={20}>
        <CardHeader>
          <Flex direction="column" gap={2}>
            <Heading size="md">{user.fio}</Heading>

            {/* Email */}
            {isEmailExists && (
              <Flex alignItems="center" gap={1}>
                <FiAtSign color="gray" />

                <Text color="gray" fontSize="sm">
                  {user.email}
                </Text>
              </Flex>
            )}

            {/* Phone */}
            {isPhoneExists && (
              <Flex alignItems="center" gap={1}>
                <FiPhone color="gray" />

                <Text color="gray" fontSize="sm">
                  {user.phone}
                </Text>
              </Flex>
            )}

            {isCommentExists && (
              <Flex alignItems="center" gap={1}>
                <FiMessageSquare color="gray" />

                <Text color="gray" fontSize="sm">
                  {comment}
                </Text>
              </Flex>
            )}
          </Flex>

          {/* Actions Menu Button */}
          <CardMenu
            onEdit={onUserEditModalOpen}
            onDelete={onUserDeleteModalOpen}
          />
        </CardHeader>

        <CardBody>
          <Flex w="full" direction="column" gap={5}>
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
                <Text fontWeight="bold">Shops:</Text>
                <Wrap spacing={2}>
                  {shops.map((shop, index) => (
                    <WrapItem key={index}>
                      <Badge fontSize="sm" fontWeight="normal">
                        {shop.name}
                      </Badge>
                    </WrapItem>
                  ))}
                </Wrap>
              </Flex>
            )}

            {/* Roles badges */}
            {isRolesExists && (
              <Flex direction="column">
                <Text fontWeight="bold">Roles:</Text>
                <Wrap spacing={2}>
                  {rolesList.map((role, index) => (
                    <WrapItem key={index}>
                      <Badge fontSize="sm" fontWeight="normal">
                        {role}
                      </Badge>
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
        isOpen={isUserDeleteModalOpen}
        onClose={onUserDeleteModalClose}
      />

      {/* Edit user modal */}
      <UserModal
        prevUser={user}
        roles={roles}
        shops={shops}
        isOpen={isUserEditModalOpen}
        onClose={onUserEditModalClose}
      />
    </>
  )
}
