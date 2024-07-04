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
import { PurchaseDocumentDeleteModal } from "component/document/PurchaseDocumentDeleteModal"
import { useUserContext } from "context/user"
import { FC } from "react"
import { FiCalendar, FiTrash2 } from "react-icons/fi"
import { Link } from "react-router-dom"
import { PurchaseFile } from "type/purchaseFile"
import { WithId } from "type/withId"

interface PurchaseDocumentCardProps {
  document: WithId<PurchaseFile>
}

export const PurchaseDocumentCard: FC<PurchaseDocumentCardProps> = (props) => {
  const { document } = props

  const { isUserAdmin } = useUserContext()

  const documentDate = new Date(document.timestamp! * 1000).toDateString()

  const {
    isOpen: isPurchaseFileDeleteModalOpen,
    onOpen: onPurchaseFileDeleteModalOpen,
    onClose: onPurchaseFileDeleteModalClose,
  } = useDisclosure()

  return (
    <>
      <Card boxShadow="lg" borderRadius={10}>
        <CardHeader>
          <Flex w="full" direction="column" gap={2}>
            {/* Name */}
            <Heading size="md">{document.front_name}</Heading>

            {/* Uploading Date */}
            <Flex alignItems="center" gap={2}>
              <FiCalendar color="gray" />

              <Text fontSize="xs" color="gray">
                {documentDate}
              </Text>
            </Flex>

            {/* Delete btn */}
            {isUserAdmin && (
              <IconButton
                position="absolute"
                top={0}
                right={0}
                size="sm"
                aria-label="delete-manager"
                variant="ghost"
                colorScheme="red"
                icon={<FiTrash2 />}
                onClick={onPurchaseFileDeleteModalOpen}
              />
            )}
          </Flex>
        </CardHeader>

        <CardFooter mt="auto">
          <Flex w="full" direction="column" gap={2}>
            {/* TODO: change "to" param to link to file */}
            <Button variant="ghost" colorScheme="blue" as={Link} to="/" replace>
              Open
            </Button>
          </Flex>
        </CardFooter>
      </Card>

      <PurchaseDocumentDeleteModal
        document={document}
        isOpen={isPurchaseFileDeleteModalOpen}
        onClose={onPurchaseFileDeleteModalClose}
      />
    </>
  )
}
