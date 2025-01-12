import { Button, Flex, Icon, Text } from "@chakra-ui/react"
import { IconType } from "react-icons"
import { FCC } from "type/fcc"

interface DefectOrErrorBtnProps {
  onClick: () => void
  icon: IconType
}

export const DefectOrErrorBtn: FCC<DefectOrErrorBtnProps> = (props) => {
  const { icon, onClick, children } = props

  return (
    <Button
      h="full"
      w="full"
      minH={200}
      variant="newCard"
      onClick={onClick}
      borderRadius={20}
    >
      <Flex
        direction="column"
        justifyContent="center"
        alignItems="center"
        gap={5}
      >
        <Icon as={icon} fontSize={48} />

        <Text fontSize="xl" fontWeight="bold">
          {children}
        </Text>
      </Flex>
    </Button>
  )
}
