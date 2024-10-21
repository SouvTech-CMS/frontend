import { Flex, Heading, Image, ThemeTypings } from "@chakra-ui/react"
import { FC } from "react"

import logoPath from "asset/logo/souvtech-cms-logo.svg"

interface LogoProps {
  imageSize?: "xs" | "sm" | "md" | "lg"
  textSize?: ThemeTypings["sizes"]
  gap?: number
  isCollapsed?: boolean
}

export const Logo: FC<LogoProps> = (props) => {
  const { imageSize = "md", textSize = "md", gap = 5, isCollapsed } = props

  const logoSize = isCollapsed ? "lg" : imageSize

  return (
    <Flex
      w={isCollapsed ? "3rem" : "full"}
      direction="column"
      justifyContent="center"
      alignItems="center"
      gap={gap}
    >
      <Flex w="full" justifyContent="center" alignItems="center">
        <Image w={`logo.${logoSize}`} src={logoPath} alt="Logo" />
      </Flex>

      {!isCollapsed && <Heading size={textSize}>SouvTech CMS</Heading>}
    </Flex>
  )
}
