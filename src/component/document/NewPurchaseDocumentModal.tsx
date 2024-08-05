import {
  Button,
  Flex,
  Input,
  InputGroup,
  InputLeftElement,
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
import { FiEdit, FiUpload } from "react-icons/fi"
import { usePurchaseFileCreateMutation } from "service/purchaseFile"
import { ModalProps } from "type/modalProps"
import { PurchaseFileCreate } from "type/purchaseFile"
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
  const [name, setName] = useState<string>("")
  const [file, setFile] = useState<File>()

  const purchaseFileCreateMutation = usePurchaseFileCreateMutation()

  const isNameInvalid = !name.trim()
  const isFileInvalid = !file
  const isLoading = purchaseFileCreateMutation.isLoading
  const isSaveBtnDisabled = isNameInvalid || isFileInvalid

  const handleFileNameChange = (e: ChangeEvent<HTMLInputElement>) => {
    const name = e.target.value
    setName(name)
  }

  const handleUploadBtnClick = () => {
    fileInputRef.current?.click()
  }

  const handleFileUpload = (e: ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files ? e.target.files[0] : undefined
    setFile(file)
  }

  const onSaveDocument = async () => {
    if (isFileInvalid) {
      return
    }

    const body: PurchaseFileCreate = {
      front_name: name,
      dependency_id: purchaseId,
      dependency_on: isDelivery ? "delivery" : "purchase",
      file,
    }

    await purchaseFileCreateMutation.mutateAsync(body)

    notify(`Document ${name} was uploaded successfully`, "success")
    onClose()
  }

  useEffect(() => {
    setName("")
    setFile(undefined)
  }, [isOpen])

  return (
    <Modal size="lg" isOpen={isOpen} onClose={onClose} isCentered>
      <ModalBackgroundBlur />

      <ModalContent>
        <ModalHeader>Upload Document</ModalHeader>
        <ModalCloseButton />

        <ModalBody>
          <Flex direction="column" gap={5}>
            {/* File Name Input */}
            <InputGroup>
              <InputLeftElement color="gray">
                <FiEdit />
              </InputLeftElement>

              <Input
                placeholder="File name"
                value={name}
                type="text"
                onChange={handleFileNameChange}
                isInvalid={isNameInvalid}
              />
            </InputGroup>

            {/* File Upload */}
            <Flex alignItems="center" gap={2}>
              {/* Upload Btn */}
              <Button
                variant="outline"
                colorScheme="blue"
                onClick={handleUploadBtnClick}
                leftIcon={<FiUpload />}
              >
                Upload Document
              </Button>

              {/* Uploaded file name */}
              {file && (
                <Text fontSize="sm" color="gray">
                  {file.name}
                </Text>
              )}

              {/* File input */}
              <Input
                ref={fileInputRef}
                type="file"
                onChange={handleFileUpload}
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
