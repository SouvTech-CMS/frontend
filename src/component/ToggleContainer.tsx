import { Flex, Text, TypographyProps } from "@chakra-ui/react"
import { CollapseBtn } from "component/CollapseBtn"
import { useState } from "react"
import { FCC } from "type/fcc"

interface ToggleContainerProps {
  title: string | JSX.Element
  fontSize?: TypographyProps["fontSize"]
  fontWeight?: TypographyProps["fontWeight"]
  defaultExpanded?: boolean
  isDisabled?: boolean
}

export const ToggleContainer: FCC<ToggleContainerProps> = (props) => {
  const {
    title,
    fontSize,
    fontWeight,
    defaultExpanded = false,
    isDisabled,
    children,
  } = props

  const [isExpanded, setIsExpanded] = useState<boolean>(defaultExpanded)

  const isStringTitle = typeof title === "string"

  return (
    <Flex w="full" direction="column" gap={2}>
      {/* Toggle Btn with Title */}
      <Flex w="full" direction="row" alignItems="center" gap={1}>
        <CollapseBtn
          size="sm"
          isExpanded={isExpanded}
          setIsExpanded={setIsExpanded}
          isDisabled={isDisabled}
        />

        {isStringTitle ? (
          <Text fontSize={fontSize} fontWeight={fontWeight}>
            {title}
          </Text>
        ) : (
          title
        )}
      </Flex>

      {/* Hideable Content */}
      {isExpanded && children}
    </Flex>
  )
}
