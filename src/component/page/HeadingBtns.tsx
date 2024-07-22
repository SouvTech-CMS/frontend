import { Flex } from "@chakra-ui/react"
import { NotificationsPopover } from "component/notification/NotificationsPopover"
import { ProfileMenu } from "component/page/ProfileMenu"
import { SearchBar } from "component/page/SearchBar"
import { FC } from "react"

interface HeadingBtnsProps {
  isSearchDisabled?: boolean
}

export const HeadingBtns: FC<HeadingBtnsProps> = (props) => {
  const { isSearchDisabled } = props

  return (
    <Flex alignItems="center" gap={5}>
      {/* Search */}
      <SearchBar isDisabled={isSearchDisabled} />

      {/* Notifications */}
      <NotificationsPopover />

      {/* Avatar with Menu */}
      <ProfileMenu />
    </Flex>
  )
}
