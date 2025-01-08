import { Button, useDisclosure } from "@chakra-ui/react"
import { ChooseDefectOrErrorModal } from "component/storageGoodDefect/ChooseDefectOrErrorModal"
import { FC } from "react"

export const ChooseDefectOrErrorBtn: FC = () => {
  const {
    isOpen: isDefectOrErrorModalOpen,
    onOpen: onDefectOrErrorModalOpen,
    onClose: onDefectOrErrorModalClose,
  } = useDisclosure()

  return (
    <>
      <Button variant="secondary" onClick={onDefectOrErrorModalOpen}>
        Add Defects & Errors
      </Button>

      <ChooseDefectOrErrorModal
        isOpen={isDefectOrErrorModalOpen}
        onClose={onDefectOrErrorModalClose}
      />
    </>
  )
}
