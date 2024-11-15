import {
  Button,
  Flex,
  Input,
  List,
  ListIcon,
  ListItem,
  Modal,
  ModalBody,
  ModalCloseButton,
  ModalContent,
  ModalFooter,
  ModalHeader,
  Text,
} from "@chakra-ui/react"
import { ModalBackgroundBlur } from "component/ModalBackgroundBlur"
import { ChangeEvent, FC, useEffect, useRef, useState } from "react"
import { FiFilePlus, FiUpload } from "react-icons/fi"
import { usePurchaseFileCreateMutation } from "service/purchase/purchaseFile"
import { ModalProps } from "type/modalProps"
import { PurchaseFileCreate } from "type/purchase/purchaseFile"
import { notify } from "util/toasts"

interface NewPurchaseDocumentModalProps extends ModalProps {
  purchaseId: number
  isDelivery?: boolean
}

export const NewPurchaseDocumentModal: FC<NewPurchaseDocumentModalProps> = (
  props,
) => {
  const { purchaseId, isDelivery = false, isOpen, onClose } = props

  const fileInputRef = useRef<HTMLInputElement>(null)
  const [filesList, setFilesList] = useState<File[]>([])

  const purchaseFileCreateMutation = usePurchaseFileCreateMutation()

  const isFilesListInvalid = filesList.length === 0
  const isLoading = purchaseFileCreateMutation.isLoading
  const isSaveBtnDisabled = isFilesListInvalid

  const handleUploadBtnClick = () => {
    fileInputRef.current?.click()
  }

  const handleFilesUpload = (e: ChangeEvent<HTMLInputElement>) => {
    const files = e.target.files

    if (files !== null) {
      const uploadedFilesList = Array.from(files)
      setFilesList((prevFiles) => {
        const existingFilesNames = new Set(prevFiles.map((file) => file.name))
        const filteredFiles = uploadedFilesList.filter(
          (file) => !existingFilesNames.has(file.name),
        )

        return [...new Set([...prevFiles, ...filteredFiles])]
      })
    }
  }

  const onSaveDocument = async () => {
    if (isFilesListInvalid) {
      return
    }

    filesList.forEach(async (file) => {
      const body: PurchaseFileCreate = {
        front_name: file.name,
        dependency_id: purchaseId,
        dependency_on: isDelivery ? "delivery" : "purchase",
        file,
      }

      await purchaseFileCreateMutation.mutateAsync(body)
    })

    notify(
      `Documents for ${
        isDelivery ? "delivery" : "order"
      } #${purchaseId} was uploaded successfully`,
      "success",
    )
    onClose()
  }

  useEffect(() => {
    setFilesList([])
  }, [isOpen])

  return (
    <Modal size="lg" isOpen={isOpen} onClose={onClose} isCentered>
      <ModalBackgroundBlur />

      <ModalContent>
        <ModalHeader>Upload Documents</ModalHeader>
        <ModalCloseButton />

        <ModalBody>
          <Flex direction="column" gap={5}>
            {/* Upload File Btn */}
            <Button onClick={handleUploadBtnClick} leftIcon={<FiUpload />}>
              Upload Documents
            </Button>

            <Flex w="full" direction="column">
              {/* Uploaded file name */}
              <List spacing={2}>
                {filesList?.map((file, index) => (
                  <ListItem key={index} w="full">
                    <Flex w="full" alignItems="center">
                      <ListIcon as={FiFilePlus} color="gray" />

                      <Text fontSize="sm" color="gray">
                        {file.name}
                      </Text>
                    </Flex>
                  </ListItem>
                ))}
              </List>

              {/* File input */}
              <Input
                ref={fileInputRef}
                type="file"
                multiple
                onChange={handleFilesUpload}
                hidden
              />
            </Flex>
          </Flex>
        </ModalBody>

        <ModalFooter>
          <Flex gap={5}>
            <Button
              onClick={onSaveDocument}
              isLoading={isLoading}
              isDisabled={isSaveBtnDisabled}
            >
              Save
            </Button>

            <Button variant="secondary" onClick={onClose}>
              Close
            </Button>
          </Flex>
        </ModalFooter>
      </ModalContent>
    </Modal>
  )
}
