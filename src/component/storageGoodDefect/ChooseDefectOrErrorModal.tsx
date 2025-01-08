import {
  Flex,
  Modal,
  ModalBody,
  ModalCloseButton,
  ModalContent,
  ModalFooter,
  ModalHeader,
  useDisclosure,
} from "@chakra-ui/react"
import { ModalBackgroundBlur } from "component/ModalBackgroundBlur"
import { AddDefectOrErrorModal } from "component/storageGoodDefect/AddDefectOrErrorModal"
import { DefectOrErrorBtn } from "component/storageGoodDefect/DefectOrErrorBtn"
import { FC, useState } from "react"
import { FiPenTool, FiTruck } from "react-icons/fi"
import { ModalProps } from "type/modalProps"

interface ChooseDefectOrErrorModalProps extends ModalProps {}

export const ChooseDefectOrErrorModal: FC<ChooseDefectOrErrorModalProps> = (
  props,
) => {
  const { isOpen, onClose } = props

  const [isEngraverErrorSelected, setIsEngraverErrorSelected] =
    useState<boolean>(false)

  const {
    isOpen: isAddDefectOrErrorModalOpen,
    onOpen: onAddDefectOrErrorModalOpen,
    onClose: onAddDefectOrErrorModalClose,
  } = useDisclosure()

  const handleDefectAdd = () => {
    setIsEngraverErrorSelected(false)

    onAddDefectOrErrorModalOpen()
  }

  const handleErrorAdd = () => {
    setIsEngraverErrorSelected(true)

    onAddDefectOrErrorModalOpen()
  }

  return (
    <>
      <Modal size="2xl" isOpen={isOpen} onClose={onClose}>
        <ModalBackgroundBlur />

        <ModalContent bgColor="modal.base">
          <ModalHeader>Defect or Error</ModalHeader>
          <ModalCloseButton />

          <ModalBody>
            <Flex direction="row" gap={5}>
              {/* Defects Btn */}
              <DefectOrErrorBtn onClick={handleDefectAdd} icon={FiTruck}>
                Supplier Defect
              </DefectOrErrorBtn>

              {/* Errors Btn */}
              <DefectOrErrorBtn onClick={handleErrorAdd} icon={FiPenTool}>
                Engraver Error
              </DefectOrErrorBtn>
            </Flex>
          </ModalBody>

          <ModalFooter></ModalFooter>
        </ModalContent>
      </Modal>

      {/* Modal */}
      <AddDefectOrErrorModal
        isEngraverErrorSelected={isEngraverErrorSelected}
        isOpen={isAddDefectOrErrorModalOpen}
        onClose={onAddDefectOrErrorModalClose}
      />
    </>
  )
}
