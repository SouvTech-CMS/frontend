import { Button, Flex, Text, useDisclosure } from "@chakra-ui/react"
import { EngraverModal } from "component/engraver/EngraverModal"
import { FC } from "react"
import { FiPlusCircle } from "react-icons/fi"

export const NewEngraverCard: FC = () => {
  const {
    isOpen: isEngraverEditModalOpen,
    onOpen: onEngraverEditModalOpen,
    onClose: onEngraverEditModalClose,
  } = useDisclosure()

  return (
    <>
      <Button
        h="full"
        w="full"
        minH={250}
        variant="newCard"
        onClick={onEngraverEditModalOpen}
        borderRadius={20}
      >
        <Flex
          direction="column"
          justifyContent="center"
          alignItems="center"
          gap={5}
        >
          <FiPlusCircle size={48} />

          <Text fontSize={24} fontWeight="bold">
            New
          </Text>
        </Flex>
      </Button>

      {/* Engraver Edit Modal */}
      <EngraverModal
        isOpen={isEngraverEditModalOpen}
        onClose={onEngraverEditModalClose}
      />
    </>
  )
}
