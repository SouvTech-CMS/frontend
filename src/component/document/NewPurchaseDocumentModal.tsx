import {
  Button,
  Flex,
  FormControl,
  Input,
  Modal,
  ModalBody,
  ModalCloseButton,
  ModalContent,
  ModalFooter,
  ModalHeader,
  ModalOverlay,
  Text,
} from "@chakra-ui/react"
import { ChangeEvent, FC, useEffect, useRef, useState } from "react"
import { FiEdit, FiUpload } from "react-icons/fi"
import { usePurchaseFileCreateMutation } from "service/purchaseFile"
import { ModalProps } from "type/modalProps"
import { PurchaseFileCreate } from "type/purchaseFile"
import { notify } from "util/toasts"

interface NewPurchaseDocumentModalProps extends ModalProps {
  purchaseId: number
}

export const NewPurchaseDocumentModal: FC<NewPurchaseDocumentModalProps> = (
  props
) => {
  const { purchaseId, isOpen, onClose } = props

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
      dependency_on: "purchase",
      file,
    }

    await purchaseFileCreateMutation.mutateAsync(body)

    notify(
      `Document ${name} for purchase #${purchaseId} was uploaded successfully`,
      "success"
    )
    onClose()
  }

  useEffect(() => {
    setName("")
    setFile(undefined)
  }, [isOpen])

  return (
    <Modal size="lg" isOpen={isOpen} onClose={onClose} isCentered>
      <ModalOverlay backdropFilter="blur(10px)" />

      <ModalContent>
        <ModalHeader>Upload Document</ModalHeader>
        <ModalCloseButton />

        <ModalBody>
          <Flex direction="column" gap={5}>
            {/* Name Input */}
            <Flex alignItems="center" gap={2}>
              <FiEdit color="gray" />

              <FormControl isInvalid={isNameInvalid}>
                <Input
                  placeholder="File name"
                  value={name}
                  type="text"
                  onChange={handleFileNameChange}
                />
              </FormControl>
            </Flex>

            {/* File Upload */}
            <Flex alignItems="center" gap={2}>
              <FiUpload color="gray" />

              {/* Upload Btn */}
              <Flex alignItems="center" gap={2}>
                <Button
                  variant="outline"
                  colorScheme="blue"
                  onClick={handleUploadBtnClick}
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
          </Flex>
        </ModalBody>

        <ModalFooter>
          <Flex gap={5}>
            <Button
              variant="solid"
              colorScheme="blue"
              onClick={onSaveDocument}
              isLoading={isLoading}
              isDisabled={isSaveBtnDisabled}
            >
              Save
            </Button>

            <Button variant="solid" colorScheme="gray" onClick={onClose}>
              Close
            </Button>
          </Flex>
        </ModalFooter>
      </ModalContent>
    </Modal>
  )
}
