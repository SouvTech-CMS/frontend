import {
  Button,
  Flex,
  Modal,
  ModalBody,
  ModalCloseButton,
  ModalContent,
  ModalFooter,
  ModalHeader,
} from "@chakra-ui/react"
import { getAllQuantityColors } from "api/storage/quantityColor"
import { ModalBackgroundBlur } from "component/ModalBackgroundBlur"
import { LoadingPage } from "component/page/LoadingPage"
import { QuantityColorFields } from "component/storageGood/quantityColor/QuantityColorFields"
import { FC, useEffect, useState } from "react"
import { useQuery } from "react-query"
import { ModalProps } from "type/modalProps"
import { QuantityColor } from "type/storage/quantityColor/quantityColor"
import { WithId } from "type/withId"

interface QuantityColorsModalProps extends ModalProps {}

export const QuantityColorsModal: FC<QuantityColorsModalProps> = (props) => {
  const { isOpen, onClose } = props

  const [quantityColorsList, setQuantityColorsList] = useState<
    WithId<QuantityColor>[]
  >([])

  const isQuantityColorsListExist = !!quantityColorsList

  const { isLoading: isQuantityColorsLoading, refetch } = useQuery<
    WithId<QuantityColor>[]
  >("quantityColorsList", getAllQuantityColors, {
    onSuccess: (responseData) => {
      setQuantityColorsList(responseData)
    },
  })

  const handleAdd = () => {
    setQuantityColorsList((prevQuantityColors) => [
      ...prevQuantityColors,
      {
        id: NaN,
        color: "#FF3E3E",
        description: undefined,
      },
    ])
  }

  useEffect(
    () => {
      refetch()
    },
    // eslint-disable-next-line
    [isOpen],
  )

  return (
    <Modal size="lg" isOpen={isOpen} onClose={onClose} isCentered>
      <ModalBackgroundBlur />

      <ModalContent>
        <ModalHeader>Quantity Colors Variants</ModalHeader>
        <ModalCloseButton />

        <ModalBody>
          {isQuantityColorsLoading && !isQuantityColorsListExist && (
            <LoadingPage />
          )}

          {!isQuantityColorsLoading && isQuantityColorsListExist && (
            <Flex direction="column" gap={8}>
              {quantityColorsList?.map((quantityColor, index) => (
                <QuantityColorFields
                  key={index}
                  prevQuantityColor={quantityColor}
                  setQuantityColorsList={setQuantityColorsList}
                />
              ))}
            </Flex>
          )}
        </ModalBody>

        <ModalFooter>
          <Button w="full" onClick={handleAdd}>
            Add
          </Button>
        </ModalFooter>
      </ModalContent>
    </Modal>
  )
}
