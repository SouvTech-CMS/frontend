import { Flex } from "@chakra-ui/react"
import { CommingSoonTooltip } from "component/CommingSoonTooltip"
import { NotificationsPopover } from "component/notification/NotificationsPopover"
import { ProfileMenu } from "component/page/ProfileMenu"
import { SearchBar } from "component/page/SearchBar"
import { FC } from "react"

interface HeadingBtnsProps {
  isSearchHidden?: boolean
  isSearchDisabled?: boolean
}

export const HeadingBtns: FC<HeadingBtnsProps> = (props) => {
  const { isSearchHidden, isSearchDisabled } = props

  return (
    <Flex alignItems="center" gap={5}>
      {/* Search */}
      {!isSearchHidden && <SearchBar isDisabled={isSearchDisabled} />}

      {/* Notifications */}
      <CommingSoonTooltip>
        <NotificationsPopover />
      </CommingSoonTooltip>

      {/* Avatar with Menu */}
      <ProfileMenu />
    </Flex>
  )
}
