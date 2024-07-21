import { Avatar, Spinner } from "@chakra-ui/react"
import { FC } from "react"

interface MarketplaceAvatarProps {
  marketplace?: string
  isLoading?: boolean
}

export const MarketplaceAvatar: FC<MarketplaceAvatarProps> = (props) => {
  const { marketplace, isLoading } = props

  if (isLoading) {
    return <Spinner color="red" />
  }

  return (
    <Avatar
      size="xs"
      name={marketplace}
      bgColor="orange"
      // src="https://1000logos.net/wp-content/uploads/2017/12/Color-Etsy-Logo.jpg"
    />
  )
}
