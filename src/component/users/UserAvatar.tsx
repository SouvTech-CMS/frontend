import { Avatar, ColorProps, ThemingProps } from "@chakra-ui/react"
import { FC } from "react"
import { User } from "type/user"

interface UserAvatarProps {
  size?: ThemingProps["size"]
  bgColor?: ColorProps["color"]
  user?: User
}

export const UserAvatar: FC<UserAvatarProps> = (props) => {
  const { size = "md", bgColor = "white", user } = props

  const name = user?.fio || user?.username

  return <Avatar size={size} bgColor={bgColor} name={name} />
}
