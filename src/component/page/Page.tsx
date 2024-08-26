import { Flex } from "@chakra-ui/react"
import { GuideOpenBtn } from "component/guide/GuideOpenBtn"
import { FCC } from "type/fcc"

interface PageProps {
  guideNotionPageId?: string
}

export const Page: FCC<PageProps> = (props) => {
  const { children, guideNotionPageId } = props

  const isGuideExists = guideNotionPageId?.trim() !== undefined

  return (
    <Flex
      h="full"
      w="full"
      direction="column"
      py={5}
      px={10}
      pb={10}
      overflowX="hidden"
      overflowY="auto"
    >
      {children}

      {isGuideExists && (
        <Flex position="absolute" right={20} bottom={10}>
          <GuideOpenBtn guideNotionPageId={guideNotionPageId} />
        </Flex>
      )}
    </Flex>
  )
}
