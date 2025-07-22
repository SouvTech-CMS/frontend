import { Button, Flex, Heading, Text, useDisclosure } from "@chakra-ui/react"
import { FindOrderDrawer } from "component/orderProcessing/FindOrderDrawer"
import { Page } from "component/page/Page"
import { PageHeading } from "component/page/PageHeading"
import { WORK_SHIFT_WELCOME_TEXTS } from "constant/workShiftTexts"
import { useUserContext } from "context/user"
import { FC, useMemo } from "react"
import { useWorkShiftCreateMutation } from "service/engraver/workShift"
import { WorkShift } from "type/engraver/workShift"
import { notify } from "util/toasts"

export const WorkShiftStart: FC = () => {
  const { currentEngraverId, isLoadingCurrentUser } = useUserContext()

  const randomInterestingText = useMemo(
    () =>
      WORK_SHIFT_WELCOME_TEXTS[
        Math.floor(Math.random() * WORK_SHIFT_WELCOME_TEXTS.length)
      ],
    [],
  )

  const workShiftCreateMutation = useWorkShiftCreateMutation()

  const isLoading = isLoadingCurrentUser || workShiftCreateMutation.isLoading

  const handleWorkShiftCreate = async () => {
    if (!currentEngraverId) {
      notify("Cannot start work shift, you're not engraver", "error")
      return
    }

    const now = new Date()
    const body: WorkShift = {
      engraver_id: currentEngraverId,
      started_at: now.toISOString(),
    }

    await workShiftCreateMutation.mutateAsync(body)
  }

  const {
    isOpen: isFindOrderDrawerOpen,
    onOpen: onFindOrderDrawerOpen,
    onClose: onFindOrderDrawerClose,
  } = useDisclosure()

  return (
    <>
      <Page>
        <PageHeading isSearchHidden />

        <Flex
          h="full"
          w="full"
          direction="column"
          justifyContent="center"
          alignItems="center"
          textAlign="center"
          gap={10}
        >
          <Heading>Start Work Shift to Process Orders</Heading>

          <Text w="40%" fontSize="lg">
            {randomInterestingText}
          </Text>

          <Flex direction="column" gap={3}>
            <Button
              variant="success"
              onClick={handleWorkShiftCreate}
              isLoading={isLoading}
            >
              Start Work Shift
            </Button>

            <Button
              variant="secondary"
              onClick={onFindOrderDrawerOpen}
              isLoading={isLoading}
            >
              Just View Orders
            </Button>
          </Flex>
        </Flex>
      </Page>

      <FindOrderDrawer
        isOpen={isFindOrderDrawerOpen}
        onClose={onFindOrderDrawerClose}
      />
    </>
  )
}
