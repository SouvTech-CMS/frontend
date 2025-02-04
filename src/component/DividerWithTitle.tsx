import {
  AbsoluteCenter,
  Divider,
  Flex,
  Text,
  TypographyProps,
} from "@chakra-ui/react"
import { FC, ReactNode } from "react"

interface DividerWithTitleProps {
  title: string | ReactNode
  fontSize?: TypographyProps["fontSize"]
}

export const DividerWithTitle: FC<DividerWithTitleProps> = (props) => {
  const { title, fontSize } = props

  return (
    <Flex position="relative" w="full">
      <Divider />

      <AbsoluteCenter w="full">
        <Flex w="full" direction="row" justifyContent="center">
          <Text
            w="fit-content"
            bgColor="white"
            fontWeight="medium"
            fontSize={fontSize}
            textAlign="center"
            px={3}
          >
            {title}
          </Text>
        </Flex>
      </AbsoluteCenter>
    </Flex>
  )
}
