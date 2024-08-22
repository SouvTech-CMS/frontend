import { Button } from "@chakra-ui/react"
import { FC } from "react"
import { FiExternalLink } from "react-icons/fi"
import { Link } from "react-router-dom"

export const PurchaseHistoryOpenBtn: FC = () => {
  return (
    <Link to="/purchases/history" target="_blank">
      <Button leftIcon={<FiExternalLink />}>Open purchases history</Button>
    </Link>
  )
}
