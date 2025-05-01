import { Button, Flex, Text, useDisclosure } from "@chakra-ui/react"
import { NewDocumentModal } from "component/engraver/document/NewDocumentModal"
import { FC } from "react"
import { FiUpload } from "react-icons/fi"

interface NewDocumentCardProps {
  engraverId: number
}

export const NewDocumentCard: FC<NewDocumentCardProps> = (props) => {
  const { engraverId } = props

  const {
    isOpen: isDocumentCreateModalOpen,
    onOpen: onDocumentCreateModalOpen,
    onClose: onDocumentCreateModalClose,
  } = useDisclosure()

  return (
    <>
      <Button
        h="full"
        w="full"
        minH={150}
        variant="newCard"
        onClick={onDocumentCreateModalOpen}
        borderRadius={10}
      >
        <Flex
          direction="column"
          justifyContent="center"
          alignItems="center"
          gap={5}
        >
          <FiUpload size={36} />

          <Text fontSize={20} fontWeight="bold">
            Upload
          </Text>
        </Flex>
      </Button>

      <NewDocumentModal
        engraverId={engraverId}
        isOpen={isDocumentCreateModalOpen}
        onClose={onDocumentCreateModalClose}
      />
    </>
  )
}
