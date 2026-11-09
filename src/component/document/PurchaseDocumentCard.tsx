import {
  Badge,
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
import { getPurchaseFile } from "api/purchase/purchaseFile"
import { PurchaseDocumentDeleteModal } from "component/document/PurchaseDocumentDeleteModal"
import { useUserPermissions } from "hook/useUserPermissions"
import { FC, useState } from "react"
import { FiCalendar, FiTrash2 } from "react-icons/fi"
import { PurchaseFile } from "type/purchase/purchaseFile"
import { WithId } from "type/withId"
import { openFile } from "util/files"
import { timestampToDateAsString } from "util/formatting"
import { notify } from "util/toasts"

interface PurchaseDocumentCardProps {
  document: WithId<PurchaseFile>
}

export const PurchaseDocumentCard: FC<PurchaseDocumentCardProps> = (props) => {
  const { document } = props

  const { canDeletePurchasesDocuments } = useUserPermissions()

  const isDeliveryPurchaseDocumnet = document.purchase_id !== undefined
  const documentDate = timestampToDateAsString(document.timestamp!)

  const {
    isOpen: isPurchaseFileDeleteModalOpen,
    onOpen: onPurchaseFileDeleteModalOpen,
    onClose: onPurchaseFileDeleteModalClose,
  } = useDisclosure()

  const [isFileLoading, setIsFileLoading] = useState<boolean>(false)

  const handleFileOpen = async () => {
    setIsFileLoading(true)
    try {
      const file = await getPurchaseFile(document.id)
      openFile(file, document.name!)
    } catch {
      notify("Failed to open the file", "error")
    } finally {
      setIsFileLoading(false)
    }
  }

  return (
    <>
      <Card h="full" w="full" minH={150} variant="newCard" borderRadius={10}>
        <CardHeader>
          <Flex w="full" direction="column" gap={2}>
            <Flex w="full" direction="column" gap={2}>
              {/* Purchase ID */}
              {isDeliveryPurchaseDocumnet && (
                <Flex>
                  <Badge colorScheme="blue">
                    Order #{document.purchase_id}
                  </Badge>
                </Flex>
              )}

              {/* Name */}
              <Heading size="sm">{document.front_name}</Heading>
            </Flex>

            {/* Uploading Date */}
            <Flex alignItems="center" gap={2}>
              <FiCalendar color="gray" />

              <Text fontSize="sm" color="gray">
                {documentDate}
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
              onClick={onPurchaseFileDeleteModalOpen}
              isDisabled={!canDeletePurchasesDocuments}
            />
          </Flex>
        </CardHeader>

        <CardFooter mt="auto">
          <Flex w="full" direction="column" gap={2}>
            <Button
              variant="ghost"
              colorScheme="blue"
              onClick={handleFileOpen}
              isLoading={isFileLoading}
            >
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
