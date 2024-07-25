import { Flex, Heading, Image, ThemeTypings } from "@chakra-ui/react"
import { FC } from "react"

import logoPath from "asset/logo/souvtech-cms-logo.svg"

interface LogoProps {
  imageSize?: "sm" | "md" | "lg"
  textSize?: ThemeTypings["sizes"]
  gap?: number
}

export const Logo: FC<LogoProps> = (props) => {
  const { imageSize = "md", textSize = "md", gap = 5 } = props

  return (
    <Flex w="full" direction="column" alignItems="center" gap={gap}>
      <Flex w="full" justifyContent="center">
        <Image w={`logo.${imageSize}`} src={logoPath} alt="Logo" />
      </Flex>

      <Heading size={textSize}>SouvTech CMS</Heading>
    </Flex>
  )
}
