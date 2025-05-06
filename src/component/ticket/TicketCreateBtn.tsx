import { Button, useDisclosure } from "@chakra-ui/react"
import { TicketModal } from "component/ticket/TicketModal"
import { FC } from "react"

export const TicketCreateBtn: FC = () => {
  const {
    isOpen: isCreateModalOpen,
    onOpen: onCreateModalOpen,
    onClose: onCreateModalClose,
  } = useDisclosure()

  return (
    <>
      <Button w="full" onClick={onCreateModalOpen}>
        Create Ticket
      </Button>

      <TicketModal isOpen={isCreateModalOpen} onClose={onCreateModalClose} />
    </>
  )
}
