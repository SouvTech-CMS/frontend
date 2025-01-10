import {
  Button,
  Card,
  CardBody,
  CardFooter,
  CardHeader,
  Divider,
  Flex,
  Heading,
  Text,
  useDisclosure,
  Wrap,
  WrapItem,
} from "@chakra-ui/react"
import { ShopBadge } from "component/badge/ShopBadge"
import { CustomTooltip } from "component/CustomTooltip"
import { DividerWithTitle } from "component/DividerWithTitle"
import { EngraverBlockModal } from "component/engraver/EngraverBlockModal"
import { EngraverCardMenu } from "component/engraver/EngraverCardMenu"
import { EngraverModal } from "component/engraver/EngraverModal"
import { useCommentInput } from "hook/useCommentInput"
import { FC } from "react"
import {
  FiAtSign,
  FiClock,
  FiDollarSign,
  FiLock,
  FiMessageSquare,
  FiPhone,
} from "react-icons/fi"
import { Engraver } from "type/engraver/engraver"
import { WithId } from "type/withId"
import { dateAsStringToDate, formatDate, formatTime } from "util/formatting"

interface EngraverCardProps {
  engraver: WithId<Engraver>
}

export const EngraverCard: FC<EngraverCardProps> = (props) => {
  const { engraver } = props

  const isBlocked = engraver.is_blocked
  const blockedAt = dateAsStringToDate(engraver.blocked_at)

  const scheduledBreaks = engraver.scheduled_breaks
  const documents = engraver.documents

  const { shops, ...user } = engraver.user

  const isEmailExists = !!user.email?.trim()
  const isPhoneExists = !!user.phone?.trim()
  const isSalaryExists = !!user.salary && user.salary > 0
  const isShopsExist = shops?.length > 0

  const { comment } = useCommentInput({
    objectName: "engraver",
    objectId: engraver.id,
  })
  const isCommentExists = !!comment.trim()

  // Edit
  const {
    isOpen: isEngraverEditModalOpen,
    onOpen: onEngraverEditModalOpen,
    onClose: onEngraverEditModalClose,
  } = useDisclosure()

  // Block
  const {
    isOpen: isEngraverBlockModalOpen,
    onOpen: onEngraverBlockModalOpen,
    onClose: onEngraverBlockModalClose,
  } = useDisclosure()

  // If engraver fully filled
  const isEngraverUserReal = !!user.username && !!user.fio

  if (!isEngraverUserReal) {
    return <></>
  }

  return (
    <>
      <Card h="full" w="full" minH={150} variant="card" borderRadius={20}>
        <CardHeader>
          <Flex direction="column" gap={2}>
            <Heading size="md">
              <Flex direction="row" alignItems="center" gap={2}>
                {/* Lock icon with Tooltip */}
                {isBlocked && (
                  <CustomTooltip
                    label={`This Engraver was blocked${
                      !!blockedAt ? ` at ${formatDate(blockedAt)}` : ""
                    }`}
                    placement="top-start"
                  >
                    <FiLock color="red" />
                  </CustomTooltip>
                )}

                {/* Engraver Name */}
                {user.fio}
              </Flex>
            </Heading>

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

            {/* Comment */}
            {isCommentExists && (
              <Flex alignItems="center" gap={1}>
                <FiMessageSquare color="gray" />

                <Text color="gray" fontSize="sm">
                  {comment}
                </Text>
              </Flex>
            )}
          </Flex>

          {/* Menu Btn */}
          <EngraverCardMenu
            onEdit={onEngraverEditModalOpen}
            onBlock={onEngraverBlockModalOpen}
          />
        </CardHeader>

        <CardBody pt={0}>
          <Flex w="full" direction="column" gap={5}>
            {/* Salary */}
            {isSalaryExists && (
              <Flex alignItems="center">
                <FiDollarSign />

                <Text>{user.salary}</Text>
              </Flex>
            )}

            {/* Shops badges */}
            {isShopsExist && (
              <Flex direction="column">
                <Text fontWeight="bold">Shops:</Text>
                <Wrap spacing={2}>
                  {shops.map((shop, index) => (
                    <WrapItem key={index}>
                      <ShopBadge shop={shop} />
                    </WrapItem>
                  ))}
                </Wrap>
              </Flex>
            )}
          </Flex>
        </CardBody>

        <CardFooter pt={2}>
          {/* Scheduled Breaks */}
          <Flex w="full" direction="column" gap={1}>
            <Flex mb={2}>
              <DividerWithTitle
                title={
                  <Flex
                    w="full"
                    direction="row"
                    alignItems="center"
                    fontWeight="medium"
                    fontSize="sm"
                    gap={1}
                  >
                    <FiClock />

                    <Text>Scheduled Breaks</Text>
                  </Flex>
                }
                fontSize="sm"
              />
            </Flex>

            {/* First 2 breaks */}
            <Flex direction="column" alignSelf="center">
              <Flex w="fit-content" direction="column" alignItems="flex-start">
                {scheduledBreaks
                  .slice(0, 2)
                  .map(({ started_at, finished_at }, index) => (
                    <Flex key={index} direction="row" alignItems="center">
                      <Text fontSize="sm">
                        {formatTime(started_at)} - {formatTime(finished_at)}
                      </Text>
                    </Flex>
                  ))}

                <Flex w="full" direction="row" justifyContent="center">
                  {/* Btn to open more breaks */}
                  <Button
                    w="full"
                    variant="ghost"
                    size="xs"
                    onClick={onEngraverEditModalOpen}
                  >
                    {scheduledBreaks.length > 2 ? "Show more" : "Add breaks"}
                  </Button>
                </Flex>
              </Flex>
            </Flex>

            <Divider />
          </Flex>
        </CardFooter>
      </Card>

      {/* Modals */}
      <>
        {/* Edit modal */}
        <EngraverModal
          prevEngraver={engraver}
          prevEngraverUser={user}
          shops={shops}
          prevScheduledBreaks={scheduledBreaks}
          isOpen={isEngraverEditModalOpen}
          onClose={onEngraverEditModalClose}
        />

        {/* Block Modal */}
        <EngraverBlockModal
          engraver={engraver}
          isOpen={isEngraverBlockModalOpen}
          onClose={onEngraverBlockModalClose}
        />
      </>
    </>
  )
}
