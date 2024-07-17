import { Flex, Heading } from "@chakra-ui/react"
import { Role } from "constant/roles"
import { withAuthAndRoles } from "hook/withAuthAndRoles"

const Reports = () => {
  return (
    <Flex>
      <Heading>Reports</Heading>
    </Flex>
  )
}

export default withAuthAndRoles([Role.MANAGER])(Reports)
