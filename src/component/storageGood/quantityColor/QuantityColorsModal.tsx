import {
  Button,
  Divider,
  Flex,
  Modal,
  ModalBody,
  ModalCloseButton,
  ModalContent,
  ModalFooter,
  ModalHeader,
  Text,
} from "@chakra-ui/react"
import { getAllQuantityColors } from "api/storage/quantityColor"
import { ModalBackgroundBlur } from "component/ModalBackgroundBlur"
import { LoadingPage } from "component/page/LoadingPage"
import { QuantityColorFields } from "component/storageGood/quantityColor/QuantityColorFields"
import { FC, useEffect, useState } from "react"
import { useQuery } from "react-query"
import { useQuantityColorsBulkUpdateMutation } from "service/storage/quantityColor/quantityColor"
import { ModalProps } from "type/modalProps"
import { QuantityColor } from "type/storage/quantityColor/quantityColor"
import { WithId } from "type/withId"
import { notify } from "util/toasts"

interface QuantityColorsModalProps extends ModalProps {}

export const QuantityColorsModal: FC<QuantityColorsModalProps> = (props) => {
  const { isOpen, onClose } = props

  const [quantityColorsList, setQuantityColorsList] = useState<
    WithId<QuantityColor>[]
  >([])
  const isQuantityColorsListExist =
    !!quantityColorsList && quantityColorsList.length > 0

  const isSaveBtnDisabled =
    !isQuantityColorsListExist ||
    quantityColorsList.some(
      (quantityColor) =>
        !quantityColor.color || !quantityColor.description?.trim(),
    )

  const { isLoading: isQuantityColorsLoading, refetch } = useQuery<
    WithId<QuantityColor>[]
  >("quantityColorsList", getAllQuantityColors, {
    onSuccess: (responseData) => {
      setQuantityColorsList(
        responseData.map((quantityColor, index) => {
          quantityColor.index = index
          return quantityColor
        }),
      )
    },
  })

  const quantityColorsBulkUpdateMutation = useQuantityColorsBulkUpdateMutation()

  const isLoading =
    isQuantityColorsLoading || quantityColorsBulkUpdateMutation.isLoading

  const handleAdd = () => {
    setQuantityColorsList((prevQuantityColors) => [
      ...prevQuantityColors,
      {
        id: NaN,
        color: "#FF3E3E",
        description: undefined,
        index:
          prevQuantityColors.length > 0
            ? prevQuantityColors[prevQuantityColors.length - 1].index + 1
            : 1,
      },
    ])
  }

  const handleChange = (quantityColor: WithId<QuantityColor>) => {
    setQuantityColorsList((prevQuantityColorsList) =>
      prevQuantityColorsList.map((prevQuantityColor) =>
        prevQuantityColor.index === quantityColor.index
          ? quantityColor
          : {
              ...prevQuantityColor,
              is_use_more_than_condition:
                quantityColor.is_use_more_than_condition
                  ? false
                  : prevQuantityColor.is_use_more_than_condition,
            },
      ),
    )
  }

  const handleDelete = (quantityColor: WithId<QuantityColor>) => {
    setQuantityColorsList((prevQuantityColorsList) =>
      prevQuantityColorsList.filter(
        (prevQuantityColor) => prevQuantityColor.index !== quantityColor.index,
      ),
    )
  }

  const handleUpdate = async () => {
    const body: WithId<QuantityColor>[] = [...quantityColorsList]

    await quantityColorsBulkUpdateMutation.mutateAsync(body)

    notify("Quantity Colors variants was updated successfully", "success")
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
          <Flex w="full" direction="column" gap={5}>
            <Flex w="full" direction="column" gap={1}>
              <Text color="hint">
                This is list of Quantity Colors that you will be able to
                configure based on quantity for each Storage Good.
              </Text>
              <Text color="hint">
                You can also specify which Quantity Color will be displayed when
                there are enough Storage Good.
              </Text>
            </Flex>

            <Divider />

            {isQuantityColorsLoading && !isQuantityColorsListExist && (
              <LoadingPage />
            )}

            {!isQuantityColorsLoading && isQuantityColorsListExist && (
              <Flex direction="column" gap={5}>
                {quantityColorsList?.map((quantityColor, index) => (
                  <QuantityColorFields
                    key={index}
                    prevQuantityColor={quantityColor}
                    onChange={handleChange}
                    onDelete={handleDelete}
                  />
                ))}
              </Flex>
            )}
          </Flex>
        </ModalBody>

        <ModalFooter>
          <Flex w="full" direction="row" alignItems="center" gap={2}>
            <Button w="full" variant="secondary" onClick={handleAdd}>
              New
            </Button>

            <Button
              w="full"
              onClick={handleUpdate}
              isDisabled={isSaveBtnDisabled}
              isLoading={isLoading}
            >
              Save
            </Button>
          </Flex>
        </ModalFooter>
      </ModalContent>
    </Modal>
  )
}
