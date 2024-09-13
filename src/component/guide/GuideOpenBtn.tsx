import { IconButton, Tooltip } from "@chakra-ui/react"
import { FC } from "react"
import { IoHelp } from "react-icons/io5"
import { Link } from "react-router-dom"

interface GuideOpenBtnProps {
  guideNotionPageId: string
}

const GUIDE_BTN_SIZE = 16
const GUIDE_ICON_SIZE = 32

export const GuideOpenBtn: FC<GuideOpenBtnProps> = (props) => {
  const { guideNotionPageId } = props

  return (
    <Tooltip label="Read Guide">
      <IconButton
        as={Link}
        aria-label="open-guide-btn"
        h={GUIDE_BTN_SIZE}
        w={GUIDE_BTN_SIZE}
        variant="newCard"
        borderWidth={1}
        borderColor="gray.500"
        borderRadius="50%"
        fontSize={GUIDE_ICON_SIZE}
        icon={<IoHelp />}
        to={`/guide/${guideNotionPageId}`}
      />
    </Tooltip>
  )
}
