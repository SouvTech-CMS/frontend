import { Flex, Text } from "@chakra-ui/react"
import { FC } from "react"

export const Logo: FC = () => {
  return (
    <Flex w="full" justifyContent="center">
      {/* <Image src={logoPath} alt="Logo" /> */}

      <Text>SouvTech CMS</Text>
    </Flex>
  )
}
