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
  Textarea,
} from "@chakra-ui/react"
import { ModalBackgroundBlur } from "component/ModalBackgroundBlur"
import { FC, useEffect, useState } from "react"
import { FiAlignLeft, FiHash, FiUser } from "react-icons/fi"
import {
  usePlacementCreateMutation,
  usePlacementUpdateMutation,
} from "service/shelf/shelfPlacement"
import { ModalProps } from "type/modalProps"
import { ShelfPlacement } from "type/shelf/shelfPlacement"
import { WithId } from "type/withId"
import { notify } from "util/toasts"

interface PlacementModalProps extends ModalProps {
  prevPlacement?: WithId<ShelfPlacement>
}

const newPlacement: ShelfPlacement = {
  name: "",
  name_hash: "",
}

export const PlacementModal: FC<PlacementModalProps> = (props) => {
  const { prevPlacement, isOpen, onClose } = props

  const isNewPlacement = !prevPlacement

  const [placement, setPlacement] = useState<ShelfPlacement>(
    prevPlacement || newPlacement,
  )

  const placementCreateMutation = usePlacementCreateMutation()
  const placementUpdateMutation = usePlacementUpdateMutation()

  const isLoading =
    placementCreateMutation.isLoading || placementUpdateMutation.isLoading

  const isPlacementNameInvalid = !placement.name.trim()
  const isPlacementNameHashInvalid = !placement.name_hash.trim()

  const isSaveBtnDisabled = isPlacementNameInvalid || isPlacementNameHashInvalid

  const handlePlacementUpdate = (param: string, value: number | string) => {
    setPlacement((prevPlacement) => ({
      ...prevPlacement,
      [param]: value,
    }))
  }

  const onPlacementUpdate = async () => {
    if (isNewPlacement) {
      await placementCreateMutation.mutateAsync(placement)

      notify(
        `Placement ${placement.name} (${placement.name_hash}) created successfully`,
        "success",
      )
    } else {
      await placementUpdateMutation.mutateAsync({
        ...placement,
        id: prevPlacement.id,
      })

      notify(
        `Placement ${placement.name} (${placement.name_hash}) updated successfully`,
        "success",
      )
    }
    onClose()
  }

  useEffect(
    () => {
      if (isPlacementNameInvalid || !isPlacementNameHashInvalid) {
        return
      }

      const nameHash = placement.name[0]?.toUpperCase()
      handlePlacementUpdate("name_hash", `${nameHash}`)
    },
    // eslint-disable-next-line react-hooks/exhaustive-deps
    [placement.name],
  )

  useEffect(() => {
    if (prevPlacement) {
      setPlacement(prevPlacement)
    } else {
      setPlacement(newPlacement)
    }
  }, [prevPlacement, isOpen])

  return (
    <Modal size="xl" isOpen={isOpen} onClose={onClose} isCentered>
      <ModalBackgroundBlur />

      <ModalContent>
        <ModalHeader>
          {isNewPlacement ? "New placement" : "Placement"}
        </ModalHeader>
        <ModalCloseButton />

        <ModalBody>
          <Flex w="full" direction="column" gap={5}>
            {/* Name */}
            <InputGroup>
              <InputLeftElement color="gray">
                <FiUser />
              </InputLeftElement>

              <Input
                placeholder="Name"
                value={placement.name}
                type="text"
                onChange={(e) => {
                  const value = e.target.value
                  handlePlacementUpdate("name", value)
                }}
                isInvalid={isPlacementNameInvalid}
                isDisabled={isLoading}
              />
            </InputGroup>

            {/* Name Hash */}
            <InputGroup>
              <InputLeftElement color="gray">
                <FiHash />
              </InputLeftElement>

              <Input
                placeholder="Name Hash"
                value={placement.name_hash}
                type="text"
                onChange={(e) => {
                  const value = e.target.value
                  handlePlacementUpdate("name_hash", value)
                }}
                isInvalid={isPlacementNameHashInvalid}
                isDisabled={isLoading}
              />
            </InputGroup>

            {/* Description */}
            <InputGroup>
              <InputLeftElement color="gray">
                <FiAlignLeft />
              </InputLeftElement>

              <Input
                as={Textarea}
                placeholder="Description"
                value={placement.description}
                type="text"
                onChange={(e) => {
                  const value = e.target.value
                  handlePlacementUpdate("description", value)
                }}
                isDisabled={isLoading}
              />
            </InputGroup>
          </Flex>
        </ModalBody>

        <ModalFooter>
          <Flex gap={5}>
            <Button
              onClick={onPlacementUpdate}
              isLoading={isLoading}
              isDisabled={isSaveBtnDisabled}
            >
              Save
            </Button>

            <Button variant="secondary" onClick={onClose}>
              Cancel
            </Button>
          </Flex>
        </ModalFooter>
      </ModalContent>
    </Modal>
  )
}
