import {
  Button,
  Card,
  CardFooter,
  CardHeader,
  Flex,
  Heading,
  IconButton,
  Text,
  useDisclosure,
} from "@chakra-ui/react"
import { DocumentDeleteModal } from "component/engraver/document/DocumentDeleteModal"
import { useUserPermissions } from "hook/useUserPermissions"
import { FC } from "react"
import { FiCalendar, FiTrash2 } from "react-icons/fi"
import { Link } from "react-router-dom"
import { EngraverDocument } from "type/engraver/engraverDocument"
import { WithId } from "type/withId"
import { dateAsStringToDate, formatDate } from "util/formatting"
import { getFileUrl } from "util/urls"

interface DocumentCardProps {
  document: WithId<EngraverDocument>
}

export const DocumentCard: FC<DocumentCardProps> = (props) => {
  const { document } = props

  const { canDeleteDocuments } = useUserPermissions()

  const fileUrl = getFileUrl(document.file_path)
  const uploadedAt = dateAsStringToDate(document.uploaded_at)

  const {
    isOpen: isDocumentDeleteModalOpen,
    onOpen: onDocumentDeleteModalOpen,
    onClose: onDocumentDeleteModalClose,
  } = useDisclosure()

  return (
    <>
      <Card
        h="full"
        w="full"
        minH={150}
        size="sm"
        variant="newCard"
        borderRadius={10}
      >
        <CardHeader>
          <Flex w="full" direction="column" pr={5} gap={2}>
            <Flex w="full" direction="column" gap={2}>
              {/* Name */}
              <Heading size="sm">{document.file_name}</Heading>
            </Flex>

            {/* Uploading Date */}
            <Flex alignItems="center" gap={2}>
              <FiCalendar color="gray" />

              <Text fontSize="sm" color="gray">
                {formatDate(uploadedAt)}
              </Text>
            </Flex>

            {/* Delete btn */}
            <IconButton
              position="absolute"
              top={0}
              right={0}
              size="sm"
              aria-label="delete-manager"
              variant="ghost"
              colorScheme="red"
              icon={<FiTrash2 />}
              onClick={onDocumentDeleteModalOpen}
              isDisabled={!canDeleteDocuments}
            />
          </Flex>
        </CardHeader>

        <CardFooter mt="auto">
          <Flex w="full" direction="column" gap={2}>
            <Button
              variant="ghost"
              colorScheme="blue"
              as={Link}
              to={fileUrl}
              target="_blank"
            >
              Open
            </Button>
          </Flex>
        </CardFooter>
      </Card>

      <DocumentDeleteModal
        document={document}
        isOpen={isDocumentDeleteModalOpen}
        onClose={onDocumentDeleteModalClose}
      />
    </>
  )
}
