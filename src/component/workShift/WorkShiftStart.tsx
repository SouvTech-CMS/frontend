import { Button, Flex, Heading, Text } from "@chakra-ui/react"
import { Page } from "component/page/Page"
import { PageHeading } from "component/page/PageHeading"
import { WORK_SHIFT_WELCOME_TEXTS } from "constant/workShiftTexts"
import { useUserContext } from "context/user"
import { FC } from "react"
import { useWorkShiftCreateMutation } from "service/engraver/workShift"
import { WorkShift } from "type/engraver/workShift"
import { notify } from "util/toasts"

// const MotionBox = motion(Box)

export const WorkShiftStart: FC = () => {
  // const [animate, setAnimate] = useState<boolean>()

  const { engraverId, isLoadingCurrentUser } = useUserContext()

  const randomInterestingText =
    WORK_SHIFT_WELCOME_TEXTS[
      Math.floor(Math.random() * WORK_SHIFT_WELCOME_TEXTS.length)
    ]

  const workShiftCreateMutation = useWorkShiftCreateMutation()

  const isLoading = isLoadingCurrentUser || workShiftCreateMutation.isLoading

  const handleWorkShiftCreate = async () => {
    if (!engraverId) {
      notify("Cannot start work shift", "error")
      return
    }

    const now = new Date()
    const body: WorkShift = {
      engraver_id: engraverId!,
      started_at: now.toISOString(),
    }

    await workShiftCreateMutation.mutateAsync(body)
  }

  // useEffect(() => {
  //   if (!animate && animate !== undefined) {
  //     setAnimate(true)
  //   }
  // }, [animate])

  return (
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

        {/* <MotionBox
          // key={animate ? "animate1" : "animate2"}
          initial={{ scale: 1 }}
          animate={
            animate ? { scale: [1, 1.5, 1], rotate: [0, 10, -10, 0] } : {}
          }
          transition={{ duration: 0.5 }}
        > */}
        <Button
          variant="success"
          onClick={handleWorkShiftCreate}
          isLoading={isLoading}
        >
          Start Work Shift
        </Button>
        {/* </MotionBox> */}
      </Flex>
    </Page>
  )
}
