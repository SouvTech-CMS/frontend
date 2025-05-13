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
import { getAllShops } from "api/shop"
import { DividerWithTitle } from "component/DividerWithTitle"
import { ModalBackgroundBlur } from "component/ModalBackgroundBlur"
import { CommentInput } from "component/comment/Comment"
import { AddScheduledBreakBtn } from "component/engraver/AddScheduledBreakBtn"
import { ScheduledBreakInput } from "component/engraver/ScheduledBreakInput"
import { ShopsSelect } from "component/select/ShopsSelect"
import { useCommentInput } from "hook/useCommentInput"
import { FC, useEffect, useState } from "react"
import {
  FiAtSign,
  FiDollarSign,
  FiLock,
  FiLogIn,
  FiPhone,
  FiUser,
} from "react-icons/fi"
import { useQuery } from "react-query"
import {
  useEngraverCreateMutation,
  useEngraverUpdateMutation,
} from "service/engraver/engraver"
import {
  Engraver,
  EngraverCreate,
  EngraverUpdate,
} from "type/engraver/engraver"
import { ScheduledBreak } from "type/engraver/scheduledBreak"
import { ModalProps } from "type/modalProps"
import { Shop } from "type/shop"
import { User } from "type/user"
import { WithId } from "type/withId"
import { notify } from "util/toasts"
import { isPasswordValid, isUsernameValid } from "util/validation"

interface EngraverModalProps extends ModalProps {
  prevEngraver?: WithId<Engraver>
  prevEngraverUser?: WithId<User>
  shops?: WithId<Shop>[]
  prevScheduledBreaks?: ScheduledBreak[]
}

const newEngraverUser: User = {
  username: "",
}

export const EngraverModal: FC<EngraverModalProps> = (props) => {
  const {
    prevEngraver,
    prevEngraverUser,
    shops,
    prevScheduledBreaks,
    isOpen,
    onClose,
  } = props

  const isNewEngraver = !prevEngraverUser || !prevEngraver
  const engraverId = prevEngraver?.id
  const userId = prevEngraverUser?.id

  const [engraverUser, setEngraverUser] = useState<User>(
    prevEngraverUser || newEngraverUser,
  )
  const [newPassword, setNewPassword] = useState<string>("")
  const [selectedShopsIds, setSelectedShopsIds] = useState<number[]>([])
  const [scheduledBreaksList, setScheduledBreaksList] = useState<
    ScheduledBreak[]
  >([])

  const { data: shopsList } = useQuery<WithId<Shop>[]>("shopsList", getAllShops)

  const { comment, handleCommentChange, onCommentSubmit, isCommentLoading } =
    useCommentInput({
      objectName: "engraver",
      objectId: engraverId,
    })

  const engraverCreateMutation = useEngraverCreateMutation()
  const engraverUpdateMutation = useEngraverUpdateMutation()

  const isLoading =
    engraverCreateMutation.isLoading || engraverUpdateMutation.isLoading

  const userName = engraverUser.fio || engraverUser.username

  const isUsernameInvalid = !engraverUser.username
  const isPasswordInvalid =
    (isNewEngraver && !newPassword.trim()) || isUsernameInvalid
  const isFioInvalid = !engraverUser.fio
  const isSelectedShopsIdsInvalid = selectedShopsIds?.length === 0
  const isAddScheduledBreakBtnDisabled = !!scheduledBreaksList.find(
    (scheduledBreak) =>
      !scheduledBreak.started_at || !scheduledBreak.finished_at,
  )

  const isSaveBtnDisabled =
    isUsernameInvalid ||
    isPasswordInvalid ||
    isFioInvalid ||
    isSelectedShopsIdsInvalid

  const handleUserUpdate = (param: string, value: number | string) => {
    setEngraverUser((prevEngraverUser) => ({
      ...prevEngraverUser,
      [param]: value,
    }))
  }

  const onUserUpdate = async () => {
    //* Remove user password param, to not change it if not needed
    delete engraverUser["password"]

    const isInvalidUsername = !isUsernameValid(engraverUser.username)
    if (isInvalidUsername) {
      notify("Username must contain at least 5 characters", "error")
      return
    }

    if (isNewEngraver || !!newPassword.trim()) {
      const isInvalidPassword = !isPasswordValid(newPassword)
      if (isInvalidPassword) {
        notify(
          "Password must contain upper and lower case letters and numbers and be at least 8 characters long",
          "error",
        )
        return
      }
    }

    if (isNewEngraver) {
      const body: EngraverCreate = {
        user: {
          ...engraverUser,
          password: newPassword,
        },
        engraver: {},
        scheduled_breaks: scheduledBreaksList,
        shops_ids_list: selectedShopsIds,
      }

      const { id: newUserId } = await engraverCreateMutation.mutateAsync(body)

      await onCommentSubmit(newUserId)

      notify(`Engraver ${userName} was created successfully`, "success")
    } else {
      const {
        user,
        scheduled_breaks,
        work_shifts,
        documents,
        processing_orders,
        ...updatedEngraver
      } = prevEngraver

      const body: EngraverUpdate = {
        user: {
          ...engraverUser,
          id: userId!,
        },
        engraver: {
          ...updatedEngraver,
          id: engraverId!,
          user_id: userId!,
        },
        scheduled_breaks: scheduledBreaksList,
        shops_ids_list: selectedShopsIds,
      }

      if (!!newPassword.trim() && body.user) {
        body.user.password = newPassword
      }

      await engraverUpdateMutation.mutateAsync(body)

      await onCommentSubmit()

      notify(`Engraver ${userName} was updated successfully`, "success")
    }

    onClose()
  }

  useEffect(() => {
    // Update User
    if (prevEngraverUser) {
      setEngraverUser(prevEngraverUser)
    } else {
      setEngraverUser(newEngraverUser)
    }
    setNewPassword("")

    // Update Shops
    if (shopsList) {
      const shopsIds = shops?.map((shop) => shop.id)
      setSelectedShopsIds(shopsIds || [])
    }

    // Update Scheduled Breaks
    if (prevScheduledBreaks) {
      const prevScheduledBreaksList = prevScheduledBreaks.map(
        (prevBreak, index) => ({ ...prevBreak, index: index + 1 }),
      )
      setScheduledBreaksList(prevScheduledBreaksList || [])
    }
  }, [isOpen, prevEngraverUser, shopsList, prevScheduledBreaks, shops])

  return (
    <Modal size="4xl" isOpen={isOpen} onClose={onClose} isCentered>
      <ModalBackgroundBlur />

      <ModalContent>
        <ModalHeader>
          {isNewEngraver ? "New Engraver" : `Engraver #${engraverId}`}
        </ModalHeader>
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
                  value={engraverUser.username}
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
                  value={engraverUser.fio}
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
                  value={engraverUser.email}
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
                  value={engraverUser.phone}
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
                  value={engraverUser.salary}
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

            <Flex w="full" direction="column" gap={10}>
              {/* Shops */}
              <Flex direction="column" alignItems="center" gap={3}>
                <Flex w="full" mb={1}>
                  <DividerWithTitle title="Shops" />
                </Flex>

                <ShopsSelect
                  selectedShopsIds={selectedShopsIds}
                  onSelect={setSelectedShopsIds}
                  isDisabled={isLoading}
                  isRequired
                  isFullWidth
                />
              </Flex>

              {/* Scheduled Breaks */}
              <Flex w="full" direction="column" gap={5}>
                <Flex w="full" mb={1}>
                  <DividerWithTitle title="Scheduled Breaks" />
                </Flex>

                <Flex w="full" direction="column" gap={2}>
                  {scheduledBreaksList.map((scheduledBreak, index) => (
                    <ScheduledBreakInput
                      key={index}
                      prevScheduledBreak={scheduledBreak}
                      setScheduledBreaksList={setScheduledBreaksList}
                      isDisabled={isLoading}
                    />
                  ))}

                  <AddScheduledBreakBtn
                    setScheduledBreaksList={setScheduledBreaksList}
                    isLoading={isLoading}
                    isDisabled={isAddScheduledBreakBtnDisabled}
                  />
                </Flex>
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
