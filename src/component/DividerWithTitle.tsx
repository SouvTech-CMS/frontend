import { AbsoluteCenter, Divider, Flex, Text } from "@chakra-ui/react"
import { FC } from "react"

interface DividerWithTitleProps {
  title: string
}

export const DividerWithTitle: FC<DividerWithTitleProps> = (props) => {
  const { title } = props

  return (
    <Flex position="relative">
      <Divider />

      <AbsoluteCenter bgColor="white" px={3}>
        <Text fontWeight="medium">{title}</Text>
      </AbsoluteCenter>
    </Flex>
  )
}
