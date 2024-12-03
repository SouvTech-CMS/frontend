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
import { FiAlignLeft, FiHash, FiHome } from "react-icons/fi"
import {
  useShelfCreateMutation,
  useShelfUpdateMutation,
} from "service/shelf/shelf"
import { ModalProps } from "type/modalProps"
import { Shelf } from "type/shelf/shelf"
import { ShelfPlacement } from "type/shelf/shelfPlacement"
import { WithId } from "type/withId"
import { notify } from "util/toasts"

interface ShelfModalProps extends ModalProps {
  prevShelf?: WithId<Shelf>
  placement: WithId<ShelfPlacement>
}

const newShelf: Shelf = {
  name: "",
}

export const ShelfModal: FC<ShelfModalProps> = (props) => {
  const { prevShelf, placement, isOpen, onClose } = props

  const isNewShelf = !prevShelf
  const placementId = placement.id
  const placementName = placement.name
  const placementNameHash = placement.name_hash

  const [shelf, setShelf] = useState<Shelf>(prevShelf || newShelf)

  const shelfCreateMutation = useShelfCreateMutation()
  const shelfUpdateMutation = useShelfUpdateMutation()

  const isLoading =
    shelfCreateMutation.isLoading || shelfUpdateMutation.isLoading

  const isShelfNameInvalid = !shelf.name.trim()

  const isSaveBtnDisabled = isShelfNameInvalid

  const handleShelfUpdate = (param: string, value: number | string) => {
    setShelf((prevShelf) => ({
      ...prevShelf,
      [param]: value,
    }))
  }

  const onShelfUpdate = async () => {
    if (isNewShelf) {
      const body: Shelf = {
        ...shelf,
        shelf_placement_id: placementId,
      }

      await shelfCreateMutation.mutateAsync(body)

      notify(
        `Shelf ${placementNameHash}-${shelf.name} created successfully`,
        "success",
      )
    } else {
      const body: WithId<Shelf> = {
        ...shelf,
        id: prevShelf.id,
        shelf_placement_id: placementId,
      }

      await shelfUpdateMutation.mutateAsync(body)

      notify(
        `Shelf ${placementNameHash}-${shelf.name} updated successfully`,
        "success",
      )
    }

    onClose()
  }

  useEffect(() => {
    if (prevShelf) {
      setShelf(prevShelf)
    } else {
      setShelf(newShelf)
    }
  }, [prevShelf, isOpen])

  return (
    <Modal size="xl" isOpen={isOpen} onClose={onClose} isCentered>
      <ModalBackgroundBlur />

      <ModalContent>
        <ModalHeader>{isNewShelf ? "New Shelf" : "Edit Shelf"}</ModalHeader>
        <ModalCloseButton />

        <ModalBody>
          <Flex w="full" direction="column" gap={5}>
            {/* Name */}
            <InputGroup>
              <InputLeftElement color="gray">
                <FiHome />
              </InputLeftElement>

              <Input
                placeholder="Placement"
                value={`${placementName} (${placementNameHash})`}
                type="text"
                isReadOnly
              />
            </InputGroup>

            {/* Name */}
            <InputGroup>
              <InputLeftElement color="gray">
                <FiHash />
              </InputLeftElement>

              <Input
                placeholder="Name"
                value={shelf.name}
                type="text"
                onChange={(e) => {
                  const value = e.target.value
                  handleShelfUpdate("name", value)
                }}
                isInvalid={isShelfNameInvalid}
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
                value={shelf.description}
                type="text"
                onChange={(e) => {
                  const value = e.target.value
                  handleShelfUpdate("description", value)
                }}
                isDisabled={isLoading}
              />
            </InputGroup>
          </Flex>
        </ModalBody>

        <ModalFooter>
          <Flex gap={5}>
            <Button
              onClick={onShelfUpdate}
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
